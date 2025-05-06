
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-flex items-center">
              <span className="text-purple-600 font-bold text-xl">Plan<span className="text-blue-500">sparkles</span></span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Making event planning simple, stress-free, and sparkly since 2023.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialIcon href="#" label="Facebook" />
              <SocialIcon href="#" label="Twitter" />
              <SocialIcon href="#" label="Instagram" />
              <SocialIcon href="#" label="Pinterest" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/vendors" label="Browse Vendors" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/plan" label="Start Planning" />
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-3">
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
              <FooterLink href="/vendors/apply" label="Become a Vendor" />
              <FooterLink href="/contact" label="Contact Us" />
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-800 mb-4">Subscribe</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get event planning tips and inspiration in your inbox.
            </p>
            <div className="flex">
              <Input 
                placeholder="Your email" 
                className="rounded-r-none focus-visible:ring-purple-500"
              />
              <Button className="rounded-l-none bg-purple-500 hover:bg-purple-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Plansparkles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink = ({ href, label }: FooterLinkProps) => (
  <li>
    <Link 
      to={href} 
      className="text-gray-600 hover:text-purple-500 transition-colors text-sm"
    >
      {label}
    </Link>
  </li>
);

interface SocialIconProps {
  href: string;
  label: string;
}

const SocialIcon = ({ href, label }: SocialIconProps) => (
  <a 
    href={href} 
    aria-label={label}
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white transition-colors"
  >
    {/* Placeholder for social icons - would use actual icons in production */}
    <span className="text-xs">{label.charAt(0)}</span>
  </a>
);

export default Footer;
