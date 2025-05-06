
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Packages = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Your Custom Event Packages</h1>
        <p className="text-xl text-gray-600 mb-10">
          Based on your preferences, we've curated the perfect packages for your event.
        </p>
        <div className="bg-gray-100 p-10 rounded-lg flex flex-col items-center">
          <p className="text-xl mb-4">Please complete the event wizard to view your custom packages.</p>
          <Button asChild className="btn-primary">
            <Link to="/plan">Start Planning</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Packages;
