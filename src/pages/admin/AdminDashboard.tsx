
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import AdminLayout from '@/components/layout/AdminLayout';
import AdminTable from '@/components/admin/AdminTable';
import { Star, Package, Calendar, User, Tag, Check, X } from 'lucide-react';
import { VendorCategory } from '@/types/vendor';

// Mock data for vendors
const mockVendors = [
  { id: '1', name: 'Elegant Catering Co.', category: 'Catering', location: 'Los Angeles, CA', rating: 4.8, status: 'active' },
  { id: '2', name: 'Dream Venue', category: 'Venue', location: 'New York, NY', rating: 4.6, status: 'active' },
  { id: '3', name: 'Picture Perfect Photography', category: 'Photography', location: 'Chicago, IL', rating: 4.9, status: 'pending' },
  { id: '4', name: 'Melody DJs', category: 'Music', location: 'Miami, FL', rating: 4.7, status: 'active' },
  { id: '5', name: 'Floral Designs', category: 'Flowers', location: 'Seattle, WA', rating: 4.5, status: 'pending' }
];

// Mock data for bookings
const mockBookings = [
  { id: '1', client: 'Sarah & Michael', eventType: 'Wedding', date: new Date(2025, 5, 15), vendors: 3, status: 'confirmed' },
  { id: '2', client: 'Innovate Corp', eventType: 'Corporate', date: new Date(2025, 4, 10), vendors: 2, status: 'pending' },
  { id: '3', client: 'John Smith', eventType: 'Birthday', date: new Date(2025, 3, 22), vendors: 1, status: 'confirmed' },
  { id: '4', client: 'Emma & David', eventType: 'Wedding', date: new Date(2024, 11, 5), vendors: 4, status: 'completed' }
];

// Mock data for reviews
const mockReviews = [
  { id: '1', vendor: 'Elegant Catering Co.', reviewer: 'Sarah J.', rating: 5, content: 'Amazing food and service!', status: 'approved' },
  { id: '2', vendor: 'Dream Venue', reviewer: 'Michael T.', rating: 4, content: 'Beautiful venue but a bit pricey.', status: 'approved' },
  { id: '3', vendor: 'Picture Perfect Photography', reviewer: 'Emma L.', rating: 5, content: 'The photos were incredible!', status: 'pending' },
  { id: '4', vendor: 'Melody DJs', reviewer: 'John S.', rating: 3, content: 'Good music selection but arrived late.', status: 'pending' }
];

// Mock data for categories
const mockCategories = [
  { id: '1', name: 'Catering', count: 24 },
  { id: '2', name: 'Venue', count: 18 },
  { id: '3', name: 'Photography', count: 31 },
  { id: '4', name: 'Videography', count: 15 },
  { id: '5', name: 'Music', count: 27 },
  { id: '6', name: 'Decor', count: 22 },
  { id: '7', name: 'Flowers', count: 19 }
];

