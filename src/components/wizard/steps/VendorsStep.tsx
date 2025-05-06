
import { useState, useEffect } from 'react';
import { useUserEvent, VendorType } from '@/context/UserEventContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const vendorTypes: { id: VendorType; label: string; icon: string }[] = [
  { id: 'Catering', label: 'Catering & Food', icon: '🍽️' },
  { id: 'Venue', label: 'Venue', icon: '🏛️' },
  { id: 'Photography', label: 'Photography', icon: '📸' },
  { id: 'Videography', label: 'Videography', icon: '🎥' },
  { id: 'Music', label: 'Music & DJ', icon: '🎵' },
  { id: 'Decor', label: 'Decor & Styling', icon: '✨' },
  { id: 'Flowers', label: 'Flowers', icon: '💐' },
  { id: 'Cake', label: 'Cake & Desserts', icon: '🍰' },
  { id: 'Invitations', label: 'Invitations', icon: '📨' },
  { id: 'Transportation', label: 'Transportation', icon: '🚗' },
  { id: 'Rentals', label: 'Furniture & Rentals', icon: '🪑' },
  { id: 'Hair & Makeup', label: 'Hair & Makeup', icon: '💄' },
  { id: 'Other', label: 'Other Services', icon: '🎁' },
];

const VendorsStep = () => {
  const { userEvent, updateUserEvent } = useUserEvent();
  const [selectedVendors, setSelectedVendors] = useState<VendorType[]>(
    userEvent.preferredVendors || []
  );
  const [fullPackage, setFullPackage] = useState(false);

  useEffect(() => {
    updateUserEvent({ preferredVendors: selectedVendors });
  }, [selectedVendors, updateUserEvent]);

  const toggleVendor = (vendorType: VendorType) => {
    setSelectedVendors(prev => {
      if (prev.includes(vendorType)) {
        return prev.filter(v => v !== vendorType);
      } else {
        return [...prev, vendorType];
      }
    });
    // If selecting a specific vendor, full package should be false
    setFullPackage(false);
  };

  const handleFullPackage = () => {
    setFullPackage(!fullPackage);
    if (!fullPackage) {
      // Select all vendors for a full package
      setSelectedVendors(vendorTypes.map(v => v.id));
    } else {
      // Unselect all if toggling off
      setSelectedVendors([]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">What vendors do you need?</h2>
      <p className="text-gray-600 mb-6">Select the services you're looking for.</p>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-2 p-4 bg-purple-50 rounded-lg">
          <Checkbox 
            id="full-package" 
            checked={fullPackage}
            onCheckedChange={handleFullPackage}
          />
          <Label htmlFor="full-package" className="font-medium">
            I want help planning the entire event (all services)
          </Label>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {vendorTypes.map((vendor) => (
            <div 
              key={vendor.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
                selectedVendors.includes(vendor.id) 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200'
              }`}
            >
              <Checkbox 
                id={vendor.id} 
                checked={selectedVendors.includes(vendor.id)}
                onCheckedChange={() => toggleVendor(vendor.id)}
              />
              <Label htmlFor={vendor.id} className="flex items-center cursor-pointer w-full">
                <span className="mr-2">{vendor.icon}</span>
                {vendor.label}
              </Label>
            </div>
          ))}
        </div>
        
        <div className="text-center text-gray-600 text-sm">
          {selectedVendors.length === 0 ? (
            <p>Please select at least one service or choose "plan the entire event"</p>
          ) : (
            <p>You've selected {selectedVendors.length} service{selectedVendors.length !== 1 ? 's' : ''}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorsStep;
