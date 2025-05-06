
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AddOn } from '@/types/vendor';
import { formatCurrency } from '@/lib/utils';

interface AddOnSelectorProps {
  addOns: AddOn[];
  selectedAddOns: string[];
  priceType: 'per_head' | 'per_hour' | 'flat';
  guestCount?: number;
  onToggle: (addOnId: string) => void;
}

const AddOnSelector = ({ 
  addOns, 
  selectedAddOns, 
  priceType, 
  guestCount = 0,
  onToggle 
}: AddOnSelectorProps) => {
  if (addOns.length === 0) {
    return <p className="text-gray-500 italic">No add-ons available for this vendor.</p>;
  }
  
  const formatAddOnPrice = (price: number) => {
    if (priceType === 'per_head') {
      return `${formatCurrency(price)} per person`;
    }
    return formatCurrency(price);
  };
  
  const calculateTotalPrice = (price: number) => {
    if (priceType === 'per_head' && guestCount > 0) {
      return price * guestCount;
    }
    return price;
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Optional Add-ons</h3>
      
      {addOns.map((addOn) => (
        <div 
          key={addOn.id} 
          className={`rounded-lg border p-4 transition-colors ${
            selectedAddOns.includes(addOn.id) ? 'border-purple-400 bg-purple-50' : ''
          }`}
        >
          <div className="flex items-start space-x-3">
            <Checkbox 
              id={`addon-${addOn.id}`} 
              checked={selectedAddOns.includes(addOn.id)}
              onCheckedChange={() => onToggle(addOn.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <Label htmlFor={`addon-${addOn.id}`} className="font-medium">
                  {addOn.name}
                </Label>
                <div className="text-right">
                  <p className="font-medium text-purple-700">
                    {formatAddOnPrice(addOn.price)}
                  </p>
                  {priceType === 'per_head' && guestCount > 0 && (
                    <p className="text-xs text-gray-500">
                      Total: {formatCurrency(calculateTotalPrice(addOn.price))}
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600">{addOn.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddOnSelector;
