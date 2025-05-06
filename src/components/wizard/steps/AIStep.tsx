
import { useState, useEffect } from 'react';
import { useUserEvent } from '@/context/UserEventContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AIStep = () => {
  const { userEvent, updateUserEvent } = useUserEvent();
  const [aiConsent, setAiConsent] = useState(userEvent.aiConsent);

  useEffect(() => {
    updateUserEvent({ aiConsent });
  }, [aiConsent, updateUserEvent]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Let our AI help you plan!</h2>
      <p className="text-gray-600 mb-6">
        Our AI assistant can provide personalized planning advice based on your preferences.
      </p>
      
      <div className="space-y-8">
        <div className="p-6 border-2 border-purple-200 rounded-lg bg-purple-50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl">
              ✨
            </div>
            <div>
              <h3 className="font-bold text-lg">Planspark AI</h3>
              <p className="text-sm text-gray-600">Your personal event planning assistant</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="ai-consent" className="text-base font-medium">
                  Enable AI Assistant
                </Label>
                <p className="text-sm text-gray-600">
                  Your first 3 AI conversations are free!
                </p>
              </div>
              <Switch 
                id="ai-consent" 
                checked={aiConsent}
                onCheckedChange={setAiConsent}
              />
            </div>
            
            <div className="text-sm text-gray-700 p-3 bg-white rounded-md">
              <p className="font-medium mb-2">With AI Assistant, you can:</p>
              <ul className="space-y-2 pl-5 list-disc">
                <li>Get personalized vendor recommendations</li>
                <li>Ask questions about event planning</li>
                <li>Brainstorm theme ideas and design concepts</li>
                <li>Solve common planning challenges</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold mb-2 text-blue-800">Ready to finish your planning profile!</h3>
          <p className="text-gray-700">
            Click "Complete" below to see your personalized vendor packages based on your preferences.
            {aiConsent ? ' You'll be connected with our AI assistant right away!' : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIStep;
