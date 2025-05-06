
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

const BackButton = ({ to, label = 'Back', className = '' }: BackButtonProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };
  
  return (
    <Button
      variant="ghost"
      className={`group flex items-center hover:bg-gray-100 ${className}`}
      onClick={handleClick}
    >
      <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {label}
    </Button>
  );
};

export default BackButton;
