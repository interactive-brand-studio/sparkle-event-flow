
import { useState, useEffect } from 'react';
import { useUserEvent, ThemeType } from '@/context/UserEventContext';

const themes: { id: ThemeType; label: string; color: string }[] = [
  { id: 'Boho', label: 'Bohemian', color: 'bg-amber-100' },
  { id: 'Classic', label: 'Classic Elegance', color: 'bg-slate-100' },
  { id: 'Glam', label: 'Glamorous', color: 'bg-pink-100' },
  { id: 'Minimal', label: 'Minimalist', color: 'bg-gray-100' },
  { id: 'Rustic', label: 'Rustic', color: 'bg-amber-200' },
  { id: 'Modern', label: 'Modern', color: 'bg-zinc-100' },
  { id: 'Vintage', label: 'Vintage', color: 'bg-orange-100' },
  { id: 'Whimsical', label: 'Whimsical', color: 'bg-indigo-100' },
  { id: 'Tropical', label: 'Tropical', color: 'bg-teal-100' },
  { id: 'Other', label: 'Other', color: 'bg-violet-100' },
];

const ThemeStep = () => {
  const { userEvent, updateUserEvent } = useUserEvent();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | null>(userEvent.theme);

  useEffect(() => {
    updateUserEvent({ theme: selectedTheme });
  }, [selectedTheme, updateUserEvent]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Select a theme for your event</h2>
      <p className="text-gray-600 mb-6">Choose a style that matches your vision.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`cursor-pointer rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${
              selectedTheme === theme.id ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setSelectedTheme(theme.id)}
          >
            <div className={`aspect-square ${theme.color} flex items-center justify-center`}>
              <div className="text-4xl">{getThemeEmoji(theme.id)}</div>
            </div>
            <div className="p-3 bg-white text-center">
              <span className="font-medium">{theme.label}</span>
            </div>
          </div>
        ))}
      </div>
      
      {selectedTheme && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-center text-gray-700">
            You've selected <span className="font-bold text-purple-700">{selectedTheme}</span> theme
          </p>
        </div>
      )}
    </div>
  );
};

const getThemeEmoji = (theme: ThemeType): string => {
  switch (theme) {
    case 'Boho': return '🪶';
    case 'Classic': return '🕯️';
    case 'Glam': return '✨';
    case 'Minimal': return '◻️';
    case 'Rustic': return '🌿';
    case 'Modern': return '🔲';
    case 'Vintage': return '📜';
    case 'Whimsical': return '🧚';
    case 'Tropical': return '🌴';
    case 'Other': return '🎨';
  }
};

export default ThemeStep;
