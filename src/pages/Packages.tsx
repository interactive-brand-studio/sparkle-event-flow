
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Edit, Loader, Star } from 'lucide-react';
import { useUserEvent } from '@/context/UserEventContext';
import { formatCurrency } from '@/lib/utils';
import { usePackage } from '@/context/PackageContext';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { VendorType } from '@/context/UserEventContext';

// Mock data based on sample vendors
import { vendors } from '@/data/mockVendors';

interface PackageOption {
  id: string;
  name: string;
  description: string;
  matchScore: number;
  price: number;
  vendors: {
    type: VendorType;
    name: string;
    description: string;
    price: number;
    addOns: { id: string; name: string; price: number }[];
  }[];
}

const Packages = () => {
  const { userEvent } = useUserEvent();
  const { addVendor, clearPackage } = usePackage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState<PackageOption[]>([]);

  // Generate packages based on user event preferences
  useEffect(() => {
    const generatePackages = () => {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      setTimeout(() => {
        // Create three different packages based on budget
        const budget = userEvent.budget;
        
        if (!budget) {
          return;
        }
        
        const avgBudget = (budget.min + budget.max) / 2;
        const budgetPerVendor = avgBudget / Math.max(userEvent.preferredVendors.length, 1);
        
        // Filter vendors by preferred types
        const relevantVendors = vendors.filter(vendor => 
          userEvent.preferredVendors.includes(vendor.type as VendorType)
        );
        
        // Generate packages with different price points
        const packageOptions: PackageOption[] = [];
        
        // Budget package (lower end)
        const budgetPackage: PackageOption = {
          id: 'budget',
          name: 'Budget Friendly',
          description: 'Great value while meeting your essential needs',
          matchScore: Math.floor(Math.random() * 10) + 80, // 80-90%
          price: 0,
          vendors: []
        };
        
        // Balanced package (mid-range)
        const balancedPackage: PackageOption = {
          id: 'balanced',
          name: 'Perfect Balance',
          description: 'Quality and value in perfect harmony',
          matchScore: Math.floor(Math.random() * 10) + 85, // 85-95%
          price: 0,
          vendors: []
        };
        
        // Premium package (higher end)
        const premiumPackage: PackageOption = {
          id: 'premium',
          name: 'Premium Experience',
          description: 'Luxury options for an unforgettable event',
          matchScore: Math.floor(Math.random() * 6) + 95, // 95-100%
          price: 0,
          vendors: []
        };
        
        // Helper function to get random vendor of specific type
        const getRandomVendorByType = (type: VendorType, priceRange: 'low' | 'mid' | 'high') => {
          const typeVendors = relevantVendors.filter(v => v.type === type);
          if (typeVendors.length === 0) return null;
          
          if (priceRange === 'low') {
            // Sort by price ascending and take from first third
            const sorted = [...typeVendors].sort((a, b) => a.priceFrom - b.priceFrom);
            return sorted[0]; 
          } else if (priceRange === 'high') {
            // Sort by price descending and take from first third
            const sorted = [...typeVendors].sort((a, b) => b.priceFrom - a.priceFrom);
            return sorted[0];
          } else {
            // Take a middle-priced option
            const sorted = [...typeVendors].sort((a, b) => a.priceFrom - b.priceFrom);
            return sorted[Math.floor(sorted.length / 2)];
          }
        };
        
        // Fill packages with vendors
        userEvent.preferredVendors.forEach(vendorType => {
          // Budget package (lower third of price range)
          const budgetVendor = getRandomVendorByType(vendorType, 'low');
          if (budgetVendor) {
            const basePrice = budgetVendor.priceType === 'per_head' && userEvent.guestCount
              ? budgetVendor.priceFrom * userEvent.guestCount
              : budgetVendor.priceFrom;
              
            budgetPackage.vendors.push({
              type: vendorType,
              name: budgetVendor.name,
              description: budgetVendor.shortDescription,
              price: basePrice,
              addOns: []  // No add-ons for budget package
            });
            
            budgetPackage.price += basePrice;
          }
          
          // Balanced package (middle third of price range)
          const balancedVendor = getRandomVendorByType(vendorType, 'mid');
          if (balancedVendor) {
            const basePrice = balancedVendor.priceType === 'per_head' && userEvent.guestCount
              ? balancedVendor.priceFrom * userEvent.guestCount
              : balancedVendor.priceFrom;
              
            // Add one random add-on
            const addOns = balancedVendor.addOns.length > 0 
              ? [balancedVendor.addOns[0]] 
              : [];
              
            const addOnPrice = addOns.reduce((total, addon) => {
              const addonPrice = balancedVendor.priceType === 'per_head' && userEvent.guestCount
                ? addon.price * userEvent.guestCount
                : addon.price;
              return total + addonPrice;
            }, 0);
            
            balancedPackage.vendors.push({
              type: vendorType,
              name: balancedVendor.name,
              description: balancedVendor.shortDescription,
              price: basePrice + addOnPrice,
              addOns: addOns
            });
            
            balancedPackage.price += (basePrice + addOnPrice);
          }
          
          // Premium package (upper third of price range)
          const premiumVendor = getRandomVendorByType(vendorType, 'high');
          if (premiumVendor) {
            const basePrice = premiumVendor.priceType === 'per_head' && userEvent.guestCount
              ? premiumVendor.priceFrom * userEvent.guestCount
              : premiumVendor.priceFrom;
              
            // Add multiple add-ons for premium
            const addOns = premiumVendor.addOns.slice(0, Math.min(3, premiumVendor.addOns.length));
            
            const addOnPrice = addOns.reduce((total, addon) => {
              const addonPrice = premiumVendor.priceType === 'per_head' && userEvent.guestCount
                ? addon.price * userEvent.guestCount
                : addon.price;
              return total + addonPrice;
            }, 0);
            
            premiumPackage.vendors.push({
              type: vendorType,
              name: premiumVendor.name,
              description: premiumVendor.shortDescription,
              price: basePrice + addOnPrice,
              addOns: addOns
            });
            
            premiumPackage.price += (basePrice + addOnPrice);
          }
        });
        
        packageOptions.push(budgetPackage, balancedPackage, premiumPackage);
        setPackages(packageOptions);
        setIsLoading(false);
      }, 1500); // Simulate API delay
    };
    
    generatePackages();
  }, [userEvent]);

  const handleSelectPackage = (pkg: PackageOption) => {
    // Clear any existing package selections
    clearPackage();
    
    // Add each vendor to the package context
    pkg.vendors.forEach((vendorItem) => {
      const vendor = vendors.find(v => v.name === vendorItem.name);
      if (vendor) {
        const addOnIds = vendorItem.addOns.map(a => a.id);
        addVendor(vendorItem.type, vendor, addOnIds);
      }
    });
    
    // Navigate to package builder with pre-filled options
    navigate('/package-builder');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Finding Perfect Packages For You</h1>
            <p className="text-lg text-gray-600">
              We're matching your preferences with our top vendors
            </p>
          </div>
          
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-2 animate-pulse">
              <Loader className="h-6 w-6 text-purple-500 animate-spin" />
              <span className="text-purple-500 font-medium">Building personalized packages...</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkeletonLoader type="card" />
            <SkeletonLoader type="card" />
            <SkeletonLoader type="card" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Personalized Packages</h1>
          <p className="text-lg text-gray-600">
            Based on your preferences, we've created three perfect packages for your {userEvent.eventType} event
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`overflow-hidden transition-transform duration-300 hover:shadow-xl ${
              pkg.id === 'balanced' ? 'border-purple-300 shadow-md' : ''
            }`}>
              <div className={`h-2 ${
                pkg.id === 'budget' ? 'bg-green-400' : 
                pkg.id === 'balanced' ? 'bg-purple-500' : 
                'bg-blue-500'
              }`}></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">{pkg.name}</CardTitle>
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                  </div>
                  <Badge variant={
                    pkg.id === 'budget' ? 'outline' : 
                    pkg.id === 'balanced' ? 'secondary' : 
                    'default'
                  } className="ml-2">
                    {pkg.matchScore}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="font-bold text-2xl text-gray-900">
                  {formatCurrency(pkg.price)}
                </div>
                
                <div className="space-y-3">
                  {pkg.vendors.map((vendor, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className={`h-5 w-5 mt-0.5 ${
                        pkg.id === 'budget' ? 'text-green-500' : 
                        pkg.id === 'balanced' ? 'text-purple-500' : 
                        'text-blue-500'
                      }`} />
                      <div>
                        <p className="font-medium">{vendor.type}: {vendor.name}</p>
                        <p className="text-sm text-gray-600">{vendor.description.substring(0, 60)}...</p>
                        {vendor.addOns.length > 0 && (
                          <div className="mt-1">
                            {vendor.addOns.map((addon, idx) => (
                              <Badge key={idx} variant="outline" className="mr-2 mb-2">
                                {addon.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <Button 
                  onClick={() => handleSelectPackage(pkg)} 
                  variant={pkg.id === 'balanced' ? 'default' : 'outline'}
                  className="w-full"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit This Package
                </Button>
                
                <Button 
                  variant={pkg.id === 'balanced' ? 'secondary' : 'ghost'} 
                  className="w-full"
                  onClick={() => {
                    handleSelectPackage(pkg);
                    navigate('/checkout');
                  }}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Not finding exactly what you're looking for?</p>
          <Button asChild variant="outline">
            <Link to="/package-builder">Build Your Own Package</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Packages;
