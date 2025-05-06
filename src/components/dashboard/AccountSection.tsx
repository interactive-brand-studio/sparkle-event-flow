
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AccountSectionProps {
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

const AccountSection = ({ user }: AccountSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Update your personal information and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Name</Label>
          <Input id="name" defaultValue={user.name} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input id="email" defaultValue={user.email} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
          <Input id="phone" defaultValue={user.phone} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <Input id="password" type="password" defaultValue="********" />
        </div>
        
        <div className="pt-4">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSection;
