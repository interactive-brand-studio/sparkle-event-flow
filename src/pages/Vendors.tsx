
import { Button } from '@/components/ui/button';

const Vendors = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Browse Our Trusted Vendors</h1>
        <p className="text-xl text-gray-600 mb-10">
          Find the perfect vendors for your event. All pre-vetted and ready to make your event spectacular.
        </p>
        <div className="bg-gray-100 p-10 rounded-lg flex flex-col items-center">
          <p className="text-xl mb-4">Vendor listings coming soon!</p>
          <Button className="btn-primary">Start Planning Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Vendors;
