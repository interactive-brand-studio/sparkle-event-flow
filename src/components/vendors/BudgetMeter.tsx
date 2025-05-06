
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CircleDollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface BudgetMeterProps {
  currentAmount: number;
  budgetMax: number | null;
  className?: string;
}

const BudgetMeter = ({ currentAmount, budgetMax, className = '' }: BudgetMeterProps) => {
  // If no budget is set, just show the current amount
  if (!budgetMax) {
    return (
      <div className={`rounded-lg border p-4 ${className}`}>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium">Current Total</h3>
          <span className="font-semibold">{formatCurrency(currentAmount)}</span>
        </div>
      </div>
    );
  }
  
  const percentage = Math.min(Math.round((currentAmount / budgetMax) * 100), 100);
  const isOverBudget = currentAmount > budgetMax;
  const overBudgetAmount = currentAmount - budgetMax;
  
  return (
    <div className={`rounded-lg border p-4 ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">Budget</h3>
        <span className="font-semibold">{formatCurrency(currentAmount)} / {formatCurrency(budgetMax)}</span>
      </div>
      
      <Progress 
        value={percentage} 
        className={`h-2 ${isOverBudget ? 'bg-red-100' : 'bg-gray-100'}`}
        indicatorClassName={isOverBudget ? 'bg-red-500' : 'bg-green-500'}
      />
      
      <div className="mt-3 text-right text-sm">
        <span className={`${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
          {percentage}% of budget
        </span>
      </div>
      
      {isOverBudget && (
        <Alert className="mt-4 border-red-200 bg-red-50 text-red-800">
          <CircleDollarSign className="h-4 w-4" />
          <AlertDescription>
            You're {formatCurrency(overBudgetAmount)} over your budget.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BudgetMeter;
