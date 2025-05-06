
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { useUserEvent } from '@/context/UserEventContext';
import { usePackage } from '@/context/PackageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Sparkles, CalendarCheck, 
  Users, Package, Zap, ArrowRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const AIPlanner = () => {
  const navigate = useNavigate();
  const { userEvent } = useUserEvent();
  const { addVendor } = usePackage();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string | React.ReactNode}>>([
    { 
      type: 'ai', 
      content: `Hi there! I'm your Planspark AI assistant. Let's plan your ${userEvent.eventType || 'event'} together! What would you like help with first?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    'Recommend vendors',
    'Suggest a theme',
    'Help with budget allocation',
    'Guest layout ideas'
  ]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [planComplete, setPlanComplete] = useState(false);
  const [remainingTokens, setRemainingTokens] = useState(1000);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AI response - in a real app, this would call an API
  const simulateAIResponse = (userMessage: string) => {
    setLoading(true);
    
    // Decrease tokens to simulate usage limits
    setRemainingTokens(prev => Math.max(0, prev - 100));
    
    setTimeout(() => {
      if (userMessage.toLowerCase().includes('vendor') || step === 1) {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: (
            <div className="space-y-4">
              <p>Based on your {userEvent.eventType || 'event'} with {userEvent.guestCount || '50'} guests, I recommend these vendors:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Elegant Catering Co.</h4>
                        <p className="text-sm text-gray-600">Premium food service</p>
                        <p className="text-sm font-medium mt-1 text-purple-700">{formatCurrency(3500)}</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Catering</Badge>
                    </div>
                    <Button size="sm" variant="outline" className="mt-3 w-full">
                      <Package className="mr-1 h-3 w-3" /> Add to Package
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Rhythm Masters</h4>
                        <p className="text-sm text-gray-600">DJ & Entertainment</p>
                        <p className="text-sm font-medium mt-1 text-purple-700">{formatCurrency(1200)}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Music</Badge>
                    </div>
                    <Button size="sm" variant="outline" className="mt-3 w-full">
                      <Package className="mr-1 h-3 w-3" /> Add to Package
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <p>Would you like more specific vendor recommendations or shall we move on to theme suggestions?</p>
            </div>
          )
        }]);
        
        setSuggestions([
          'Show more vendors',
          'Suggest a theme',
          'Help with budget allocation'
        ]);
        
        setStep(2);
      } 
      else if (userMessage.toLowerCase().includes('theme') || step === 2) {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: (
            <div className="space-y-4">
              <p>For your {userEvent.eventType || 'event'}, here are some theme ideas that would work well:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Card className="border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium">Elegant Garden Party</h4>
                    <p className="text-sm text-gray-600">Floral arrangements, pastel colors, rustic elements</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">Outdoor</Badge>
                      <Badge variant="outline">Spring/Summer</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium">Modern Minimalist</h4>
                    <p className="text-sm text-gray-600">Clean lines, monochrome palette, geometric accents</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">Indoor</Badge>
                      <Badge variant="outline">Year-round</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <p>Would you like me to elaborate on any of these themes or would you like help with something else?</p>
            </div>
          )
        }]);
        
        setSuggestions([
          'Tell me more about the garden theme',
          'Help with budget allocation',
          'Guest layout ideas'
        ]);
        
        setStep(3);
      }
      else if (userMessage.toLowerCase().includes('budget') || step === 3) {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: (
            <div className="space-y-4">
              <p>Based on your total budget of {userEvent.budget ? `${formatCurrency(userEvent.budget.max)}` : '$10,000'}, here's how I recommend allocating it:</p>
              
              <Card>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Catering (40%)</span>
                      <span className="font-medium">{formatCurrency(userEvent.budget ? userEvent.budget.max * 0.4 : 4000)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Venue (25%)</span>
                      <span className="font-medium">{formatCurrency(userEvent.budget ? userEvent.budget.max * 0.25 : 2500)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Entertainment (15%)</span>
                      <span className="font-medium">{formatCurrency(userEvent.budget ? userEvent.budget.max * 0.15 : 1500)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Decor (10%)</span>
                      <span className="font-medium">{formatCurrency(userEvent.budget ? userEvent.budget.max * 0.1 : 1000)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Photography (5%)</span>
                      <span className="font-medium">{formatCurrency(userEvent.budget ? userEvent.budget.max * 0.05 : 500)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Miscellaneous (5%)</span>
                      <span className="font-medium">{formatCurrency(userEvent.budget ? userEvent.budget.max * 0.05 : 500)}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <p>I think we've covered the main aspects of your event planning! Would you like me to generate a complete package suggestion based on our conversation?</p>
            </div>
          )
        }]);
        
        setSuggestions([
          'Generate my package',
          'I have more questions',
          'Let me see guest layout ideas'
        ]);
        
        setPlanComplete(true);
      }
      else if (userMessage.toLowerCase().includes('generate') || userMessage.toLowerCase().includes('package')) {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: (
            <div className="space-y-4">
              <p>Great! I've put together a complete package for your {userEvent.eventType || 'event'}:</p>
              
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-2">Your Personalized Event Package</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Event Details:</h4>
                      <p className="text-sm">
                        {userEvent.eventType || 'Event'} • 
                        {userEvent.guestCount ? ` ${userEvent.guestCount} guests` : ' 50 guests'} • 
                        {userEvent.eventDate ? ` ${userEvent.eventDate.toLocaleDateString()}` : ' TBD'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Selected Vendors:</h4>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Elegant Catering Co. - {formatCurrency(3500)}</li>
                        <li>Rhythm Masters DJ - {formatCurrency(1200)}</li>
                        <li>City View Venue - {formatCurrency(2500)}</li>
                        <li>Floral Designs - {formatCurrency(800)}</li>
                        <li>Capture Moments Photography - {formatCurrency(1000)}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Total Package Price:</h4>
                      <p className="text-lg font-bold text-green-700">{formatCurrency(9000)}</p>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" onClick={() => navigate('/package-builder')}>
                    View Full Package <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              <p>You can now review and modify this package in the Package Builder. Would you like to proceed?</p>
            </div>
          )
        }]);
        
        setSuggestions([
          'Go to Package Builder',
          'Modify this package',
          'Start over'
        ]);
      }
      else {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: "I'm sorry, I'm not sure how to help with that. Would you like me to suggest vendors, themes, or help with budget allocation?"
        }]);
        
        setSuggestions([
          'Recommend vendors',
          'Suggest a theme',
          'Help with budget allocation'
        ]);
      }
      
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !loading) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    
    // Simulate AI response
    simulateAIResponse(input);
    
    // Clear input
    setInput('');
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setMessages(prev => [...prev, { type: 'user', content: suggestion }]);
    simulateAIResponse(suggestion);
  };

  const handleGeneratePackage = () => {
    // In a real app, this would process the AI recommendations
    // and populate the package context
    navigate('/package-builder');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">AI Event Planner</h1>
          <p className="text-gray-600 mb-6">
            Let our AI assistant help you plan the perfect event based on your preferences.
          </p>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h2 className="font-bold text-lg">Planspark AI</h2>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">
                      Tokens remaining: {remainingTokens}
                    </span>
                    <div className="ml-2 h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500" 
                        style={{ width: `${(remainingTokens / 1000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-4 ${message.type === 'user' ? 'text-right' : ''}`}
                  >
                    <div 
                      className={`inline-block rounded-lg p-3 max-w-[80%] ${
                        message.type === 'user' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              
              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={loading}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
              
              {/* Input form */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={loading}
                />
                <Button type="submit" disabled={loading || !input.trim()}>
                  <MessageCircle className="h-5 w-5" />
                  <span className="ml-2">Send</span>
                </Button>
              </form>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            {planComplete && (
              <Button onClick={handleGeneratePackage} className="bg-purple-600 hover:bg-purple-700">
                <Package className="mr-2 h-5 w-5" />
                Generate My Package
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
