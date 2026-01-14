import React from 'react';
import { Shield, Mail, Phone, MapPin, Github, Linkedin, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // -- ACCESS CONTROL LOGIC --
  const userPlan = localStorage.getItem('sentinel_plan') || 'free'; 
  
  const isLocked = (requiredPlan) => {
    const levels = { 'free': 0, 'starter': 1, 'pro': 2, 'business': 3 };
    const currentLevel = levels[userPlan.toLowerCase()] || 0;
    const requiredLevel = levels[requiredPlan] || 0;
    return currentLevel < requiredLevel;
  };

  // Helper to render footer links with locks
  const LockedLink = ({ to, label, plan, className }) => {
    const locked = plan ? isLocked(plan) : false;
    const defaultClass = "hover:text-blue-500 hover:pl-2 transition-all flex items-center gap-1";
    
    return (
      <li>
        <Link 
          to={locked ? "/pricing" : to} 
          className={className || defaultClass}
        >
          {label} {locked && <Lock size={12} className="text-gray-500"/>}
        </Link>
      </li>
    );
  };

  return (
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
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-600"/> 
                ask.sentinel@tuta.io
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-blue-600"/> 
                Developer: +91 83290 04424
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-600"/> 
                Baner, Pune
              </div>
          </div>
        </div>
        
        {/* COLUMN 2 */}
        <div>
          <h5 className="font-bold uppercase text-gray-500 mb-6 tracking-widest text-sm">Company</h5>
          <ul className="space-y-3 font-bold">
            <li><Link to="/about" className="hover:text-blue-500 hover:pl-2 transition-all">About Us</Link></li>
            <li><Link to="/services" className="hover:text-blue-500 hover:pl-2 transition-all">Our Services</Link></li>
            <li><Link to="/audit" className="hover:text-blue-500 hover:pl-2 transition-all">Audit Report</Link></li>
            <LockedLink to="/settings" label="Settings" plan="starter" />
            <li><Link to="/faq" className="hover:text-blue-500 hover:pl-2 transition-all">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500 hover:pl-2 transition-all">Contact</Link></li>
          </ul>
        </div>

        {/* COLUMN 3 */}
        <div>
          <h5 className="font-bold uppercase text-gray-500 mb-6 tracking-widest text-sm">Forensics Tools</h5>
          <ul className="space-y-3 font-bold">
            <LockedLink 
                to="/dashboard" 
                label="Dashboard Portal" 
                plan="starter" 
                className="text-red-500 hover:text-white hover:pl-2 transition-all flex items-center gap-2"
            />
            <li><Link to="/tools/file-encrypt" className="hover:text-blue-500 hover:pl-2 transition-all">AES File Vault</Link></li>
            <LockedLink to="/tools/pwned-check" label="Dark Web Check" plan="business" />
            <LockedLink to="/tools/network-mapper" label="Subnet Mapper" plan="business" />
            <LockedLink to="/tools/dns-validator" label="DNSSEC Validator" plan="pro" />
            <LockedLink to="/tools/phishing-check" label="Phishing Detector" plan="pro" />
            <li><Link to="/tools/webrtc-leak" className="hover:text-blue-500 hover:pl-2 transition-all">WebRTC Leak Check</Link></li>
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
            <li><Link to="/cookie-policy" className="hover:text-white">Cookie Policy</Link></li>
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
        
        {/* Social Icons */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://github.com/aammisetty" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/arun-ammisetty" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;