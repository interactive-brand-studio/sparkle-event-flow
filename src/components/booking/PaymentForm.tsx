
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Lock } from 'lucide-react';

const PaymentForm = () => {
  // In a real app, this would use a Stripe integration
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-number">Card Number <span className="text-red-500">*</span></Label>
        <div className="relative">
          <Input 
            id="card-number" 
            placeholder="1234 5678 9012 3456"
            className="pl-10"
          />
          <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiration Date <span className="text-red-500">*</span></Label>
          <Input id="expiry" placeholder="MM / YY" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC <span className="text-red-500">*</span></Label>
          <div className="relative">
            <Input id="cvc" placeholder="123" className="pl-10" />
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name-on-card">Name on Card <span className="text-red-500">*</span></Label>
        <Input id="name-on-card" placeholder="John Smith" />
      </div>
      
      <div className="pt-4 space-y-4">
        <h3 className="font-medium">Billing Address</h3>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select defaultValue="us">
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="123 Main St" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Anytown" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State / Province</Label>
            <Input id="state" placeholder="CA" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zip">Zip / Postal Code</Label>
          <Input id="zip" placeholder="12345" />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t flex items-center text-sm text-gray-500">
        <Lock className="h-4 w-4 mr-2" />
        Your payment information is encrypted and securely processed.
      </div>
    </div>
  );
};

export default PaymentForm;
