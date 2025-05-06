
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import UserSidebar from '@/components/dashboard/UserSidebar';
import BookingList from '@/components/dashboard/BookingList';
import SavedPackages from '@/components/dashboard/SavedPackages';
import AccountSection from '@/components/dashboard/AccountSection';
import { Booking } from '@/components/dashboard/BookingList';

// Mock data for dashboard
const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    eventType: 'Wedding',
    date: new Date(2025, 5, 15),
    location: 'Grand Plaza Hotel',
    guestCount: 120,
    totalPrice: 12500,
    status: 'confirmed',
    vendors: [
      { name: 'Elegant Catering', category: 'Catering' },
      { name: 'Melody DJs', category: 'Music' },
      { name: 'Floral Arrangements', category: 'Flowers' }
    ]
  },
  {
    id: '2',
    eventType: 'Corporate Event',
    date: new Date(2025, 7, 3),
    location: 'Business Center',
    guestCount: 75,
    totalPrice: 8200,
    status: 'pending',
    vendors: [
      { name: 'Business Catering Co.', category: 'Catering' },
      { name: 'Tech AV Solutions', category: 'Equipment' }
    ]
  }
];

const SAVED_PACKAGES = [
  {
    id: '1',
    name: 'Summer Birthday Party',
    totalPrice: 3800,
    createdAt: new Date(2025, 3, 10),
    vendorCount: 4
  },
  {
    id: '2',
    name: 'Anniversary Celebration',
    totalPrice: 5500,
    createdAt: new Date(2025, 4, 22),
    vendorCount: 5
  }
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Mock user data - in a real app, this would come from auth context
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    joinDate: new Date(2024, 0, 15)
  };
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader username={user.name} email={user.email} />
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* User profile sidebar */}
          <UserSidebar user={user} />
          
          {/* Main content area with tabs */}
          <div className="flex-1">
            <Tabs defaultValue="bookings" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="packages">Saved Packages</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              
              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <BookingList bookings={MOCK_BOOKINGS} />
              </TabsContent>
              
              {/* Saved Packages Tab */}
              <TabsContent value="packages">
                <SavedPackages savedPackages={SAVED_PACKAGES} />
              </TabsContent>
              
              {/* Account Settings Tab */}
              <TabsContent value="settings">
                <AccountSection user={user} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
