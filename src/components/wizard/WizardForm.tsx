
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserEvent } from '@/context/UserEventContext';
import { Button } from '@/components/ui/button';
import EventTypeStep from './steps/EventTypeStep';
import EventDateStep from './steps/EventDateStep';
import LocationStep from './steps/LocationStep';
import GuestsStep from './steps/GuestsStep';
import BudgetStep from './steps/BudgetStep';
import VendorsStep from './steps/VendorsStep';
import ThemeStep from './steps/ThemeStep';
import FocusStep from './steps/FocusStep';
import RequestsStep from './steps/RequestsStep';
import AIStep from './steps/AIStep';
import WizardProgressBar from './WizardProgressBar';

const WizardForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;
  const { userEvent, updateUserEvent } = useUserEvent();
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    // Navigate based on AI consent
    if (userEvent.aiConsent) {
      // In a real app, this would navigate to AI chat
      navigate('/ai-planner');
    } else {
      navigate('/packages');
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <WizardProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mt-8 transition-all duration-500 animate-fade-in">
          {/* Conditional rendering based on current step */}
          {currentStep === 1 && <EventTypeStep />}
          {currentStep === 2 && <EventDateStep />}
          {currentStep === 3 && <LocationStep />}
          {currentStep === 4 && <GuestsStep />}
          {currentStep === 5 && <BudgetStep />}
          {currentStep === 6 && <VendorsStep />}
          {currentStep === 7 && <ThemeStep />}
          {currentStep === 8 && <FocusStep />}
          {currentStep === 9 && <RequestsStep />}
          {currentStep === 10 && <AIStep />}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              className="rounded-full px-6"
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            {currentStep < totalSteps ? (
              <Button 
                onClick={nextStep} 
                className="btn-primary"
              >
                Continue
              </Button>
            ) : (
              <Button 
                onClick={handleComplete} 
                className="btn-primary"
              >
                Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardForm;
