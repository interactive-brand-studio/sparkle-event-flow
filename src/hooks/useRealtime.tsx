
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useRealtime = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Listen to booking changes
    const bookingChannel = supabase
      .channel('booking-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bookings'
      }, (payload) => {
        console.log('Booking change:', payload);
        queryClient.invalidateQueries({ queryKey: ['bookings'] });
        queryClient.invalidateQueries({ queryKey: ['vendor-bookings'] });
      })
      .subscribe();

    // Listen to vendor changes
    const vendorChannel = supabase
      .channel('vendor-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'vendors'
      }, (payload) => {
        console.log('Vendor change:', payload);
        queryClient.invalidateQueries({ queryKey: ['vendors'] });
      })
      .subscribe();

    // Listen to review changes
    const reviewChannel = supabase
      .channel('review-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'reviews'
      }, (payload) => {
        console.log('Review change:', payload);
        queryClient.invalidateQueries({ queryKey: ['reviews'] });
        queryClient.invalidateQueries({ queryKey: ['vendor-reviews'] });
      })
      .subscribe();

    // Listen to notification changes
    const notificationChannel = supabase
      .channel('notification-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications'
      }, (payload) => {
        console.log('New notification:', payload);
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(bookingChannel);
      supabase.removeChannel(vendorChannel);
      supabase.removeChannel(reviewChannel);
      supabase.removeChannel(notificationChannel);
    };
  }, [queryClient]);
};
