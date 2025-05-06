
import { X } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';

interface ErrorToastProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const ErrorToast = ({ title, description, action }: ErrorToastProps) => {
  return sonnerToast.error(title, {
    description,
    action: action ? {
      label: action.label,
      onClick: action.onClick,
    } : undefined,
    icon: <X className="h-4 w-4" />,
  });
};

export default ErrorToast;
