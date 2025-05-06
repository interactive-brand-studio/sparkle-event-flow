
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Star, Check, ArrowRight } from 'lucide-react';
import VendorLayout from '@/components/layout/VendorLayout';
import PromoPlanCard from '@/components/vendor/PromoPlanCard';

const plans = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 29.99,
    duration: 3,
    features: [
      'Higher search ranking',
      'Featured on category page',
      'Basic analytics'
    ],
    accentColor: 'from-yellow-700 to-yellow-500',
    buttonVariant: 'outline' as const
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 59.99,
    duration: 7,
    features: [
      'All Bronze features',
      'Top of search results',
      'Featured in weekly newsletter',
      'Advanced analytics'
    ],
    accentColor: 'from-gray-400 to-gray-300',
    buttonVariant: 'default' as const,
    popular: true
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 99.99,
    duration: 15,
    features: [
      'All Silver features',
      'Homepage feature rotation',
      'Dedicated account manager',
      'AI recommendation boost',
      'Priority support'
    ],
    accentColor: 'from-yellow-500 to-yellow-300',
    buttonVariant: 'outline' as const
  }
];

const VendorPromote = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handlePurchasePlan = () => {
    if (!selectedPlan) return;
    
    setIsLoading(true);
    
    // Mock purchase - in a real app, this would connect to a payment processor
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Successfully purchased ${selectedPlan} plan!`);
      // Reset selection or navigate
    }, 1500);
  };
  
  return (
    <VendorLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Boost Your Visibility</h1>
          <p className="text-gray-600 mt-1">
            Promote your services and get more bookings with our visibility plans
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <PromoPlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan.id}
              onSelect={() => handleSelectPlan(plan.id)}
            />
          ))}
        </div>
        
        {selectedPlan && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">
                    Selected: {plans.find(p => p.id === selectedPlan)?.name} Plan
                  </h3>
                  <p className="text-gray-600">
                    ${plans.find(p => p.id === selectedPlan)?.price} for {plans.find(p => p.id === selectedPlan)?.duration} days
                  </p>
                </div>
                <Button 
                  onClick={handlePurchasePlan}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Purchase Plan'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>How Visibility Plans Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 rounded-full p-2 mt-1">
                <Star className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Higher Search Ranking</h3>
                <p className="text-gray-600 text-sm">
                  Your services will appear higher in search results and category pages.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 rounded-full p-2 mt-1">
                <Star className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Featured Placement</h3>
                <p className="text-gray-600 text-sm">
                  Your business will be showcased in premium positions across the platform.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 rounded-full p-2 mt-1">
                <Star className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">AI Recommendations</h3>
                <p className="text-gray-600 text-sm">
                  Higher chance of being recommended by our AI assistant to potential clients.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 p-4 text-sm text-gray-600">
            Visibility plans are non-refundable and start immediately upon purchase.
          </CardFooter>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorPromote;
