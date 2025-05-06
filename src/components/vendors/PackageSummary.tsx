
import { Button } from '@/components/ui/button';
import VendorCard from './VendorCard';
import BudgetMeter from './BudgetMeter';
import { usePackage } from '@/context/PackageContext';
import { useUserEvent } from '@/context/UserEventContext';
import { formatCurrency } from '@/lib/utils';
import { Vendor } from '@/types/vendor';

interface PackageSummaryProps {
  showActions?: boolean;
  onProceedBooking?: () => void;
}

const PackageSummary = ({ showActions = true, onProceedBooking }: PackageSummaryProps) => {
  const { packageState, removeVendor } = usePackage();
  const { userEvent } = useUserEvent();
  const { vendors, totalCost } = packageState;
  
  const vendorCount = Object.values(vendors).filter(Boolean).length;
  
  const handleRemoveVendor = (category: string) => {
    removeVendor(category);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Package Summary</h2>
      
      <BudgetMeter 
        currentAmount={totalCost}
        budgetMax={userEvent.budget?.max ?? null}
      />
      
      <div>
        <div className="mb-2 flex justify-between">
          <h3 className="font-medium">Vendors Selected</h3>
          <span className="font-medium text-purple-600">{vendorCount}</span>
        </div>
        
        {vendorCount === 0 ? (
          <p className="text-gray-500 italic">No vendors added to your package yet.</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(vendors).map(([category, vendorEntry]) => {
              if (!vendorEntry) return null;
              
              return (
                <div key={category} className="rounded-lg border">
                  <div className="flex items-center justify-between border-b p-3">
                    <h4 className="font-medium">{category}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveVendor(category)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="p-3">
                    <VendorCard 
                      vendor={vendorEntry.vendor}
                      onAddToPackage={() => {}}
                      compact
                    />
                    
                    {vendorEntry.selectedAddOns.length > 0 && (
                      <div className="mt-3 text-sm">
                        <p className="font-medium">Add-ons:</p>
                        <ul className="ml-4 list-disc">
                          {vendorEntry.selectedAddOns.map(addOnId => {
                            const addOn = vendorEntry.vendor.addOns.find(a => a.id === addOnId);
                            return addOn ? (
                              <li key={addOn.id}>
                                {addOn.name} ({formatCurrency(addOn.price)})
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="rounded-lg border bg-gray-50 p-4">
        <div className="flex justify-between">
          <h3 className="font-semibold">Estimated Total</h3>
          <span className="font-semibold text-purple-700">{formatCurrency(totalCost)}</span>
        </div>
        
        <p className="mt-2 text-xs text-gray-500">
          Taxes and additional fees may apply depending on vendor policies.
        </p>
      </div>
      
      {showActions && (
        <Button 
          className="w-full"
          disabled={vendorCount === 0}
          onClick={onProceedBooking}
        >
          Proceed to Booking
        </Button>
      )}
    </div>
  );
};

export default PackageSummary;
