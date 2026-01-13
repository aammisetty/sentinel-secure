import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t-2 border-black bg-black text-white pt-16 pb-8 px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      
      {/* COLUMN 1 */}
      <div>
        <h4 className="text-3xl font-black uppercase mb-6 flex items-center gap-2">
          <Shield className="text-blue-600"/> Sentinel
        </h4>
        <p className="text-gray-400 mb-6">
          Advanced ransomware defense tailored for Indian SMEs. Local monitoring, instant response, and affordable security.
        </p>
        <div className="space-y-2 text-sm font-bold text-gray-300">
            <div className="flex items-center gap-2"><Mail size={16} className="text-blue-600"/> contact.aa@tuta.io</div>
            <div className="flex items-center gap-2"><Phone size={16} className="text-blue-600"/> +91 83290 04424</div>
            <div className="flex items-center gap-2"><MapPin size={16} className="text-blue-600"/> Baner, Pune</div>
        </div>
      </div>
      
      {/* COLUMN 2 */}
      <div>
        <h5 className="font-bold uppercase text-gray-500 mb-6 tracking-widest text-sm">Company</h5>
        <ul className="space-y-3 font-bold">
          <li><Link to="/about" className="hover:text-blue-500 hover:pl-2 transition-all">About Us</Link></li>
          <li><Link to="/services" className="hover:text-blue-500 hover:pl-2 transition-all">Our Services</Link></li>
          <li><Link to="/audit" className="hover:text-blue-500 hover:pl-2 transition-all">Audit Report</Link></li>
          <li><Link to="/settings" className="hover:text-blue-500 hover:pl-2 transition-all">Settings</Link></li>
          <li><Link to="/faq" className="hover:text-blue-500 hover:pl-2 transition-all">FAQ</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500 hover:pl-2 transition-all">Contact</Link></li>
        </ul>
      </div>

      {/* COLUMN 3 */}
      <div>
        <h5 className="font-bold uppercase text-gray-500 mb-6 tracking-widest text-sm">Forensics Tools</h5>
        <ul className="space-y-3 font-bold">
          <li><Link to="/dashboard" className="text-red-500 hover:text-white hover:pl-2 transition-all">Dashboard Portal</Link></li>
          <li><Link to="/tools/file-encrypt" className="hover:text-blue-500 hover:pl-2 transition-all">AES File Vault</Link></li>
          <li><Link to="/tools/webrtc-leak" className="hover:text-blue-500 hover:pl-2 transition-all">WebRTC Leak Check</Link></li>
          <li><Link to="/tools/phishing-check" className="hover:text-blue-500 hover:pl-2 transition-all">Phishing Detector</Link></li>
          <li><Link to="/tools/ip-lookup" className="hover:text-blue-500 hover:pl-2 transition-all">IP Lookup</Link></li>
          <li><Link to="/tools/password-gen" className="hover:text-blue-500 hover:pl-2 transition-all">Password Generator</Link></li>
        </ul>
      </div>

      {/* COLUMN 4 */}
      <div>
        <h5 className="font-bold uppercase text-gray-500 mb-6 tracking-widest text-sm">Legal</h5>
        <ul className="space-y-3 text-sm text-gray-400">
          <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
          <li><Link to="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
          <li><Link to="/refund-policy" className="hover:text-white">Refund Policy</Link></li>
          <li><Link to="/acceptable-use" className="hover:text-white">Acceptable Use Policy</Link></li>
        </ul>
        <div className="mt-8">
            <Link to="/signup" className="px-6 py-3 border-2 border-white font-bold uppercase hover:bg-white hover:text-black transition-colors block text-center">
                Create Account
            </Link>
        </div>
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