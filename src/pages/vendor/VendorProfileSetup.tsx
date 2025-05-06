
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';
import { VendorCategory } from '@/types/vendor';

const VendorProfileSetup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<VendorCategory | ''>('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  
  // Available service options based on category
  const serviceOptions = {
    'Catering': ['Full Service', 'Drop-off', 'Buffet Style', 'Plated Service', 'Food Truck'],
    'Venue': ['Indoor', 'Outdoor', 'Ceremony', 'Reception', 'All-inclusive'],
    'Photography': ['Portrait', 'Event Coverage', 'Drone', 'Photo Booth', 'Album Design'],
    'Music': ['DJ', 'Live Band', 'Solo Performer', 'Sound Equipment', 'MC Services'],
    'Flowers': ['Bouquets', 'Centerpieces', 'Arch Decoration', 'Installations', 'Corsages']
  };
  
  // Get services for the selected category
  const getCategoryServices = () => {
    if (!category || !(category in serviceOptions)) return [];
    return serviceOptions[category as keyof typeof serviceOptions];
  };
  
  const handleServiceToggle = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter(s => s !== service));
    } else {
      setServices([...services, service]);
    }
  };
  
  const handleDayToggle = (day: string) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter(d => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!name || !category || !bio || !location || services.length === 0 || workingDays.length === 0) {
      toast.error('Please fill all required fields');
      setIsLoading(false);
      return;
    }
    
    // Mock profile save - in a real app, this would connect to Supabase or another backend
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Profile saved successfully!');
      navigate('/vendor/dashboard');
    }, 1000);
  };
  
  return (
    <div className="container max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-center mb-2">Complete Your Vendor Profile</h1>
      <p className="text-center text-gray-600 mb-8">
        Add your business details to get discovered by event planners
      </p>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              Tell customers about your business and services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Business Name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={(value) => setCategory(value as VendorCategory)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Catering">Catering</SelectItem>
                    <SelectItem value="Venue">Venue</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Flowers">Flowers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Description</label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell customers about your services..."
                required
                rows={4}
              />
            </div>
            
            {category && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Services Offered</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {getCategoryServices().map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`service-${service}`} 
                        checked={services.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <label 
                        htmlFor={`service-${service}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Available Days</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`day-${day}`} 
                      checked={workingDays.includes(day)}
                      onCheckedChange={() => handleDayToggle(day)}
                    />
                    <label 
                      htmlFor={`day-${day}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save & Continue'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default VendorProfileSetup;
