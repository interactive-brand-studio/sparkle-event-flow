
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useUserEvent } from '@/context/UserEventContext';
import { usePackage } from '@/context/PackageContext';
import { useToast } from '@/components/ui/use-toast';
import BackButton from '@/components/vendors/BackButton';
import BookingSummary from '@/components/booking/BookingSummary';
import UserForm from '@/components/booking/UserForm';
import PaymentForm from '@/components/booking/PaymentForm';
import { formatCurrency } from '@/lib/utils';
import { CreditCard, Calendar, Users } from 'lucide-react';

const BookingCheckout = () => {
  const navigate = useNavigate();
  const { userEvent } = useUserEvent();
  const { packageState, getTotalCost } = usePackage();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  
  const totalCost = getTotalCost();
  
  // Form fields state - in a real app, this would be handled with react-hook-form
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    saveInfo: false
  });
  
  const handleUserInfoChange = (field: string, value: string | boolean) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };
  
  const handleConfirmBooking = () => {
    // Validate form fields
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (!termsAgreed) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate processing
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      // Show success toast
      toast({
        title: "Booking Confirmed!",
        description: "Your event has been successfully booked.",
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <BackButton to="/package-builder" label="Back to Package Builder" />
          <h1 className="text-3xl font-bold mt-4">Complete Your Booking</h1>
          <p className="text-gray-600">Review your package details and confirm your booking.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booking summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Event Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Event Date</p>
                      <p className="font-medium">
                        {userEvent.eventDate 
                          ? new Intl.DateTimeFormat('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }).format(userEvent.eventDate)
                          : 'Not set'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Guest Count</p>
                      <p className="font-medium">{userEvent.guestCount || 'Not set'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Package Summary</h3>
                  <BookingSummary />
                </div>
              </CardContent>
            </Card>
            
            {/* User information form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Information</CardTitle>
                <CardDescription>Please provide your contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <UserForm 
                  userInfo={userInfo} 
                  onChange={handleUserInfoChange} 
                />
              </CardContent>
            </Card>
            
            {/* Payment method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payment Method</CardTitle>
                <CardDescription>All transactions are secure and encrypted</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentForm />
              </CardContent>
            </Card>
            
            {/* Terms agreement */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="terms" 
                    checked={termsAgreed}
                    onCheckedChange={(checked) => setTermsAgreed(checked === true)}
                  />
                  <div>
                    <Label htmlFor="terms" className="font-medium">
                      I agree to Plansparkles Terms of Use and Vendor Policies
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      By checking this box, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and acknowledge you have read our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order summary sidebar */}
          <div>
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Package Total</span>
                      <span>{formatCurrency(totalCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee</span>
                      <span>{formatCurrency(totalCost * 0.05)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(totalCost * 1.05)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleConfirmBooking}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Confirm Booking
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-4 text-sm text-gray-500 text-center px-4">
                <p>Need help? <a href="#" className="text-blue-600 hover:underline">Contact support</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCheckout;