// Mock data for themes
const mockThemes = [
  { id: '1', name: 'Rustic', popularity: 'High' },
  { id: '2', name: 'Modern Minimalist', popularity: 'Medium' },
  { id: '3', name: 'Garden Party', popularity: 'High' },
  { id: '4', name: 'Vintage Glam', popularity: 'Medium' },
  { id: '5', name: 'Beach', popularity: 'High' },
  { id: '6', name: 'Bohemian', popularity: 'Medium' }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('vendors');
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'category' | 'theme' | 'vendor'>('category');
  
  // Form states
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newThemeName, setNewThemeName] = useState('');
  const [newThemePopularity, setNewThemePopularity] = useState('Medium');
  
  const openAddDialog = (type: 'category' | 'theme' | 'vendor') => {
    setDialogType(type);
    setDialogOpen(true);
  };
  
  const handleAddItem = () => {
    // In a real app, this would save to the database
    if (dialogType === 'category' && newCategoryName) {
      toast.success(`Category "${newCategoryName}" added successfully`);
      setNewCategoryName('');
    } else if (dialogType === 'theme' && newThemeName) {
      toast.success(`Theme "${newThemeName}" added successfully`);
      setNewThemeName('');
      setNewThemePopularity('Medium');
    }
    
    setDialogOpen(false);
  };
  
  const handleApproveReview = (reviewId: string) => {
    // In a real app, this would update the review status
    toast.success('Review approved successfully');
  };
  
  const handleRejectReview = (reviewId: string) => {
    // In a real app, this would update the review status
    toast.success('Review rejected');
  };
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>
              Manage vendors, bookings, reviews, and system settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Vendors</p>
                    <p className="text-2xl font-bold">{mockVendors.length}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Bookings</p>
                    <p className="text-2xl font-bold">
                      {mockBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-yellow-100 rounded-full p-3">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending Reviews</p>
                    <p className="text-2xl font-bold">
                      {mockReviews.filter(r => r.status === 'pending').length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <Tag className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Categories</p>
                    <p className="text-2xl font-bold">{mockCategories.length}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="themes">Themes</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              
              {(activeTab === 'categories' || activeTab === 'themes') && (
                <Button onClick={() => openAddDialog(activeTab === 'categories' ? 'category' : 'theme')}>
                  Add {activeTab === 'categories' ? 'Category' : 'Theme'}
                </Button>
              )}
            </div>
          </div>
          
          <TabsContent value="vendors" className="space-y-4">
            <AdminTable
              headers={['Name', 'Category', 'Location', 'Rating', 'Status', 'Actions']}
              rows={mockVendors.map(vendor => [
                vendor.name,
                vendor.category,
                vendor.location,
                `${vendor.rating} ★`,
                <Badge key={vendor.id} variant={vendor.status === 'active' ? 'default' : 'outline'}>
                  {vendor.status}
                </Badge>,
                <div key={vendor.id} className="flex space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              ])}
            />
          </TabsContent>
          
          <TabsContent value="bookings" className="space-y-4">
            <AdminTable
              headers={['Client', 'Event Type', 'Date', 'Vendors', 'Status', 'Actions']}
              rows={mockBookings.map(booking => [
                booking.client,
                booking.eventType,
                booking.date.toLocaleDateString(),
                booking.vendors,
                <Badge key={booking.id} variant={
                  booking.status === 'confirmed' ? 'default' :
                  booking.status === 'pending' ? 'outline' : 'secondary'
                }>
                  {booking.status}
                </Badge>,
                <div key={booking.id} className="flex space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              ])}
            />
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            <AdminTable
              headers={['Vendor', 'Reviewer', 'Rating', 'Comment', 'Status', 'Actions']}
              rows={mockReviews.map(review => [
                review.vendor,
                review.reviewer,
                `${review.rating} ★`,
                <div key={review.id} className="max-w-xs truncate">{review.content}</div>,
                <Badge key={review.id} variant={review.status === 'approved' ? 'default' : 'outline'}>
                  {review.status}
                </Badge>,
                <div key={review.id} className="flex space-x-2">
                  {review.status === 'pending' ? (
                    <>
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0" onClick={() => handleApproveReview(review.id)}>
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0" onClick={() => handleRejectReview(review.id)}>
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm">View</Button>
                  )}
                </div>
              ])}
            />
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <AdminTable
              headers={['Category Name', 'Vendor Count', 'Actions']}
              rows={mockCategories.map(category => [
                category.name,
                category.count,
                <div key={category.id} className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </div>
              ])}
            />
          </TabsContent>
          
          <TabsContent value="themes" className="space-y-4">
            <AdminTable
              headers={['Theme Name', 'Popularity', 'Actions']}
              rows={mockThemes.map(theme => [
                theme.name,
                <Badge key={theme.id} variant={
                  theme.popularity === 'High' ? 'default' :
                  theme.popularity === 'Medium' ? 'outline' : 'secondary'
                }>
                  {theme.popularity}
                </Badge>,
                <div key={theme.id} className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </div>
              ])}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Category/Theme Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'category' ? 'Add New Category' : 'Add New Theme'}
            </DialogTitle>
            <DialogDescription>
              {dialogType === 'category' 
                ? 'Create a new vendor category for the platform' 
                : 'Add a new event theme option for users'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddItem();
          }} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {dialogType === 'category' ? 'Category Name' : 'Theme Name'}
              </label>
              <Input 
                value={dialogType === 'category' ? newCategoryName : newThemeName}
                onChange={(e) => {
                  if (dialogType === 'category') {
                    setNewCategoryName(e.target.value);
                  } else {
                    setNewThemeName(e.target.value);
                  }
                }}
                placeholder={dialogType === 'category' ? 'e.g. Photography' : 'e.g. Vintage'}
                required
              />
            </div>
            
            {dialogType === 'theme' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Popularity</label>
                <Select value={newThemePopularity} onValueChange={setNewThemePopularity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add {dialogType === 'category' ? 'Category' : 'Theme'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminDashboard;
