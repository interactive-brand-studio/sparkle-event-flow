
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="bg-purple-100 rounded-full w-32 h-32 mx-auto flex items-center justify-center">
            <Package className="h-16 w-16 text-purple-500" />
          </div>
          <div className="absolute top-0 right-1/4 animate-bounce-light">
            <div className="bg-blue-100 rounded-full p-2">
              <Search className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/plan">
              Start Planning
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
