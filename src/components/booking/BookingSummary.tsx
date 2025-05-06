
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePackage } from '@/context/PackageContext';
import { formatCurrency } from '@/lib/utils';

const BookingSummary = () => {
  const { packageState } = usePackage();
  const vendors = Object.values(packageState.vendors).filter(Boolean);

  return (
    <div className="space-y-4">
      {vendors.length > 0 ? (
        vendors.map((vendorEntry, index) => {
          if (!vendorEntry) return null;
          const { vendor, selectedAddOns } = vendorEntry;
          
          // Calculate vendor total including add-ons
          let vendorTotal = vendor.priceFrom;
          
          // Add selected add-ons
          const addOns = vendor.addOns.filter(addon => 
            selectedAddOns.includes(addon.id)
          );
          
          const addOnTotal = addOns.reduce((sum, addon) => sum + addon.price, 0);
          vendorTotal += addOnTotal;
          
          return (
            <Card key={index} className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{vendor.name}</h4>
                    <Badge variant="outline" className="mt-1">{vendor.category}</Badge>
                  </div>
                  <span className="font-medium">{formatCurrency(vendor.priceFrom)}</span>
                </div>
                
                {selectedAddOns.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-gray-100">
                    <h5 className="text-sm text-gray-600 mb-1">Add-ons:</h5>
                    <ul className="space-y-1">
                      {addOns.map(addon => (
                        <li key={addon.id} className="flex justify-between text-sm">
                          <span>{addon.name}</span>
                          <span>{formatCurrency(addon.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="text-center py-4 text-gray-500">
          No vendors selected yet. Add vendors to your package.
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
