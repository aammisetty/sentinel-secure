import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Lock, ChevronDown, ExternalLink } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "text-blue-600" : "";

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b-2 border-black h-20 flex items-center justify-between px-6 lg:px-12">
      <Link to="/" className="flex items-center gap-2 group z-50">
        <div className="bg-black text-white p-1">
            <Shield size={24} />
        </div>
        <h1 className="text-xl font-black uppercase tracking-tighter group-hover:opacity-70">
          Sentinel <span className="text-blue-600">/</span> Secure
        </h1>
      </Link>
      
      {/* DESKTOP NAVIGATION */}
      <div className="hidden lg:flex gap-8 font-bold text-sm uppercase tracking-widest items-center">
        <Link to="/" className={`hover:text-blue-600 ${isActive('/')}`}>Home</Link>
        <Link to="/services" className={`hover:text-blue-600 ${isActive('/services')}`}>Services</Link>
        
        {/* TOOLS DROPDOWN */}
        <div className="relative group cursor-pointer h-20 flex items-center">
          <span className="flex items-center gap-1 hover:text-blue-600">Free Tools <ChevronDown size={14}/></span>
          <div className="absolute top-20 left-0 w-56 bg-white border-2 border-black hidden group-hover:flex flex-col shadow-[4px_4px_0px_0px_#000]">
             <Link to="/tools/password-gen" className="p-3 hover:bg-gray-100 border-b border-gray-200">Password Gen</Link>
             <Link to="/tools/browser-check" className="p-3 hover:bg-gray-100 border-b border-gray-200">Browser Fingerprint</Link>
             <Link to="/tools/ip-lookup" className="p-3 hover:bg-gray-100 border-b border-gray-200">IP Lookup</Link>
             <Link to="/tools/phishing-check" className="p-3 hover:bg-gray-100 border-b border-gray-200">Phishing Detector</Link>
             <Link to="/tools/speed-test" className="p-3 hover:bg-gray-100 border-b border-gray-200">Speed Test</Link>
             <Link to="/tools/secure-notes" className="p-3 hover:bg-gray-100 border-b border-gray-200">Secure Notes</Link>
             <Link to="/tools/incident-log" className="p-3 hover:bg-gray-100">Incident Log</Link>
          </div>
        </div>

        {/* COMPANY DROPDOWN */}
        <div className="relative group cursor-pointer h-20 flex items-center">
          <span className="flex items-center gap-1 hover:text-blue-600">Company <ChevronDown size={14}/></span>
          <div className="absolute top-20 left-0 w-48 bg-white border-2 border-black hidden group-hover:flex flex-col shadow-[4px_4px_0px_0px_#000]">
             <Link to="/about" className="p-3 hover:bg-gray-100 border-b border-gray-200">About Us</Link>
             <Link to="/careers" className="p-3 hover:bg-gray-100 border-b border-gray-200">Careers</Link>
             <Link to="/resources" className="p-3 hover:bg-gray-100 border-b border-gray-200">Whitepapers</Link>
             <Link to="/faq" className="p-3 hover:bg-gray-100">FAQ</Link>
          </div>
        </div>

        <Link to="/contact" className={`hover:text-blue-600 ${isActive('/contact')}`}>Contact</Link>

        <Link to="/dashboard" className="px-6 py-2 bg-red-600 text-white border-2 border-black hover:bg-black transition-colors flex items-center gap-2">
           <Lock size={16} /> Portal
        </Link>
      </div>

      {/* MOBILE TOGGLE */}
      <button className="lg:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full h-[calc(100vh-80px)] overflow-y-auto bg-white border-t-2 border-black p-8 flex flex-col gap-8 z-40 pb-32">
          
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main</p>
            <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase hover:text-blue-600">Home</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase hover:text-blue-600">Services</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase hover:text-blue-600">Contact</Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase text-red-600 flex items-center gap-2"><Lock size={20}/> Portal Login</Link>
          </div>

          <div className="h-px bg-gray-200"></div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Free Tools</p>
            <Link to="/tools/password-gen" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">Password Generator</Link>
            <Link to="/tools/browser-check" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">Browser Fingerprint</Link>
            <Link to="/tools/ip-lookup" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">IP Lookup</Link>
            <Link to="/tools/phishing-check" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">Phishing Check</Link>
            <Link to="/tools/secure-notes" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">Secure Vault</Link>
            <Link to="/tools/speed-test" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">Speed Test</Link>
            <Link to="/tools/incident-log" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">Incident Log</Link>
          </div>

          <div className="h-px bg-gray-200"></div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company</p>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">About Us</Link>
            <Link to="/careers" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">Careers</Link>
            <Link to="/resources" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">Whitepapers</Link>
            <Link to="/faq" onClick={() => setIsOpen(false)} className="text-lg font-bold hover:text-blue-600">FAQ</Link>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
             <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full py-4 bg-black text-white text-center font-bold uppercase border-2 border-black">Sign Up Free</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;