
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Vendor, AddOn } from '../types/vendor';
import { useUserEvent } from './UserEventContext';

export type VendorWithAddOns = {
  vendor: Vendor;
  selectedAddOns: string[];
};

export interface PackageState {
  vendors: Record<string, VendorWithAddOns | null>;
  totalCost: number;
}

type PackageContextType = {
  packageState: PackageState;
  addVendor: (category: string, vendor: Vendor, addOns?: string[]) => void;
  removeVendor: (category: string) => void;
  toggleAddOn: (category: string, addOnId: string) => void;
  clearPackage: () => void;
  getTotalCost: () => number;
};

const initialState: PackageState = {
  vendors: {},
  totalCost: 0
};

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export const PackageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packageState, setPackageState] = useState<PackageState>(initialState);
  const { userEvent } = useUserEvent();
  
  const calculateTotalCost = (state: PackageState): number => {
    let total = 0;
    
    Object.values(state.vendors).forEach(vendorEntry => {
      if (!vendorEntry) return;
      
      const { vendor, selectedAddOns } = vendorEntry;
      
      // Add base vendor price
      if (vendor.priceType === 'per_head' && userEvent.guestCount) {
        total += vendor.priceFrom * userEvent.guestCount;
      } else {
        total += vendor.priceFrom;
      }
      
      // Add selected add-ons
      selectedAddOns.forEach(addOnId => {
        const addOn = vendor.addOns.find(addon => addon.id === addOnId);
        if (addOn) {
          if (vendor.priceType === 'per_head' && userEvent.guestCount) {
            total += addOn.price * userEvent.guestCount;
          } else {
            total += addOn.price;
          }
        }
      });
    });
    
    return total;
  };
  
  const addVendor = (category: string, vendor: Vendor, addOns: string[] = []) => {
    setPackageState(prev => {
      const newState = {
        ...prev,
        vendors: {
          ...prev.vendors,
          [category]: {
            vendor,
            selectedAddOns: addOns
          }
        }
      };
      
      return {
        ...newState,
        totalCost: calculateTotalCost(newState)
      };
    });
  };
  
  const removeVendor = (category: string) => {
    setPackageState(prev => {
      const newVendors = { ...prev.vendors };
      delete newVendors[category];
      
      const newState = {
        ...prev,
        vendors: newVendors
      };
      
      return {
        ...newState,
        totalCost: calculateTotalCost(newState)
      };
    });
  };
  
  const toggleAddOn = (category: string, addOnId: string) => {
    setPackageState(prev => {
      const vendorEntry = prev.vendors[category];
      if (!vendorEntry) return prev;
      
      let newSelectedAddOns: string[];
      
      if (vendorEntry.selectedAddOns.includes(addOnId)) {
        newSelectedAddOns = vendorEntry.selectedAddOns.filter(id => id !== addOnId);
      } else {
        newSelectedAddOns = [...vendorEntry.selectedAddOns, addOnId];
      }
      
      const newState = {
        ...prev,
        vendors: {
          ...prev.vendors,
          [category]: {
            ...vendorEntry,
            selectedAddOns: newSelectedAddOns
          }
        }
      };
      
      return {
        ...newState,
        totalCost: calculateTotalCost(newState)
      };
    });
  };
  
  const clearPackage = () => {
    setPackageState(initialState);
  };
  
  const getTotalCost = () => {
    return packageState.totalCost;
  };
  
  return (
    <PackageContext.Provider
      value={{
        packageState,
        addVendor,
        removeVendor,
        toggleAddOn,
        clearPackage,
        getTotalCost
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = (): PackageContextType => {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
};
