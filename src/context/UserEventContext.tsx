
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define Event type
export type EventType = 'Birthday' | 'Wedding' | 'Baby Shower' | 'Graduation' | 'Engagement' | 'Anniversary' | 'Holiday' | 'Corporate' | 'Other';

// Define Theme type
export type ThemeType = 'Boho' | 'Classic' | 'Glam' | 'Minimal' | 'Rustic' | 'Modern' | 'Vintage' | 'Whimsical' | 'Tropical' | 'Other';

// Define Focus Area type
export type FocusAreaType = 'Food' | 'Music' | 'Decor' | 'Memories';

// Define Vendor type
export type VendorType = 'Catering' | 'Venue' | 'Photography' | 'Videography' | 'Music' | 'Decor' | 'Flowers' | 'Cake' | 'Invitations' | 'Transportation' | 'Rentals' | 'Hair & Makeup' | 'Other';

// Define interface for User Event
export interface UserEvent {
  eventType: EventType | null;
  eventDate: Date | null;
  location: {
    city: string;
    venueType: string;
  } | null;
  guestCount: number | null;
  budget: {
    min: number;
    max: number;
  } | null;
  preferredVendors: VendorType[];
  theme: ThemeType | null;
  priorityFocus: FocusAreaType[];
  specialRequests: string;
  aiConsent: boolean;
}

// Default empty state
const defaultEventState: UserEvent = {
  eventType: null,
  eventDate: null,
  location: null,
  guestCount: null,
  budget: null,
  preferredVendors: [],
  theme: null,
  priorityFocus: [],
  specialRequests: '',
  aiConsent: false
};

// Create context type
type UserEventContextType = {
  userEvent: UserEvent;
  updateUserEvent: (updates: Partial<UserEvent>) => void;
  resetUserEvent: () => void;
};

// Create context
const UserEventContext = createContext<UserEventContextType | undefined>(undefined);

// Provider component
export const UserEventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userEvent, setUserEvent] = useState<UserEvent>(defaultEventState);

  const updateUserEvent = (updates: Partial<UserEvent>) => {
    setUserEvent(prev => ({ ...prev, ...updates }));
  };

  const resetUserEvent = () => {
    setUserEvent(defaultEventState);
  };

  return (
    <UserEventContext.Provider value={{ userEvent, updateUserEvent, resetUserEvent }}>
      {children}
    </UserEventContext.Provider>
  );
};

// Custom hook to use the context
export const useUserEvent = (): UserEventContextType => {
  const context = useContext(UserEventContext);
  if (context === undefined) {
    throw new Error('useUserEvent must be used within a UserEventProvider');
  }
  return context;
};
