import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Lock, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "text-blue-600" : "";

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b-2 border-black h-20 flex items-center justify-between px-6 lg:px-12">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-black text-white p-1">
            <Shield size={24} />
        </div>
        <h1 className="text-xl font-black uppercase tracking-tighter group-hover:opacity-70">
          Sentinel <span className="text-blue-600">/</span> Secure
        </h1>
      </Link>
      
      <div className="hidden lg:flex gap-8 font-bold text-sm uppercase tracking-widest items-center">
        <Link to="/" className={`hover:text-blue-600 ${isActive('/')}`}>Solution</Link>
        <Link to="/services" className={`hover:text-blue-600 ${isActive('/services')}`}>Services</Link>
        
        {/* Tools Dropdown Trigger (Simplified for this UI as a direct link) */}
        <div className="relative group cursor-pointer">
          <span className="flex items-center gap-1 hover:text-blue-600">Free Tools <ChevronDown size={14}/></span>
          <div className="absolute top-full left-0 w-48 bg-white border-2 border-black hidden group-hover:flex flex-col shadow-[4px_4px_0px_0px_#000]">
             <Link to="/tools/password-gen" className="p-3 hover:bg-gray-100 border-b border-gray-200">Pass Gen</Link>
             <Link to="/tools/browser-check" className="p-3 hover:bg-gray-100 border-b border-gray-200">Browser Check</Link>
             <Link to="/tools/speed-test" className="p-3 hover:bg-gray-100 border-b border-gray-200">Net Speed</Link>
             <Link to="/tools/secure-notes" className="p-3 hover:bg-gray-100">Secure Vault</Link>
          </div>
        </div>

        <Link to="/about" className={`hover:text-blue-600 ${isActive('/about')}`}>About</Link>
        <Link to="/dashboard" className="px-6 py-2 bg-red-600 text-white border-2 border-black hover:bg-black transition-colors flex items-center gap-2">
           <Lock size={16} /> Portal
        </Link>
      </div>

      <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {isOpen && (
        <div className="absolute top-20 left-0 w-full h-[calc(100vh-80px)] overflow-y-auto bg-white border-t-2 border-black p-8 flex flex-col gap-6 text-2xl font-black uppercase z-50">
          <Link to="/" onClick={() => setIsOpen(false)}>Solution</Link>
          <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
          <div className="h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500">Tools</p>
          <Link to="/tools/password-gen" onClick={() => setIsOpen(false)} className="pl-4 text-xl">Password Gen</Link>
          <Link to="/tools/browser-check" onClick={() => setIsOpen(false)} className="pl-4 text-xl">Browser Info</Link>
          <Link to="/tools/speed-test" onClick={() => setIsOpen(false)} className="pl-4 text-xl">Speed Test</Link>
          <div className="h-px bg-gray-300"></div>
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-red-600">Dashboard</Link>
        </div>
      )}
    </header>
  );
};

export default Header;