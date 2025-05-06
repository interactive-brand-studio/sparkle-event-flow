
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Package, Calendar, Settings, Menu, X, BarChart, ArrowRight, Star, Tag, ShieldCheck } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const navItems = [
    { 
      icon: <BarChart className="mr-2 h-4 w-4" />,
      label: 'Dashboard', 
      path: '/admin'
    },
    { 
      icon: <User className="mr-2 h-4 w-4" />,
      label: 'Vendors', 
      path: '/admin?tab=vendors'
    },
    { 
      icon: <Calendar className="mr-2 h-4 w-4" />,
      label: 'Bookings', 
      path: '/admin?tab=bookings'
    },
    { 
      icon: <Star className="mr-2 h-4 w-4" />,
      label: 'Reviews', 
      path: '/admin?tab=reviews'
    },
    { 
      icon: <Tag className="mr-2 h-4 w-4" />,
      label: 'Categories', 
      path: '/admin?tab=categories'
    },
    { 
      icon: <Package className="mr-2 h-4 w-4" />,
      label: 'Themes', 
      path: '/admin?tab=themes'
    },
    { 
      icon: <Settings className="mr-2 h-4 w-4" />,
      label: 'Settings', 
      path: '/admin/settings'
    },
  ];
  
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path && !location.search;
    }
    return location.pathname + location.search === path;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm py-4 px-4 sticky top-0 z-40">
        <div className="flex justify-between items-center">
          <Link to="/admin" className="text-xl font-bold text-blue-600">
            Admin Portal
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </header>
      
      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md fixed inset-0 z-30 pt-16">
          <ScrollArea className="h-full py-4">
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={item.path}>
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>
              ))}
              
              <hr className="my-4" />
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Go to Main Site
                </Link>
              </Button>
            </div>
          </ScrollArea>
        </div>
      )}
      
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md h-screen sticky top-0 overflow-y-auto">
          <div className="p-6 flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-blue-500" />
            <Link to="/admin" className="block text-xl font-bold text-blue-600">
              Admin Portal
            </Link>
          </div>
          
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link to={item.path}>
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
            
            <hr className="my-4" />
            
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/">
                <ArrowRight className="mr-2 h-4 w-4" />
                Go to Main Site
              </Link>
            </Button>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
      
      {/* Mobile Main Content */}
      <div className="md:hidden p-4 pt-6">
        {!mobileMenuOpen && children}
      </div>
    </div>
  );
};

export default AdminLayout;
