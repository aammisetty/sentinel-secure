import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t-2 border-black bg-black text-white pt-16 pb-8 px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1 md:col-span-2">
        <h4 className="text-3xl font-black uppercase mb-6 flex items-center gap-2">
          <Shield className="text-blue-600"/> Sentinel
        </h4>
        <p className="text-gray-400 max-w-sm">
          Advanced ransomware defense tailored for Indian SMEs. Local monitoring, instant response, and affordable security.
        </p>
      </div>
      
      <div>
        <h5 className="font-bold uppercase text-gray-500 mb-4 tracking-widest text-sm">Platform</h5>
        <ul className="space-y-2 font-bold">
          <li><Link to="/dashboard" className="hover:text-blue-500">Dashboard Portal</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Get a Quote</Link></li>
          <li><a href="https://wa.me/918329004424" className="hover:text-green-500">WhatsApp Support</a></li>
        </ul>
      </div>

      <div>
        <h5 className="font-bold uppercase text-gray-500 mb-4 tracking-widest text-sm">Legal</h5>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
        </ul>
      </div>
    </div>
    
    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
      <p>© 2026 Sentinel Secure. Developed by Arun Ammisetty.</p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="https://github.com/aammisetty" className="hover:text-white">GitHub</a>
        <a href="https://linkedin.com/in/arun-ammisetty" className="hover:text-white">LinkedIn</a>
      </div>
    </div>
  </footer>
);

export default Footer;