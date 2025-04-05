
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-700 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-teal-400 font-bold text-2xl">Action</span>
              <span className="text-white font-bold text-2xl">Connect</span>
            </div>
            <p className="text-gray-300 text-sm">
              Educate, Connect & Empower people to take action on social causes
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/content-library" className="text-gray-300 hover:text-teal-400 text-sm">
                  Content Library
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-300 hover:text-teal-400 text-sm">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link to="/passion-finder" className="text-gray-300 hover:text-teal-400 text-sm">
                  Find Your Passion
                </Link>
              </li>
              <li>
                <Link to="/action-hub" className="text-gray-300 hover:text-teal-400 text-sm">
                  Action Hub
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-teal-400 text-sm">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-teal-400 text-sm">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-teal-400 text-sm">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-300 hover:text-teal-400 text-sm">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-teal-400 text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-teal-400 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates on causes and actions.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-navy-700"
              />
              <button className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-r-md">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} ActionConnect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-teal-400 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-teal-400 text-sm">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-teal-400 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
