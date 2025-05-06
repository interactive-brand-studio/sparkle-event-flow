
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const AIPromoSection = () => {
  const [chatMessages, setChatMessages] = useState([
    { user: true, message: "I need to plan a wedding for 75 people in June." },
    { user: false, message: "I'd be happy to help with your June wedding! What's your budget range?" },
    { user: true, message: "Around $15,000-$20,000 total." },
    { user: false, message: "Great! For 75 guests with that budget, you could have a beautiful wedding. Let me suggest some venue options..." },
  ]);

  return (
    <section className="section-container bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need help planning your event?</h2>
            <p className="text-xl mb-8 text-white/90">
              Our AI assistant helps you make decisions, suggests ideas, and answers all your planning questions.
            </p>
            <div className="relative inline-block">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-bold shadow-lg transition-all duration-300 hover:-translate-y-1">
                    Try Planspark AI
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold mb-2">AI Planner Demo</h3>
                    <p className="text-sm text-gray-500 mb-4">This is a preview of our AI planning assistant.</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Link to="/ai-planner" className="block w-full btn-primary py-2">
                        Go to full AI Planner
                      </Link>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="absolute -top-10 -right-2 bg-yellow-400 text-gray-800 py-1 px-3 rounded-full text-sm font-medium animate-bounce-light">
                First 3 uses free!
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl animate-fade-in">
            {/* Chat UI Preview */}
            <div className="flex flex-col space-y-4">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`${
                    msg.user 
                      ? "bg-white/90 rounded-tl-xl rounded-tr-xl rounded-br-xl mr-auto" 
                      : "bg-purple-100 rounded-tl-xl rounded-tr-xl rounded-bl-xl ml-auto"
                  } p-4 max-w-[80%] shadow-sm`}
                >
                  <p className="text-gray-800">{msg.message}</p>
                </div>
              ))}
              <div className="flex mt-2">
                <input 
                  type="text" 
                  placeholder="Ask me anything about planning..."
                  className="flex-1 p-3 rounded-l-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none"
                />
                <button className="bg-white text-purple-600 px-4 rounded-r-lg font-medium">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPromoSection;
