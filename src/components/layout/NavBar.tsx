
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-purple-600 font-bold text-2xl">Plan<span className="text-blue-500">sparkles</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <NavLink to="/" label="Home" />
            <NavLink to="/vendors" label="Browse Vendors" />
            <NavLink to="/about" label="About" />
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="rounded-full">
              Login / Signup
            </Button>
            <Button asChild className="btn-primary">
              <Link to="/plan">Start Planning</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center"
        >
          <Menu className="h-6 w-6 text-purple-500" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLink to="/" label="Home" isMobile />
            <NavLink to="/vendors" label="Browse Vendors" isMobile />
            <NavLink to="/about" label="About" isMobile />
            <hr className="border-gray-200" />
            <Button variant="outline" className="w-full justify-center rounded-full">
              Login / Signup
            </Button>
            <Button asChild className="w-full justify-center btn-primary">
              <Link to="/plan">Start Planning</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  isMobile?: boolean;
}

const NavLink = ({ to, label, isMobile = false }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${
        isMobile ? 'block py-2' : ''
      } font-medium hover:text-purple-500 transition-colors ${
        isActive ? 'text-purple-500' : 'text-gray-700'
      }`}
    >
      {label}
    </Link>
  );
};

export default NavBar;
