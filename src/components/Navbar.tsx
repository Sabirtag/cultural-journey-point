
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-apple ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-subtle' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-display font-bold tracking-tight flex items-center"
          >
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Heritage</span>
            <span className="ml-1 opacity-80">Portal</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/monuments" label="Monuments" />
            <div className="relative group">
              <button className="flex items-center py-2 text-neutral-700 hover:text-primary-700 transition-colors font-medium">
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-elevation-2 border border-neutral-100 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="p-3 space-y-1">
                  <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-primary-50 text-neutral-700 hover:text-primary-700 transition-colors">Guide Services</a>
                  <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-primary-50 text-neutral-700 hover:text-primary-700 transition-colors">Audio Guides</a>
                  <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-primary-50 text-neutral-700 hover:text-primary-700 transition-colors">Special Tours</a>
                </div>
              </div>
            </div>
            <NavLink to="/about" label="About" />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/booking" 
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-subtle transition-all duration-300 ease-apple active:scale-95"
            >
              Book Now
            </Link>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-neutral-800 focus:outline-none transition-transform duration-300 ease-apple"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-elevation-2 overflow-hidden transition-all duration-300 ease-apple ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 py-4 space-y-2">
          <MobileNavLink to="/" label="Home" />
          <MobileNavLink to="/monuments" label="Monuments" />
          <MobileNavLink to="/about" label="About" />
          <div className="pt-2 mt-2 border-t border-neutral-100">
            <Link 
              to="/booking" 
              className="block w-full px-4 py-3 text-center bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-subtle transition-all duration-300 ease-apple active:scale-95"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink = ({ to, label }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`py-2 relative font-medium transition-colors duration-300 ${
        isActive 
          ? 'text-primary-700' 
          : 'text-neutral-700 hover:text-primary-700'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-full animate-fade-in"></span>
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, label }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`block px-4 py-3 rounded-lg transition-colors duration-300 ${
        isActive 
          ? 'bg-primary-50 text-primary-700' 
          : 'text-neutral-700 hover:bg-neutral-50'
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
