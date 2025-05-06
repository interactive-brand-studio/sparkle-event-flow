
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  notes: string;
  saveInfo: boolean;
}

interface UserFormProps {
  userInfo: UserInfo;
  onChange: (field: string, value: string | boolean) => void;
}

const UserForm = ({ userInfo, onChange }: UserFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
          <Input 
            id="name" 
            value={userInfo.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
          <Input 
            id="email" 
            type="email"
            value={userInfo.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
        <Input 
          id="phone" 
          type="tel"
          value={userInfo.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="(123) 456-7890"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Special Notes or Requests</Label>
        <Textarea 
          id="notes" 
          value={userInfo.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Any special requirements or information for your event..."
          rows={4}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="save-info" 
          checked={userInfo.saveInfo}
          onCheckedChange={(checked) => onChange('saveInfo', checked === true)}
        />
        <Label htmlFor="save-info" className="text-sm font-normal">
          Save this information for future bookings
        </Label>
      </div>
    </div>
  );
};

export default UserForm;
