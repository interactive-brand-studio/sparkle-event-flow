
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, User } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface BookingItemProps {
  booking: {
    id: string;
    eventType: string;
    date: Date;
    location: string;
    clientName: string;
    status: 'confirmed' | 'pending' | 'completed';
    price: number;
  };
  onViewDetails?: () => void;
  onContactClient?: () => void;
  onStatusChange?: (status: 'confirmed' | 'pending' | 'completed') => void;
}

const BookingItem = ({ booking, onViewDetails, onContactClient, onStatusChange }: BookingItemProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const formatBookingDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 md:p-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            {/* Event Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Badge className={getStatusColor(booking.status)} variant="outline">
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
                <h3 className="ml-3 font-medium">{booking.eventType}</h3>
              </div>
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatBookingDate(booking.date)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  {booking.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="mr-2 h-4 w-4" />
                  {booking.clientName}
                </div>
              </div>
            </div>
            
            {/* Price & Actions */}
            <div className="flex flex-col items-end gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-semibold text-lg">{formatCurrency(booking.price)}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {onViewDetails && (
                  <Button variant="outline" size="sm" onClick={onViewDetails}>
                    View Details
                  </Button>
                )}
                
                {onContactClient && (
                  <Button variant="outline" size="sm" onClick={onContactClient}>
                    Contact Client
                  </Button>
                )}
                
                {onStatusChange && booking.status === 'pending' && (
                  <Button size="sm" onClick={() => onStatusChange('confirmed')}>
                    Accept Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
