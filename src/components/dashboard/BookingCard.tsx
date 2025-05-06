
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Package } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Vendor {
  name: string;
  category: string;
}

interface Booking {
  id: string;
  eventType: string;
  date: Date;
  location: string;
  guestCount: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'completed';
  vendors: Vendor[];
}

interface BookingCardProps {
  booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800 hover:bg-green-100',
    pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    completed: 'bg-blue-100 text-blue-800 hover:bg-blue-100'
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-lg">{booking.eventType}</h3>
            <p className="text-gray-600 text-sm">{booking.location}</p>
          </div>
          <Badge className={statusColors[booking.status]}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="h-4 w-4" />
            <span>{booking.date.toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="h-4 w-4" />
            <span>{booking.guestCount} guests</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700">
            <Package className="h-4 w-4" />
            <span>{booking.vendors.length} vendors</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {booking.vendors.slice(0, 3).map((vendor, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {vendor.name}
            </Badge>
          ))}
          {booking.vendors.length > 3 && (
            <Badge variant="outline" className="bg-gray-50">
              +{booking.vendors.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t">
          <div>
            <span className="text-gray-600 text-sm">Total:</span>
            <span className="font-medium ml-2">{formatCurrency(booking.totalPrice)}</span>
          </div>
          
          <Button variant="outline" size="sm" asChild>
            <Link to={`/dashboard/booking/${booking.id}`}>
              View Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
