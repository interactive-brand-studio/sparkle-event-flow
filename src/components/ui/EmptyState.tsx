
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  actionOnClick?: () => void;
}

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  actionLink, 
  actionOnClick 
}: EmptyStateProps) => {
  return (
    <Card className="border-dashed border-2">
      <CardContent className="p-6 text-center">
        <Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-500 mb-4">{description}</p>
        
        {actionLabel && (actionLink || actionOnClick) && (
          actionLink ? (
            <Button asChild>
              <Link to={actionLink}>
                {actionLabel}
              </Link>
            </Button>
          ) : (
            <Button onClick={actionOnClick}>
              {actionLabel}
            </Button>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
