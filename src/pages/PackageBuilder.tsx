
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { useUserEvent } from '@/context/UserEventContext';
import { usePackage } from '@/context/PackageContext';
import { PackageProvider } from '@/context/PackageContext';
import PackageSummary from '@/components/vendors/PackageSummary';
import { VendorType } from '@/context/UserEventContext';
import { Edit, Plus, Calendar, Users, CircleDollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const VENDOR_TYPES: VendorType[] = [
  'Catering', 'Venue', 'Photography', 'Videography', 'Music', 'Decor', 
  'Flowers', 'Cake', 'Invitations', 'Transportation', 'Rentals', 'Hair & Makeup', 'Other'
];

const PackageBuilder = () => {
  const { userEvent } = useUserEvent();
  const { packageState, removeVendor } = usePackage();
  
  const formatDate = (date: Date | null) => {
    if (!date) return 'Not set';
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  const handleProceedBooking = () => {
    alert('Booking functionality coming soon!');
  };
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold mb-10 text-center">Build Your Package</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Event Summary */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Event Summary</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/plan">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </div>
              
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-5 w-5" />
                    <span>Event Date</span>
                  </div>
                  <p className="mt-1 font-medium">
                    {formatDate(userEvent.eventDate)}
                  </p>
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="h-5 w-5" />
                    <span>Guest Count</span>
                  </div>
                  <p className="mt-1 font-medium">
                    {userEvent.guestCount || 'Not set'}
                  </p>
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CircleDollarSign className="h-5 w-5" />
                    <span>Budget Range</span>
                  </div>
                  <p className="mt-1 font-medium">
                    {userEvent.budget 
                      ? `${formatCurrency(userEvent.budget.min)} - ${formatCurrency(userEvent.budget.max)}`
                      : 'Not set'
                    }
                  </p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Event Type</h3>
                  <p className="text-gray-700">{userEvent.eventType || 'Not set'}</p>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Theme</h3>
                  <p className="text-gray-700">{userEvent.theme || 'Not set'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Vendor Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Your Vendors</h2>
            
            <Accordion type="multiple" className="space-y-4">
              {VENDOR_TYPES.map((category) => {
                const vendorEntry = packageState.vendors[category];
                
                return (
                  <AccordionItem 
                    key={category}
                    value={category}
                    className="rounded-lg border"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex flex-1 items-center justify-between pr-2">
                        <span>{category}</span>
                        {vendorEntry ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Added
                          </Badge>
                        ) : (
                          <Badge 
                            variant="outline" 
                            className="border-dashed text-gray-500 hover:bg-transparent"
                          >
                            Not Added
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-6 pb-4">
                      {vendorEntry ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{vendorEntry.vendor.name}</h4>
                              <p className="text-sm text-gray-600">{vendorEntry.vendor.tagline}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeVendor(category)}
                                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                              >
                                Remove
                              </Button>
                              
                              <Button 
                                variant="outline"
                                size="sm"
                                asChild
                              >
                                <Link to={`/vendor/${vendorEntry.vendor.id}`}>
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                          
                          {vendorEntry.selectedAddOns.length > 0 && (
                            <div className="rounded-lg bg-gray-50 p-3">
                              <h5 className="text-sm font-medium">Selected Add-ons:</h5>
                              <ul className="mt-1 space-y-1">
                                {vendorEntry.selectedAddOns.map(addOnId => {
                                  const addOn = vendorEntry.vendor.addOns.find(a => a.id === addOnId);
                                  return addOn ? (
                                    <li key={addOn.id} className="text-sm">
                                      {addOn.name}
                                    </li>
                                  ) : null;
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-6 text-center">
                          <p className="mb-4 text-gray-600">
                            No {category.toLowerCase()} selected yet. Add one to your package.
                          </p>
                          <Button asChild>
                            <Link to={`/vendors?category=${category}`}>
                              <Plus className="mr-2 h-4 w-4" />
                              Add {category}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
        
        {/* Package Summary */}
        <div>
          <div className="sticky top-24 space-y-6">
            <PackageSummary onProceedBooking={handleProceedBooking} />
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Not sure what vendors to choose? Let our AI assistant help you create the perfect package.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/plan">
                    Use AI Planner
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the component with PackageProvider to ensure context is available
const PackageBuilderWithProvider = () => (
  <PackageBuilder />
);

export default PackageBuilderWithProvider;
