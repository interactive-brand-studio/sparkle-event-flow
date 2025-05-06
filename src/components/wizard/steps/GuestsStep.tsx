
import { useState, useEffect } from 'react';
import { useUserEvent } from '@/context/UserEventContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GuestsStep = () => {
  const { userEvent, updateUserEvent } = useUserEvent();
  const [guestCount, setGuestCount] = useState<number>(userEvent.guestCount || 50);
  const [inputValue, setInputValue] = useState<string>((userEvent.guestCount || 50).toString());

  useEffect(() => {
    updateUserEvent({ guestCount });
  }, [guestCount, updateUserEvent]);

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setGuestCount(newValue);
    setInputValue(newValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 500) {
      setGuestCount(numValue);
    }
  };

  const handleQuickSelect = (count: number) => {
    setGuestCount(count);
    setInputValue(count.toString());
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">How many guests are expected?</h2>
      <p className="text-gray-600 mb-6">This helps us recommend vendors with appropriate capacity.</p>
      
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          <Slider
            value={[guestCount]}
            min={0}
            max={500}
            step={1}
            onValueChange={handleSliderChange}
            className="flex-grow"
          />
          <Input
            type="number"
            min={0}
            max={500}
            value={inputValue}
            onChange={handleInputChange}
            className="w-20"
          />
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-gray-600 mb-3">Quick select:</p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickSelect(10)}
              className={guestCount === 10 ? 'border-purple-500 bg-purple-50' : ''}
            >
              Small (10)
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickSelect(25)}
              className={guestCount === 25 ? 'border-purple-500 bg-purple-50' : ''}
            >
              Intimate (25)
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickSelect(50)}
              className={guestCount === 50 ? 'border-purple-500 bg-purple-50' : ''}
            >
              Medium (50)
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickSelect(100)}
              className={guestCount === 100 ? 'border-purple-500 bg-purple-50' : ''}
            >
              Large (100)
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickSelect(200)}
              className={guestCount === 200 ? 'border-purple-500 bg-purple-50' : ''}
            >
              XL (200)
            </Button>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <p className="text-gray-700">
            {guestCount === 0 ? (
              "Not sure about guest count yet? No problem - you can update this later."
            ) : (
              <>
                Planning for <span className="font-bold text-purple-700">{guestCount}</span> guests
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestsStep;
