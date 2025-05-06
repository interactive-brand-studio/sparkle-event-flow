
import { useState, useEffect } from 'react';
import { useUserEvent, EventType } from '@/context/UserEventContext';

const eventTypes: { type: EventType; icon: string; label: string }[] = [
  { type: 'Birthday', icon: '🎂', label: 'Birthday' },
  { type: 'Wedding', icon: '💍', label: 'Wedding' },
  { type: 'Baby Shower', icon: '👶', label: 'Baby Shower' },
  { type: 'Graduation', icon: '🎓', label: 'Graduation' },
  { type: 'Engagement', icon: '💕', label: 'Engagement' },
  { type: 'Anniversary', icon: '🥂', label: 'Anniversary' },
  { type: 'Holiday', icon: '🎄', label: 'Holiday' },
  { type: 'Corporate', icon: '💼', label: 'Corporate' },
  { type: 'Other', icon: '✨', label: 'Other' }
];

const EventTypeStep = () => {
  const { userEvent, updateUserEvent } = useUserEvent();
  const [selectedType, setSelectedType] = useState<EventType | null>(userEvent.eventType);

  const handleSelect = (type: EventType) => {
    setSelectedType(type);
    updateUserEvent({ eventType: type });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">What type of event are you planning?</h2>
      <p className="text-gray-600 mb-6">Select the type of event you're organizing.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {eventTypes.map((event) => (
          <div
            key={event.type}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md
              ${selectedType === event.type 
                ? 'border-purple-500 bg-purple-50 shadow-md' 
                : 'border-gray-200 hover:border-purple-300'}`}
            onClick={() => handleSelect(event.type)}
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl mb-2">{event.icon}</span>
              <span className="font-medium">{event.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTypeStep;
