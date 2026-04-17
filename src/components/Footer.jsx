import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div className="flex items-center mb-6">
              <span className="text-3xl font-heading text-gold tracking-widest leading-none font-bold">ÉLEVÉ</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Elevated dining experience located in the heart of Clifton, Karachi. We serve luxurious cuisines with uncompromised quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Menu', path: '/menu-1' },
                { name: 'About', path: '/about' },
                { name: 'Chef', path: '/chef' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' },
                { name: 'Reservation', path: '/reservation' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-400 hover:text-gold transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 text-sm">
                <MapPin size={18} className="text-gold mr-3 mt-1 flex-shrink-0" />
                <span>123 Main Street, Clifton<br />Karachi, Pakistan</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Phone size={18} className="text-gold mr-3 flex-shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Mail size={18} className="text-gold mr-3 flex-shrink-0" />
                <span>info@eleve.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading text-white mb-6">Opening Hours</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Mon - Fri:</span>
                <span className="text-gold">12:00 PM - 11:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Saturday:</span>
                <span className="text-gold">11:00 AM - 12:00 AM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Sunday:</span>
                <span className="text-gold">11:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ÉLEVÉ Restaurant. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
