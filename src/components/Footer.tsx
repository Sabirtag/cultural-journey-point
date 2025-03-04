
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-display font-bold tracking-tight flex items-center">
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Heritage</span>
              <span className="ml-1 opacity-80">Portal</span>
            </Link>
            <p className="text-neutral-600 text-sm">
              Preserving our national heritage through seamless digital access to monuments, certified guides, and cultural experiences.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-neutral-500 hover:text-primary-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-primary-700 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/monuments" className="text-neutral-600 hover:text-primary-700 transition-colors">Monuments</Link>
              </li>
              <li>
                <Link to="/booking" className="text-neutral-600 hover:text-primary-700 transition-colors">Book Tickets</Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-600 hover:text-primary-700 transition-colors">About Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-700 transition-colors">Guide Services</a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-700 transition-colors">Audio Guides</a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-700 transition-colors">Special Tours</a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-700 transition-colors">School Programs</a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-700 transition-colors">Photography Permits</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-neutral-600">
                Ministry of Culture, Government of India<br />
                Shastri Bhawan, New Delhi
              </li>
              <li className="text-neutral-600">
                Email: info@heritageportal.gov.in
              </li>
              <li className="text-neutral-600">
                Phone: +91-11-2338-2825
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500">&copy; {new Date().getFullYear()} Heritage Portal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-neutral-500 hover:text-primary-700 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-neutral-500 hover:text-primary-700 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-neutral-500 hover:text-primary-700 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
