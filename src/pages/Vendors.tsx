
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VendorCard from '@/components/vendors/VendorCard';
import FilterSidebar, { FilterOptions } from '@/components/vendors/FilterSidebar';
import { usePackage } from '@/context/PackageContext';
import { useVendors } from '@/hooks/useVendors';
import { useRealtime } from '@/hooks/useRealtime';
import { Grid2X2, List, Search, Loader } from 'lucide-react';

const Vendors = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addVendor } = usePackage();
  
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'price_asc' | 'price_desc' | 'rating' | 'popularity'>('rating');
  
  const initialCategory = searchParams.get('category');
  
  const [filters, setFilters] = useState<FilterOptions>({
    categories: initialCategory ? [initialCategory as any] : [],
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    hasAddOns: false
  });

  // Use real-time data synchronization
  useRealtime();

  // Build database filters
  const dbFilters = {
    categoryId: filters.categories.length > 0 ? 
      categories.find(c => c.name === filters.categories[0])?.id : undefined,
    searchQuery: searchQuery || undefined,
    priceRange: filters.minPrice > 0 || filters.maxPrice < 5000 ? 
      { min: filters.minPrice, max: filters.maxPrice } : undefined,
    rating: filters.minRating > 0 ? filters.minRating : undefined,
    status: 'approved' as const,
    isActive: true,
  };

  const { vendors, categories, isLoading, error } = useVendors(dbFilters);

  // Sort vendors client-side for now (could be moved to database)
  const sortedVendors = [...vendors].sort((a, b) => {
    switch (sortOption) {
      case 'price_asc':
        return (a.price_range?.min || 0) - (b.price_range?.min || 0);
      case 'price_desc':
        return (b.price_range?.min || 0) - (a.price_range?.min || 0);
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.review_count - a.review_count;
      default:
        return 0;
    }
  });
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const resetFilters = () => {
    setFilters({
      categories: [],
      minPrice: 0,
      maxPrice: 5000,
      minRating: 0,
      hasAddOns: false
    });
    setSearchQuery('');
  };
  
  const handleAddToPackage = (vendor: any) => {
    // Convert database vendor to legacy format for compatibility
    const legacyVendor = {
      id: vendor.id,
      name: vendor.business_name,
      image: vendor.portfolio_images?.[0] || '/placeholder.svg',
      tagline: vendor.tagline || '',
      category: vendor.categories?.name || 'Other',
      priceFrom: vendor.price_range?.min || 0,
      priceType: 'flat' as const,
      rating: vendor.rating,
      reviewCount: vendor.review_count,
      verified: vendor.verification_status === 'approved',
      location: vendor.service_areas?.[0] || '',
      description: vendor.description || '',
      services: [],
      addOns: []
    };
    
    addVendor(vendor.categories?.name || 'Other', legacyVendor);
    navigate('/package-builder');
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Error Loading Vendors</h2>
        <p className="text-gray-600 mb-6">There was an error loading the vendors. Please try again.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-6">Browse Our Trusted Vendors</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Find the perfect vendors for your event. All pre-vetted and ready to make your event spectacular.
        </p>
        
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search vendors by name, category, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-lg"
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 lg:w-80 flex-shrink-0">
          <FilterSidebar 
            filters={filters}
            onChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                Showing {sortedVendors.length} vendor{sortedVendors.length !== 1 ? 's' : ''}
              </p>
              {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            </div>
            
            <div className="flex items-center gap-4">
              <div>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="rounded-md border bg-white px-3 py-1.5 text-sm"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
              
              <div className="flex rounded-md border">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-r-none ${isGridView ? 'bg-gray-100' : ''}`}
                  onClick={() => setIsGridView(true)}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-l-none ${!isGridView ? 'bg-gray-100' : ''}`}
                  onClick={() => setIsGridView(false)}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading vendors...</span>
            </div>
          ) : sortedVendors.length === 0 ? (
            <div className="rounded-lg border bg-gray-50 p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No vendors match your search</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms.</p>
              <Button onClick={resetFilters}>Reset All Filters</Button>
            </div>
          ) : (
            <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
              {sortedVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={{
                    id: vendor.id,
                    name: vendor.business_name,
                    image: vendor.portfolio_images?.[0] || '/placeholder.svg',
                    tagline: vendor.tagline || '',
                    category: vendor.categories?.name || 'Other',
                    priceFrom: vendor.price_range?.min || 0,
                    priceType: 'flat' as const,
                    rating: vendor.rating,
                    reviewCount: vendor.review_count,
                    verified: vendor.verification_status === 'approved',
                    location: vendor.service_areas?.[0] || '',
                    description: vendor.description || '',
                    services: [],
                    addOns: []
                  }}
                  onAddToPackage={() => handleAddToPackage(vendor)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vendors;
