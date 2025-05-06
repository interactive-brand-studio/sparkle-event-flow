
import { useEffect, useState } from 'react';
import { useUserEvent } from '@/context/UserEventContext';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const EventDateStep = () => {
  const { userEvent, updateUserEvent } = useUserEvent();
  const [date, setDate] = useState<Date | undefined>(userEvent.eventDate || undefined);

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      updateUserEvent({ eventDate: date });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">When is your event?</h2>
      <p className="text-gray-600 mb-6">Select the date for your event.</p>
      
      <div className="flex flex-col items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border p-3 pointer-events-auto"
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
        
        {date && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200 w-full text-center">
            <p className="text-gray-600">Selected date:</p>
            <p className="text-xl font-medium text-purple-800">{format(date, 'PPPP')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDateStep;
