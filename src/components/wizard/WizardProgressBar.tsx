
interface WizardProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const WizardProgressBar = ({ currentStep, totalSteps }: WizardProgressBarProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-purple-600">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium text-purple-600">{Math.round(progressPercentage)}% complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default WizardProgressBar;
