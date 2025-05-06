
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import RatingStars from '@/components/vendors/RatingStars';
import PriceTag from '@/components/vendors/PriceTag';
import AddOnSelector from '@/components/vendors/AddOnSelector';
import BackButton from '@/components/vendors/BackButton';
import { usePackage } from '@/context/PackageContext';
import { useUserEvent } from '@/context/UserEventContext';
import { mockVendors } from '@/data/mockVendors';
import { Vendor, AddOn } from '@/types/vendor';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, Info } from 'lucide-react';

const VendorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { userEvent } = useUserEvent();
  const { packageState, addVendor } = usePackage();
  
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isInPackage, setIsInPackage] = useState<boolean>(false);
  
  // Find vendor in our mock data
  useEffect(() => {
    const foundVendor = mockVendors.find(v => v.id === id);
    if (foundVendor) {
      setVendor(foundVendor);
      
      // Check if this vendor is already in the package
      const vendorEntry = packageState.vendors[foundVendor.category];
      if (vendorEntry && vendorEntry.vendor.id === id) {
        setIsInPackage(true);
        setSelectedAddOns(vendorEntry.selectedAddOns);
      }
    }
  }, [id, packageState]);
  
  useEffect(() => {
    if (!vendor) return;
    
    let price = vendor.priceFrom;
    
    // If price is per head, multiply by guest count
    if (vendor.priceType === 'per_head' && userEvent.guestCount) {
      price *= userEvent.guestCount;
    }
    
    // Add selected add-ons
    selectedAddOns.forEach(addOnId => {
      const addOn = vendor.addOns.find(a => a.id === addOnId);
      if (addOn) {
        if (vendor.priceType === 'per_head' && userEvent.guestCount) {
          price += addOn.price * userEvent.guestCount;
        } else {
          price += addOn.price;
        }
      }
    });
    
    setTotalPrice(price);
  }, [vendor, selectedAddOns, userEvent.guestCount]);
  
  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => {
      if (prev.includes(addOnId)) {
        return prev.filter(id => id !== addOnId);
      } else {
        return [...prev, addOnId];
      }
    });
  };
  
  const handleAddToPackage = () => {
    if (!vendor) return;
    
    addVendor(vendor.category, vendor, selectedAddOns);
    setIsInPackage(true);
  };
  
  if (!vendor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Vendor not found</h2>
        <p className="mb-6">The vendor you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/vendors">Browse All Vendors</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <BackButton to="/vendors" label="Back to Vendors" className="mb-6" />
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Section */}
          <div className="mb-8 rounded-xl bg-gray-100 p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {vendor.category}
                  </Badge>
                  
                  {vendor.verified && (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <h1 className="mt-3 text-3xl font-bold md:text-4xl">{vendor.name}</h1>
                <p className="mt-2 text-xl text-gray-600">{vendor.tagline}</p>
                
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <RatingStars rating={vendor.rating} size="lg" />
                    <span className="text-gray-500">({vendor.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="text-gray-600">
                    {vendor.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* About Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-gray-700 mb-6">{vendor.description}</p>
            
            <h3 className="text-xl font-medium mb-3">Services Offered</h3>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {vendor.services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Add-ons Section */}
          <div className="mb-8">
            <AddOnSelector 
              addOns={vendor.addOns}
              selectedAddOns={selectedAddOns}
              priceType={vendor.priceType}
              guestCount={userEvent.guestCount || 0}
              onToggle={toggleAddOn}
            />
          </div>
        </div>
        
        {/* Pricing Sidebar */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Pricing</h2>
              
              <div className="mb-6">
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-600">Base price:</span>
                  <PriceTag 
                    price={vendor.priceFrom} 
                    priceType={vendor.priceType}
                  />
                </div>
                
                {vendor.priceType === 'per_head' && userEvent.guestCount && (
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-600">
                      For {userEvent.guestCount} guests:
                    </span>
                    <span>
                      {formatCurrency(vendor.priceFrom * userEvent.guestCount)}
                    </span>
                  </div>
                )}
                
                {selectedAddOns.length > 0 && (
                  <>
                    <Separator className="my-3" />
                    <div className="mb-2">
                      <span className="text-gray-600">Selected add-ons:</span>
                      <ul className="mt-1 space-y-1">
                        {selectedAddOns.map(addOnId => {
                          const addOn = vendor.addOns.find(a => a.id === addOnId);
                          if (!addOn) return null;
                          
                          let addOnPrice = addOn.price;
                          if (vendor.priceType === 'per_head' && userEvent.guestCount) {
                            addOnPrice *= userEvent.guestCount;
                          }
                          
                          return (
                            <li key={addOnId} className="flex justify-between">
                              <span className="text-sm">{addOn.name}</span>
                              <span className="text-sm font-medium">
                                {formatCurrency(addOnPrice)}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                )}
                
                <Separator className="my-3" />
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-semibold text-purple-700">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                
                {userEvent.budget?.max && totalPrice > userEvent.budget.max && (
                  <Alert className="mt-4 border-yellow-200 bg-yellow-50 text-yellow-800">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      This is {formatCurrency(totalPrice - userEvent.budget.max)} over your budget.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full"
                  onClick={handleAddToPackage}
                  disabled={isInPackage}
                >
                  {isInPackage ? 'Added to Package' : 'Add to Package'}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link to="/package-builder">
                    View Package
                  </Link>
                </Button>
              </div>
              
              <p className="mt-4 text-xs text-gray-500">
                * Prices may vary based on date, location, and specific requirements.
                Contact for a custom quote.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
