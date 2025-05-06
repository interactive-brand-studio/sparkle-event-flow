
import { useState, useEffect } from 'react';
import { useUserEvent } from '@/context/UserEventContext';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const BudgetStep = () => {
  const { userEvent, updateUserEvent } = useUserEvent();
  const [budget, setBudget] = useState<[number, number]>([
    userEvent.budget?.min || 1000, 
    userEvent.budget?.max || 10000
  ]);

  useEffect(() => {
    updateUserEvent({
      budget: {
        min: budget[0],
        max: budget[1]
      }
    });
  }, [budget, updateUserEvent]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">What's your total budget range?</h2>
      <p className="text-gray-600 mb-6">
        Drag the handles to set your minimum and maximum budget for the entire event.
      </p>
      
      <div className="space-y-8">
        <div className="py-6">
          <Slider
            value={budget}
            min={500}
            max={50000}
            step={500}
            minStepsBetweenThumbs={1}
            onValueChange={(value) => setBudget(value as [number, number])}
            className="my-6"
          />
          
          <div className="flex justify-between">
            <div className="text-left">
              <Label>Minimum</Label>
              <p className="text-xl font-semibold text-purple-600">{formatCurrency(budget[0])}</p>
            </div>
            <div className="text-right">
              <Label>Maximum</Label>
              <p className="text-xl font-semibold text-purple-600">{formatCurrency(budget[1])}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Budget Breakdown:</h3>
          <p className="text-sm text-gray-600 mb-4">
            Based on industry standards, here's how your budget might be allocated:
          </p>
          <ul className="space-y-2 text-sm">
            <BudgetItem category="Venue & Catering" percentage={40} amount={(budget[1] * 0.4)} />
            <BudgetItem category="Decor & Flowers" percentage={15} amount={(budget[1] * 0.15)} />
            <BudgetItem category="Photography/Video" percentage={12} amount={(budget[1] * 0.12)} />
            <BudgetItem category="Entertainment" percentage={10} amount={(budget[1] * 0.1)} />
            <BudgetItem category="Attire & Beauty" percentage={8} amount={(budget[1] * 0.08)} />
            <BudgetItem category="Other (Invites, Favors, etc.)" percentage={15} amount={(budget[1] * 0.15)} />
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            * This is just a general guideline - you can customize this later.
          </p>
        </div>
      </div>
    </div>
  );
};

interface BudgetItemProps {
  category: string;
  percentage: number;
  amount: number;
}

const BudgetItem = ({ category, percentage, amount }: BudgetItemProps) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);

  return (
    <li className="flex justify-between">
      <span>
        {category} <span className="text-gray-500">({percentage}%)</span>
      </span>
      <span className="font-medium">{formattedAmount}</span>
    </li>
  );
};

export default BudgetStep;
