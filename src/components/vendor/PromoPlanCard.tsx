
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PromoPlanProps {
  plan: {
    id: string;
    name: string;
    price: number;
    duration: number;
    features: string[];
    accentColor: string;
    buttonVariant: 'default' | 'outline';
    popular?: boolean;
  };
  isSelected: boolean;
  onSelect: () => void;
}

const PromoPlanCard = ({ plan, isSelected, onSelect }: PromoPlanProps) => {
  return (
    <Card 
      className={`relative overflow-hidden transition-all ${
        isSelected ? 'ring-2 ring-purple-500 shadow-lg scale-[1.02]' : ''
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            POPULAR
          </div>
        </div>
      )}
      
      <div className={`h-2 w-full bg-gradient-to-r ${plan.accentColor}`} />
      
      <CardHeader className="pb-0">
        <div className="text-center">
          <h3 className="text-2xl font-bold">{plan.name}</h3>
          <div className="mt-2 mb-1">
            <span className="text-3xl font-bold">${plan.price}</span>
            <span className="text-gray-500 ml-1">/ {plan.duration} days</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3 my-6">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <div className="mr-2 mt-1 bg-green-100 rounded-full p-1">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full"
          variant={plan.buttonVariant}
          onClick={onSelect}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromoPlanCard;
