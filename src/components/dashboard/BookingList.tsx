
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import BookingCard from './BookingCard';
import EmptyState from '@/components/ui/EmptyState';

export interface Booking {
  id: string;
  eventType: string;
  date: Date;
  location: string;
  guestCount: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'completed';
  vendors: {
    name: string;
    category: string;
  }[];
}

interface BookingListProps {
  bookings: Booking[];
}

const BookingList = ({ bookings }: BookingListProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Bookings</h2>
      
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Package}
          title="No bookings yet"
          description="You haven't made any bookings yet."
          actionLabel="Start Planning"
          actionLink="/plan"
        />
      )}
    </div>
  );
};

export default BookingList;
