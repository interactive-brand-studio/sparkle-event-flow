
import { useState, useEffect } from 'react';
import { useUserEvent } from '@/context/UserEventContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const venueTypes = [
  "Home/Private Residence",
  "Hotel",
  "Restaurant",
  "Banquet Hall",
  "Outdoor/Garden",
  "Beach",
  "Barn/Farm",
  "Winery",
  "Museum/Gallery",
  "Country Club",
  "Community Center",
  "Religious Venue",
  "Office/Workplace",
  "Virtual Event",
  "Other"
];

const LocationStep = () => {
  const { userEvent, updateUserEvent } = useUserEvent();
  const [city, setCity] = useState(userEvent.location?.city || '');
  const [venueType, setVenueType] = useState(userEvent.location?.venueType || '');

  useEffect(() => {
    if (city || venueType) {
      updateUserEvent({
        location: {
          city,
          venueType
        }
      });
    }
  }, [city, venueType, updateUserEvent]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Where will your event be hosted?</h2>
      <p className="text-gray-600 mb-6">Let us know the location details for your event.</p>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="city">City or Zip Code</Label>
          <Input
            id="city"
            placeholder="Enter city or zip code"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="venue-type">Venue Type</Label>
          <Select 
            value={venueType} 
            onValueChange={setVenueType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select venue type" />
            </SelectTrigger>
            <SelectContent>
              {venueTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
