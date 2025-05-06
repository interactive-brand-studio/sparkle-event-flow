
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VendorCard from '@/components/vendors/VendorCard';
import FilterSidebar, { FilterOptions } from '@/components/vendors/FilterSidebar';
import { usePackage } from '@/context/PackageContext';
import { mockVendors } from '@/data/mockVendors';
import { Vendor, VendorCategory } from '@/types/vendor';
import { Grid2X2, List, Search } from 'lucide-react';

const Vendors = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addVendor } = usePackage();
  
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors);
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'price_asc' | 'price_desc' | 'rating' | 'popularity'>('rating');
  
  const initialCategory = searchParams.get('category') as VendorCategory | null;
  
  const [filters, setFilters] = useState<FilterOptions>({
    categories: initialCategory ? [initialCategory] : [],
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    hasAddOns: false
  });
  
  useEffect(() => {
    let results = [...mockVendors];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(vendor => 
        vendor.name.toLowerCase().includes(query) || 
        vendor.category.toLowerCase().includes(query) ||
        vendor.location.toLowerCase().includes(query) ||
        vendor.tagline.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      results = results.filter(vendor => filters.categories.includes(vendor.category));
    }
    
    // Apply price filter
    results = results.filter(vendor => 
      vendor.priceFrom >= filters.minPrice && vendor.priceFrom <= filters.maxPrice
    );
    
    // Apply rating filter
    results = results.filter(vendor => vendor.rating >= filters.minRating);
    
    // Apply add-ons filter
    if (filters.hasAddOns) {
      results = results.filter(vendor => vendor.addOns.length > 0);
    }
    
    // Apply sorting
    results = sortVendors(results, sortOption);
    
    setFilteredVendors(results);
  }, [searchQuery, filters, sortOption]);
  
  const sortVendors = (vendors: Vendor[], option: string) => {
    const sorted = [...vendors];
    
    switch (option) {
      case 'price_asc':
        return sorted.sort((a, b) => a.priceFrom - b.priceFrom);
      case 'price_desc':
        return sorted.sort((a, b) => b.priceFrom - a.priceFrom);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'popularity':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return sorted;
    }
  };
  
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
  
  const handleAddToPackage = (vendor: Vendor) => {
    addVendor(vendor.category, vendor);
    navigate('/package-builder');
  };
  
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
            <div>
              <p className="text-sm text-gray-500">
                Showing {filteredVendors.length} vendors
              </p>
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
          
          {filteredVendors.length === 0 ? (
            <div className="rounded-lg border bg-gray-50 p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No vendors match your search</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms.</p>
              <Button onClick={resetFilters}>Reset All Filters</Button>
            </div>
          ) : (
            <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
              {filteredVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
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
