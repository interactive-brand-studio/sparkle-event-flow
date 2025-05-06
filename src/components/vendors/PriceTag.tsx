
import { formatCurrency } from '@/lib/utils';

interface PriceTagProps {
  price: number;
  priceType?: 'per_head' | 'per_hour' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  showFrom?: boolean;
  className?: string;
}

const PriceTag = ({ 
  price, 
  priceType = 'flat', 
  size = 'md', 
  showFrom = false,
  className = '' 
}: PriceTagProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg font-semibold'
  };
  
  const getPriceLabel = () => {
    let priceText = formatCurrency(price);
    
    if (priceType === 'per_head') {
      priceText += ' per person';
    } else if (priceType === 'per_hour') {
      priceText += ' per hour';
    }
    
    if (showFrom) {
      return `From ${priceText}`;
    }
    
    return priceText;
  };
  
  return (
    <span className={`${sizeClasses[size]} ${className}`}>
      {getPriceLabel()}
    </span>
  );
};

export default PriceTag;
