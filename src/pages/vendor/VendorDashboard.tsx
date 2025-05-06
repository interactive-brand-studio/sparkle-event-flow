
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, Eye, Star, ArrowRight } from 'lucide-react';
import VendorLayout from '@/components/layout/VendorLayout';
import BookingItem from '@/components/vendor/BookingItem';

// Mock data
const upcomingBookings = [
  {
    id: '1',
    eventType: 'Wedding',
    date: new Date(2025, 5, 15),
    location: 'Grand Plaza Hotel',
    clientName: 'Sarah & Michael',
    status: 'confirmed' as 'confirmed' | 'pending' | 'completed',
    price: 3200
  },
  {
    id: '2',
    eventType: 'Corporate Event',
    date: new Date(2025, 4, 10),
    location: 'Tech Conference Center',
    clientName: 'Innovate Corp',
    status: 'pending' as 'confirmed' | 'pending' | 'completed',
    price: 2800
  }
];

const VendorDashboard = () => {
  // Mock vendor data
  const vendor = {
    name: 'Elegant Catering Co.',
    profileViews: 324,
    packageViews: 189,
    visibilityDaysLeft: 12,
    totalBookings: 8,
    rating: 4.8
  };
  
  return (
    <VendorLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold">Welcome back, {vendor.name}</h2>
            <p className="mt-2 opacity-90">
              You have {upcomingBookings.length} upcoming bookings and {vendor.visibilityDaysLeft} days of premium visibility remaining.
            </p>
            <Button 
              variant="secondary" 
              className="mt-4 bg-white text-purple-700 hover:bg-blue-50" 
              asChild
            >
              <Link to="/vendor/promote">
                Boost Your Visibility
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                Upcoming Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{upcomingBookings.length}</div>
              <p className="text-sm text-gray-500">Next on {upcomingBookings[0]?.date.toLocaleDateString()}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Eye className="mr-2 h-4 w-4 text-purple-500" />
                Profile Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{vendor.profileViews}</div>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Star className="mr-2 h-4 w-4 text-purple-500" />
                Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{vendor.rating}</div>
              <p className="text-sm text-gray-500">From {vendor.totalBookings} bookings</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Bookings</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/vendor/bookings">View All</Link>
              </Button>
            </div>
            <CardDescription>Your upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map(booking => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Visibility Status */}
        <Card>
          <CardHeader>
            <CardTitle>Visibility Plan</CardTitle>
            <CardDescription>Your current promotion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-800">
                  Silver Plan
                </Badge>
                <h3 className="font-medium">Enhanced Visibility</h3>
                <p className="text-sm text-gray-500">
                  Your packages appear higher in search results
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{vendor.visibilityDaysLeft} days</div>
                <p className="text-sm text-gray-500">remaining</p>
                <Button variant="outline" size="sm" className="mt-2" asChild>
                  <Link to="/vendor/promote">Extend</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;
