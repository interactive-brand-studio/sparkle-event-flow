
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Star, Settings, User, Calendar } from 'lucide-react';

interface UserSidebarProps {
  user: {
    name: string;
    email: string;
  };
}

const UserSidebar = ({ user }: UserSidebarProps) => {
  return (
    <div className="w-full md:w-64 shrink-0">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="font-medium text-lg">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
            
            <div className="mt-6 w-full">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard">
                  <Package className="mr-2 h-4 w-4" />
                  My Bookings
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start mt-2" asChild>
                <Link to="/dashboard/packages">
                  <Star className="mr-2 h-4 w-4" />
                  Saved Packages
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start mt-2" asChild>
                <Link to="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/plan">
            <Calendar className="mr-2 h-4 w-4" />
            Start Planning
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UserSidebar;
