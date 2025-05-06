
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import VendorLayout from '@/components/layout/VendorLayout';
import BookingItem from '@/components/vendor/BookingItem';
import { formatCurrency } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data types
interface VendorBooking {
  id: string;
  eventType: string;
  date: Date;
  location: string;
  clientName: string;
  status: 'confirmed' | 'pending' | 'completed';
  price: number;
  notes?: string;
  contactEmail?: string;
  contactPhone?: string;
}

// Mock data
const mockBookings: VendorBooking[] = [
  {
    id: '1',
    eventType: 'Wedding',
    date: new Date(2025, 5, 15),
    location: 'Grand Plaza Hotel',
    clientName: 'Sarah & Michael',
    status: 'confirmed',
    price: 3200,
    contactEmail: 'sarah@example.com',
    contactPhone: '(555) 123-4567',
    notes: 'Bride is vegetarian, prepare accordingly.'
  },
  {
    id: '2',
    eventType: 'Corporate Event',
    date: new Date(2025, 4, 10),
    location: 'Tech Conference Center',
    clientName: 'Innovate Corp',
    status: 'pending',
    price: 2800,
    contactEmail: 'events@innovatecorp.com',
    contactPhone: '(555) 987-6543',
    notes: 'Requires setup by 8AM.'
  },
  {
    id: '3',
    eventType: 'Birthday Party',
    date: new Date(2025, 3, 22),
    location: 'City View Loft',
    clientName: 'John Smith',
    status: 'confirmed',
    price: 1800,
    contactEmail: 'john@example.com',
    contactPhone: '(555) 555-5555'
  },
  {
    id: '4',
    eventType: 'Wedding',
    date: new Date(2024, 11, 5),
    location: 'Riverside Gardens',
    clientName: 'Emma & David',
    status: 'completed',
    price: 4500,
    contactEmail: 'emma@example.com',
    contactPhone: '(555) 222-3333'
  }
];

const VendorBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<VendorBooking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  
  // Filter bookings based on active tab
  const getFilteredBookings = () => {
    const currentDate = new Date();
    
    switch (activeTab) {
      case 'upcoming':
        return mockBookings.filter(b => 
          (b.status === 'confirmed' || b.status === 'pending') && 
          b.date > currentDate
        ).sort((a, b) => a.date.getTime() - b.date.getTime());
      
      case 'pending':
        return mockBookings.filter(b => 
          b.status === 'pending'
        ).sort((a, b) => a.date.getTime() - b.date.getTime());
      
      case 'completed':
        return mockBookings.filter(b => 
          b.status === 'completed' || b.date < currentDate
        ).sort((a, b) => b.date.getTime() - a.date.getTime());
      
      default:
        return mockBookings;
    }
  };
  
  const handleStatusChange = (bookingId: string, newStatus: 'confirmed' | 'pending' | 'completed') => {
    // This would update the booking status in a real app
    // For now we'll just show a toast message
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Booking ${bookingId} status updated to ${newStatus}`);
    }, 800);
  };
  
  const handleViewDetails = (booking: VendorBooking) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };
  
  const handleOpenContact = (booking: VendorBooking) => {
    setSelectedBooking(booking);
    setContactOpen(true);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would send the message to the client
    setTimeout(() => {
      setIsLoading(false);
      setContactOpen(false);
      setContactMessage('');
      toast.success('Message sent to client');
    }, 1000);
  };
  
  const filteredBookings = getFilteredBookings();
  
  return (
    <VendorLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Bookings</h1>
        </div>
        
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          {Object.keys({ upcoming: true, pending: true, completed: true }).map(tab => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {isLoading ? (
                // Loading skeleton
                Array(3).fill(0).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex flex-col space-y-3">
                        <Skeleton className="h-6 w-1/3" />
                        <div className="flex space-x-4">
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                        <div className="flex justify-between mt-2">
                          <Skeleton className="h-4 w-1/5" />
                          <Skeleton className="h-10 w-28" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : filteredBookings.length > 0 ? (
                filteredBookings.map(booking => (
                  <BookingItem 
                    key={booking.id} 
                    booking={booking} 
                    onViewDetails={() => handleViewDetails(booking)}
                    onContactClient={() => handleOpenContact(booking)}
                    onStatusChange={(status) => handleStatusChange(booking.id, status)}
                  />
                ))
              ) : (
                <Card className="border-dashed border-2">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No {tab} bookings</h3>
                    <p className="text-gray-500 mb-4">
                      {tab === 'upcoming' && "You don't have any upcoming bookings"}
                      {tab === 'pending' && "You don't have any pending booking requests"}
                      {tab === 'completed' && "You don't have any completed bookings yet"}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Booking Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Full information about this event
              </DialogDescription>
            </DialogHeader>
            
            {selectedBooking && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Event Type</h4>
                    <p>{selectedBooking.eventType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date</h4>
                    <p>{selectedBooking.date.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Client</h4>
                    <p>{selectedBooking.clientName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <p className="capitalize">{selectedBooking.status}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p>{selectedBooking.location}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Price</h4>
                    <p>{formatCurrency(selectedBooking.price)}</p>
                  </div>
                </div>
                
                {selectedBooking.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                    <p className="text-sm">{selectedBooking.notes}</p>
                  </div>
                )}
                
                <div className="pt-4 space-y-2">
                  <h4 className="text-sm font-medium">Contact Information</h4>
                  {selectedBooking.contactEmail && (
                    <div className="flex items-center">
                      <span className="text-gray-500 w-20">Email:</span>
                      <span>{selectedBooking.contactEmail}</span>
                    </div>
                  )}
                  {selectedBooking.contactPhone && (
                    <div className="flex items-center">
                      <span className="text-gray-500 w-20">Phone:</span>
                      <span>{selectedBooking.contactPhone}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 justify-end pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setDetailsOpen(false);
                      handleOpenContact(selectedBooking);
                    }}
                  >
                    Contact Client
                  </Button>
                  <Button
                    onClick={() => {
                      const newStatus = 
                        selectedBooking.status === 'pending' 
                          ? 'confirmed' 
                          : selectedBooking.status === 'confirmed'
                            ? 'completed'
                            : 'confirmed';
                      
                      handleStatusChange(selectedBooking.id, newStatus);
                      setDetailsOpen(false);
                    }}
                  >
                    {selectedBooking.status === 'pending' 
                      ? 'Confirm Booking' 
                      : selectedBooking.status === 'confirmed'
                        ? 'Mark as Completed'
                        : 'Reopen Booking'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Contact Client Dialog */}
        <Dialog open={contactOpen} onOpenChange={setContactOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Client</DialogTitle>
              <DialogDescription>
                Send a message to {selectedBooking?.clientName}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Type your message to the client here..."
                  required
                  rows={5}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setContactOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </VendorLayout>
  );
};

export default VendorBookings;
