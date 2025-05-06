
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, Settings, User, Star, Edit, Trash } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import BookingCard from '@/components/dashboard/BookingCard';

// Mock data for dashboard
const MOCK_BOOKINGS = [
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
        <header className="mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-gray-600">Manage your bookings, saved packages, and account settings</p>
        </header>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* User profile sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <User className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-lg">{user.name}</h3>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  
                  <div className="mt-6 w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="mr-2 h-4 w-4" />
                      My Bookings
                    </Button>
                    <Button variant="outline" className="w-full justify-start mt-2">
                      <Star className="mr-2 h-4 w-4" />
                      Saved Packages
                    </Button>
                    <Button variant="outline" className="w-full justify-start mt-2">
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/plan">
                  <Calendar className="mr-2 h-4 w-4" />
                  Start Planning
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Main content area with tabs */}
          <div className="flex-1">
            <Tabs defaultValue="bookings" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="packages">Saved Packages</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              
              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-6">
                <h2 className="text-xl font-semibold">Your Bookings</h2>
                
                {MOCK_BOOKINGS.length > 0 ? (
                  <div className="space-y-4">
                    {MOCK_BOOKINGS.map(booking => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="my-8">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium">No bookings yet</h3>
                        <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
                        <Button asChild>
                          <Link to="/plan">Start Planning</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              {/* Saved Packages Tab */}
              <TabsContent value="packages" className="space-y-6">
                <h2 className="text-xl font-semibold">Saved Packages</h2>
                
                {SAVED_PACKAGES.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SAVED_PACKAGES.map(pkg => (
                      <Card key={pkg.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle>{pkg.name}</CardTitle>
                            <Badge variant="outline">{pkg.vendorCount} vendors</Badge>
                          </div>
                          <CardDescription>
                            Saved on {pkg.createdAt.toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Total:</span>
                            <span className="font-medium">{formatCurrency(pkg.totalPrice)}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="default" className="flex-1" asChild>
                              <Link to={`/package-builder?package=${pkg.id}`}>
                                Resume
                              </Link>
                            </Button>
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="my-8">
                        <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium">No saved packages</h3>
                        <p className="text-gray-500 mb-4">You haven't saved any packages yet.</p>
                        <Button asChild>
                          <Link to="/package-builder">Build a Package</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              {/* Account Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Update your personal information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input defaultValue={user.name} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue={user.email} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input defaultValue={user.phone} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input type="password" defaultValue="********" />
                    </div>
                    
                    <div className="pt-4">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
