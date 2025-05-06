
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const PricingSection = () => {
  return (
    <section className="section-container bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform is free to use. We earn only when you book. No hidden fees, ever.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-purple-100 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Platform Fee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600 mb-4">2.5%</p>
              <p className="text-gray-600 mb-6">Applied only to confirmed bookings</p>
              
              <ul className="space-y-2">
                <PricingFeature>Access to all vendors</PricingFeature>
                <PricingFeature>Full event planning wizard</PricingFeature>
                <PricingFeature>Custom package builder</PricingFeature>
                <PricingFeature>Vendor selection tools</PricingFeature>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-purple-50 to-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">AI Planner</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600 mb-4">First 3 free</p>
              <p className="text-gray-600 mb-6">$5 for 10 additional uses</p>
              
              <ul className="space-y-2">
                <PricingFeature>Personalized recommendations</PricingFeature>
                <PricingFeature>Budget optimization</PricingFeature>
                <PricingFeature>Vendor matching</PricingFeature>
                <PricingFeature>Timeline assistance</PricingFeature>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-purple-100 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Vendor Boost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600 mb-4">From $5</p>
              <p className="text-gray-600 mb-6">For vendors to increase visibility</p>
              
              <ul className="space-y-2">
                <PricingFeature>Bronze: 3-day boost</PricingFeature>
                <PricingFeature>Silver: 7-day boost</PricingFeature>
                <PricingFeature>Gold: 15-day boost</PricingFeature>
                <PricingFeature>Featured in recommendations</PricingFeature>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const PricingFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center">
    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
    <span className="text-gray-700">{children}</span>
  </li>
);

export default PricingSection;
