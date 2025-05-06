
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ResultsCarousel from '@/components/landing/ResultsCarousel';
import AIPromoSection from '@/components/landing/AIPromoSection';
import PricingSection from '@/components/landing/PricingSection';

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-50 opacity-50"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 animate-fade-in">
            Plan Your Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Without the Stress</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Get smart vendor packages in minutes. Just tell us your event type and budget.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button asChild className="btn-primary text-lg">
              <Link to="/plan">Start Planning</Link>
            </Button>
            <Button asChild variant="outline" className="btn-secondary text-lg">
              <Link to="/vendors">Browse Vendors</Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="hidden md:block absolute -bottom-8 -right-8 w-64 h-64 bg-purple-200 rounded-full opacity-20"></div>
        <div className="hidden md:block absolute top-20 -left-16 w-48 h-48 bg-blue-200 rounded-full opacity-20"></div>
      </section>

      {/* How It Works Section */}
      <section className="section-container bg-white">
        <h2 className="section-title">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howItWorksSteps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-6 group transform transition-transform duration-300 hover:scale-110">
                <span className="text-3xl text-purple-500 group-hover:animate-bounce-light">{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: Results Carousel Section */}
      <ResultsCarousel />

      {/* Why Plansparkles Section */}
      <section className="section-container bg-gray-50">
        <h2 className="section-title">Why Plansparkles?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="text-3xl text-purple-500 mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistant Promo Section */}
      <AIPromoSection />

      {/* NEW: Pricing Preview Section */}
      <PricingSection />

      {/* Success Stories */}
      <section className="section-container bg-white">
        <h2 className="section-title">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {successStories.map((story, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-purple-200 h-48 relative">
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  🎉
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{story.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{story.eventType}</p>
                <p className="text-gray-700">{story.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-container bg-gray-50">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium text-gray-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-purple-500 to-blue-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Perfect Event?</h2>
          <Button asChild className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-lg">
            <Link to="/plan">Start Now – It's Free!</Link>
          </Button>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <p className="font-semibold">Start planning your dream event</p>
            </div>
            <Button asChild size="sm" className="btn-primary">
              <Link to="/plan">Open Wizard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Data for How It Works section
const howItWorksSteps = [
  {
    icon: '📝',
    title: 'Fill out your event details',
    description: "Tell us what kind of event you're planning, your budget, and preferences."
  },
  {
    icon: '🔍',
    title: 'We match the right vendors',
    description: 'Our system finds the perfect vendors and packages based on your requirements.'
  },
  {
    icon: '✅',
    title: 'You compare and book!',
    description: 'Review options, select your favorites, and confirm your bookings all in one place.'
  }
];

// Data for Benefits section
const benefits = [
  {
    icon: '⏱️',
    title: 'Save Time',
    description: 'Skip the endless researching and phone calls. Get matched with perfect vendors instantly.'
  },
  {
    icon: '🧠',
    title: 'Smart Match-Making',
    description: 'Our algorithm finds vendors that match your style, budget, and event needs.'
  },
  {
    icon: '✨',
    title: 'Trusted Vendors',
    description: 'All vendors are vetted and reviewed to ensure quality and reliability.'
  },
  {
    icon: '📱',
    title: 'Full Booking',
    description: 'Manage all your event details, vendors, and payments in one central dashboard.'
  }
];

// Sample success stories
const successStories = [
  {
    name: 'Sara & Michael',
    eventType: 'Wedding - 150 guests',
    quote: "Plansparkles helped us find the perfect vendors within our budget. The AI assistant was like having a pro planner at our fingertips!"
  },
  {
    name: 'Corporate Events Team',
    eventType: 'Annual Conference - 200 attendees',
    quote: 'The platform took away all the stress of coordinating multiple vendors. We saved weeks of planning time!'
  },
  {
    name: 'Jessica',
    eventType: 'Birthday Party - 30 guests',
    quote: "I was able to plan my daughter's entire birthday in under an hour! The vendors were amazing and the party was perfect."
  }
];

// FAQ data
const faqs = [
  {
    question: "What's included in the vendor packages?",
    answer: "Our vendor packages include all essential services needed for your event. Each package clearly outlines what's included, pricing, and any additional options available. You can customize packages to fit your specific needs."
  },
  {
    question: 'How do you vet your vendors?',
    answer: 'We have a thorough vetting process that includes checking business credentials, reviewing past work, verifying insurance, and collecting client reviews. We only partner with vendors who meet our high-quality standards.'
  },
  {
    question: 'Can I modify my event details after I start planning?',
    answer: 'Absolutely! You can update your event details at any time, and our system will adjust vendor recommendations accordingly. Your dashboard makes it easy to track all changes.'
  },
  {
    question: 'Is there a fee to use Plansparkles?',
    answer: 'Basic planning tools are completely free to use. We offer premium features with upgraded accounts, and some vendor bookings may include a small service fee that\'s clearly displayed before confirmation.'
  }
];

export default Index;
