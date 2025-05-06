
import { useState, useEffect } from 'react';
import { useUserEvent } from '@/context/UserEventContext';
import { Textarea } from '@/components/ui/textarea';

const RequestsStep = () => {
  const { userEvent, updateUserEvent } = useUserEvent();
  const [requests, setRequests] = useState(userEvent.specialRequests || '');
  const [charCount, setCharCount] = useState(0);
  
  useEffect(() => {
    setCharCount(requests.length);
    updateUserEvent({ specialRequests: requests });
  }, [requests, updateUserEvent]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Any special requests?</h2>
      <p className="text-gray-600 mb-6">
        Tell us about any specific needs, ideas, or preferences for your event.
      </p>
      
      <div>
        <Textarea
          placeholder="Examples: 'My grandmother has mobility issues and needs accessible seating.', 'I want a chocolate fountain!', 'Looking for vendors who can accommodate food allergies.'"
          value={requests}
          onChange={(e) => setRequests(e.target.value)}
          className="min-h-[150px]"
          maxLength={500}
        />
        <div className="flex justify-between text-sm mt-2 text-gray-500">
          <span>Optional</span>
          <span>{charCount}/500 characters</span>
        </div>
        
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold mb-2">Almost There!</h3>
          <p className="text-gray-700">
            We're gathering all your preferences to create the perfect event package for you. 
            Just one more step to go!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestsStep;
