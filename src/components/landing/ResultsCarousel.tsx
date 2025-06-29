
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

// Sample package data
const samplePackages = [
  {
    id: 1,
    title: "Intimate Birthday Celebration",
    price: 2500,
    vendorCount: 4,
    description: "Perfect for 20-30 guests, includes catering, decor, photography and cake",
    features: [
      "Full catering service with appetizers and main course",
      "Professional photographer for 3 hours",
      "Custom birthday cake with personalized design",
      "Venue decoration package with balloons and table settings"
    ]
  },
  {
    id: 2,
    title: "Garden Wedding Package",
    price: 12000,
    vendorCount: 6,
    description: "Beautiful outdoor wedding setup for up to 100 guests",
    features: [
      "Full-service wedding planning and coordination",
      "Floral arrangements including bridal bouquet",
      "Professional photography and videography",
      "DJ and sound system for ceremony and reception",
      "Catering with custom menu selection",
      "Wedding cake and dessert table"
    ]
  },
  {
    id: 3,
    title: "Corporate Summit",
    price: 8500,
    vendorCount: 5,
    description: "Professional event package for business conferences",
    features: [
      "Venue rental with AV equipment and tech support",
      "Catering for breakfast, lunch and coffee breaks",
      "Professional MC and event coordination",
      "Photography and event documentation",
      "Branded materials and signage"
    ]
  }
];

const ResultsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % samplePackages.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + samplePackages.length) % samplePackages.length);
  };
  
  const activePackage = samplePackages[activeIndex];

  return (
    <section className="section-container bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Real Results For Events Like Yours</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See the kind of custom packages we've created for other clients. Your perfect event is just a few clicks away.
          </p>
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 z-10 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Card className="w-full max-w-4xl mx-auto transition-all transform-gpu duration-500 animate-fade-in shadow-lg border-purple-100">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-2xl">{activePackage.title}</CardTitle>
                  <Badge variant="outline">
                    {activePackage.vendorCount} vendors
                  </Badge>
                </div>
                <p className="text-gray-600">{activePackage.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-700">Package Includes:</h3>
                    <ul className="space-y-2">
                      {activePackage.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Package Price</p>
                      <p className="text-3xl font-bold text-purple-600">{formatCurrency(activePackage.price)}</p>
                      <p className="text-sm text-gray-500 mt-2">All-inclusive price, no hidden fees</p>
                    </div>
                    <div className="mt-6 md:mt-0">
                      <p className="text-sm font-medium mb-2">Satisfaction rating</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center pb-6">
                <Button asChild className="btn-primary">
                  <Link to="/plan">Plan Yours Now</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 z-10 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {samplePackages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-purple-600 w-6' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsCarousel;
