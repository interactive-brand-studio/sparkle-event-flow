
import { useState, useEffect } from 'react';
import { useUserEvent, FocusAreaType } from '@/context/UserEventContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const focusAreas: { id: FocusAreaType; label: string; description: string; icon: string }[] = [
  { 
    id: 'Food', 
    label: 'Food & Drinks', 
    description: 'Make culinary experiences the highlight of your event',
    icon: '🍽️' 
  },
  { 
    id: 'Music', 
    label: 'Music & Entertainment', 
    description: 'Create a memorable atmosphere with the right sound and entertainment',
    icon: '🎵' 
  },
  { 
    id: 'Decor', 
    label: 'Decor & Ambiance', 
    description: 'Transform your space with beautiful styling and design elements',
    icon: '✨' 
  },
  { 
    id: 'Memories', 
    label: 'Photography & Memories', 
    description: 'Capture every special moment with professional photography/video',
    icon: '📸' 
  },
];

const FocusStep = () => {
  const { userEvent, updateUserEvent } = useUserEvent();
  const [selectedFocus, setSelectedFocus] = useState<FocusAreaType[]>(
    userEvent.priorityFocus || []
  );

  useEffect(() => {
    updateUserEvent({ priorityFocus: selectedFocus });
  }, [selectedFocus, updateUserEvent]);

  const toggleFocus = (focus: FocusAreaType) => {
    setSelectedFocus(prev => {
      if (prev.includes(focus)) {
        return prev.filter(f => f !== focus);
      } else {
        return [...prev, focus];
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">What do you want to focus on most?</h2>
      <p className="text-gray-600 mb-6">Select up to 2 areas you want to prioritize in your budget and planning.</p>
      
      <div className="space-y-4">
        {focusAreas.map((area) => (
          <div 
            key={area.id}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedFocus.includes(area.id) 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-start">
              <Checkbox 
                id={area.id} 
                checked={selectedFocus.includes(area.id)}
                onCheckedChange={() => toggleFocus(area.id)}
                className="mt-1"
                disabled={selectedFocus.length >= 2 && !selectedFocus.includes(area.id)}
              />
              <div className="ml-3">
                <Label 
                  htmlFor={area.id} 
                  className="flex items-center font-medium cursor-pointer"
                >
                  <span className="mr-2 text-xl">{area.icon}</span>
                  {area.label}
                </Label>
                <p className="text-sm text-gray-600 mt-1 ml-7">{area.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center text-sm mt-6">
          {selectedFocus.length === 0 ? (
            <p className="text-amber-600">Please select at least one focus area</p>
          ) : selectedFocus.length === 1 ? (
            <p className="text-blue-600">You can select one more area if desired</p>
          ) : (
            <p className="text-green-600">You've selected your maximum 2 focus areas</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusStep;
