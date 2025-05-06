
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Plus } from 'lucide-react';
import { Vendor } from '@/types/vendor';
import { formatCurrency } from '@/lib/utils';

interface VendorCardProps {
  vendor: Vendor;
  onAddToPackage: () => void;
  compact?: boolean;
}

const VendorCard = ({ vendor, onAddToPackage, compact = false }: VendorCardProps) => {
  const { id, name, image, tagline, category, priceFrom, priceType, rating, verified } = vendor;
  
  const renderPrice = () => {
    let priceText = formatCurrency(priceFrom);
    
    if (priceType === 'per_head') {
      priceText += ' per person';
    } else if (priceType === 'per_hour') {
      priceText += ' per hour';
    }
    
    return `From ${priceText}`;
  };
  
  const renderRating = () => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  if (compact) {
    return (
      <Card className="h-full transition-all hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-gray-100 overflow-hidden">
              <img src={image} alt={name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="text-sm font-medium">{name}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                  {category}
                </Badge>
                <span className="text-xs text-gray-500">{renderPrice()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        {verified && (
          <Badge className="absolute top-2 right-2 bg-blue-500">Verified</Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="mb-3 flex justify-between">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
            {category}
          </Badge>
          {renderRating()}
        </div>
        
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="mb-3 text-gray-600">{tagline}</p>
        
        <p className="font-medium text-purple-700">{renderPrice()}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-2 p-6 pt-0">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={onAddToPackage}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add to Package
        </Button>
        
        <Button asChild className="flex-1">
          <Link to={`/vendor/${id}`}>
            <span>View Profile</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VendorCard;
