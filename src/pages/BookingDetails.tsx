
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Download, 
  MessageCircle, 
  ChevronLeft 
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import BackButton from '@/components/vendors/BackButton';

// Mock data - in a real app, this would come from an API
const MOCK_BOOKING = {
  id: '1',
  eventType: 'Wedding',
  date: new Date(2025, 5, 15),
  time: '4:00 PM - 10:00 PM',
  location: {
    name: 'Grand Plaza Hotel',
    address: '123 Main Street, Cityville, ST 12345'
  },
  guestCount: 120,
  totalPrice: 12500,
  status: 'confirmed',
  bookingDate: new Date(2024, 5, 1),
  vendors: [
    { 
      name: 'Elegant Catering', 
      category: 'Catering',
      price: 5500,
      addOns: [
        { name: 'Premium Appetizers', price: 800 },
        { name: 'Signature Cocktails', price: 600 }
      ]
    },
    { 
      name: 'Melody DJs', 
      category: 'Music',
      price: 1800,
      addOns: [
        { name: 'Extended Hours', price: 300 }
      ]
    },
    { 
      name: 'Floral Arrangements', 
      category: 'Flowers',
      price: 2200,
      addOns: []
    },
    { 
      name: 'Perfect Moments Photography', 
      category: 'Photography',
      price: 2800,
      addOns: [
        { name: 'Second Photographer', price: 500 }
      ]
    }
  ],
  paymentDetails: {
    method: 'Credit Card',
    lastFour: '1234',
    billingAddress: '456 Oak Avenue, Townsburg, ST 54321'
  },
  notes: 'Special dietary requirements for 10 guests. Gluten-free and vegetarian options needed.'
};

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, we would fetch booking details based on the ID
  const booking = MOCK_BOOKING;
  
  // Calculate subtotal from vendors
  const subtotal = booking.vendors.reduce((total, vendor) => {
    const addOnTotal = vendor.addOns.reduce((sum, addon) => sum + addon.price, 0);
    return total + vendor.price + addOnTotal;
  }, 0);
  
  // Service fee is 5% of subtotal
  const serviceFee = subtotal * 0.05;
  
  const handleDownloadInvoice = () => {
    // This would generate and download a PDF in a real app
    alert('Invoice download functionality would be implemented here.');
  };
  
  const handleContactVendor = (vendorName: string) => {
    // This would open a contact modal or messaging interface in a real app
    alert(`Contact ${vendorName} functionality would be implemented here.`);
  };
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <BackButton to="/dashboard" label="Back to Dashboard" />
          
          <div className="flex justify-between items-start mt-4">
            <div>
              <h1 className="text-3xl font-bold">Booking Details</h1>
              <p className="text-gray-600">
                Booking #{id} • {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
            </div>
            
            <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'}>
              {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
            </Badge>
          </div>
        </div>
        
        {/* Event Details Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Date & Time</h3>
                  <p>{new Date(booking.date).toLocaleDateString()}</p>
                  <p className="text-gray-600">{booking.time}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p>{booking.location.name}</p>
                  <p className="text-gray-600">{booking.location.address}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Guest Count</h3>
                  <p>{booking.guestCount} guests</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Event Type</h3>
                  <p>{booking.eventType}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Vendor Details Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Vendor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {booking.vendors.map((vendor, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{vendor.name}</h3>
                      <Badge variant="outline" className="mt-1">{vendor.category}</Badge>
                    </div>
                    <span className="font-medium">{formatCurrency(vendor.price)}</span>
                  </div>
                  
                  {vendor.addOns.length > 0 && (
                    <div className="ml-6 mt-3">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Add-ons:</h4>
                      <ul className="space-y-2">
                        {vendor.addOns.map((addon, addonIndex) => (
                          <li key={addonIndex} className="flex justify-between text-sm">
                            <span>{addon.name}</span>
                            <span>{formatCurrency(addon.price)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => handleContactVendor(vendor.name)}
                  >
                    <MessageCircle className="mr-1 h-4 w-4" />
                    Contact Vendor
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee (5%)</span>
                <span>{formatCurrency(serviceFee)}</span>
              </div>
              
              <div className="border-t pt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(subtotal + serviceFee)}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Payment Method</h3>
              <p>
                Credit Card ending in {booking.paymentDetails.lastFour}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Billed to: {booking.paymentDetails.billingAddress}
              </p>
            </div>
            
            {booking.notes && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Special Notes</h3>
                <p className="text-gray-700">{booking.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/dashboard">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <Button onClick={handleDownloadInvoice}>
            <Download className="mr-1 h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
