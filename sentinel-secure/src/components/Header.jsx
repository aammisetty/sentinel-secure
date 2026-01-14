import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Lock, ChevronDown, User, ShieldAlert, ShieldCheck } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "text-blue-600" : "";

  // -- ACCESS CONTROL LOGIC --
  const userPlan = localStorage.getItem('sentinel_plan') || 'free'; 
  const isBlocked = localStorage.getItem('sentinel_blocked') === 'true';
  const isAdmin = localStorage.getItem('sentinel_admin_email') === 'gchk@duck.com' && localStorage.getItem('sentinel_admin_2fa') === 'true';
  
  const isLocked = (requiredPlan) => {
    const levels = { 'free': 0, 'starter': 1, 'pro': 2, 'business': 3 };
    const currentLevel = levels[userPlan.toLowerCase()] || 0;
    const requiredLevel = levels[requiredPlan] || 0;
    return currentLevel < requiredLevel;
  };

  // Helper to render links with conditional locking
  const renderToolLink = (to, label, requiredPlan, isLast = false, isMobile = false) => {
    const locked = isLocked(requiredPlan);
    const baseClass = isMobile 
        ? "text-lg font-bold flex items-center gap-2" 
        : "p-3 border-b border-gray-200 flex justify-between items-center text-sm";
    
    const finalClass = `${baseClass} ${locked ? 'text-gray-400 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-100 hover:text-blue-600'} ${isLast && !isMobile ? 'border-b-0' : ''}`;

    return (
        <Link 
            to={locked ? '/pricing' : to} 
            onClick={() => isMobile && setIsOpen(false)}
            className={finalClass}
        >
            <span>{label}</span>
            {locked && <Lock size={14} className="text-gray-400" />}
        </Link>
    );
  };

  return (
    <header className={`fixed top-0 w-full z-50 border-b-2 border-black h-20 flex items-center justify-between px-6 lg:px-12 transition-colors ${isBlocked ? 'bg-red-600 text-white border-red-800' : 'bg-white'}`}>
      
      {/* BRAND / LOGO */}
      <Link to={isBlocked ? "#" : "/"} className="flex items-center gap-2 group z-50">
        <div className={`${isBlocked ? 'bg-white text-red-600' : 'bg-black text-white'} p-1`}>
            {isBlocked ? <ShieldAlert size={24} /> : <Shield size={24} />}
        </div>
        <h1 className={`text-xl font-black uppercase tracking-tighter ${isBlocked ? 'text-white' : 'group-hover:opacity-70'}`}>
          Sentinel <span className={isBlocked ? 'text-white' : 'text-blue-600'}>/</span> Secure
        </h1>
      </Link>
      
      {/* --- CONDITION 1: BLOCKED USER (ACCESS DENIED) --- */}
      {isBlocked ? (
        <div className="flex items-center gap-3 animate-pulse">
            <Lock size={20} />
            <span className="font-black uppercase tracking-[0.2em] text-sm md:text-lg">Access Denied / Permanent Ban Active</span>
        </div>
      ) : (
        <>
          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex gap-6 font-bold text-sm uppercase tracking-widest items-center">
            <Link to="/" className={`hover:text-blue-600 ${isActive('/')}`}>Home</Link>
            
            {/* TOOLS DROPDOWN */}
            <div className="relative group cursor-pointer h-20 flex items-center">
              <span className="flex items-center gap-1 hover:text-blue-600">Tools <ChevronDown size={14}/></span>
              <div className="absolute top-20 left-0 w-64 bg-white border-2 border-black hidden group-hover:flex flex-col shadow-[4px_4px_0px_0px_#000] text-black">
                 <Link to="/tools/file-encrypt" className="p-3 hover:bg-gray-100 border-b border-gray-200">AES File Vault (New)</Link>
                 <Link to="/tools/webrtc-leak" className="p-3 hover:bg-gray-100 border-b border-gray-200">WebRTC Leak Check (New)</Link>
                 <Link to="/tools/password-gen" className="p-3 hover:bg-gray-100 border-b border-gray-200">Password Gen</Link>
                 <Link to="/tools/browser-check" className="p-3 hover:bg-gray-100 border-b border-gray-200">Browser Fingerprint</Link>
                 <Link to="/tools/ip-lookup" className="p-3 hover:bg-gray-100 border-b border-gray-200">IP Lookup</Link>
                 <Link to="/tools/speed-test" className="p-3 hover:bg-gray-100 border-b border-gray-200">Speed Test</Link>
                 <Link to="/tools/secure-notes" className="p-3 hover:bg-gray-100 border-b border-gray-200">Secure Notes</Link>
                 {renderToolLink("/tools/phishing-check", "Phishing Detector", "pro")}
                 {renderToolLink("/tools/incident-log", "Incident Log", "starter", true)}
              </div>
            </div>

            {/* COMPANY DROPDOWN */}
            <div className="relative group cursor-pointer h-20 flex items-center">
              <span className="flex items-center gap-1 hover:text-blue-600">Company <ChevronDown size={14}/></span>
              <div className="absolute top-20 left-0 w-48 bg-white border-2 border-black hidden group-hover:flex flex-col shadow-[4px_4px_0px_0px_#000] text-black">
                 <Link to="/about" className="p-3 hover:bg-gray-100 border-b border-gray-200">About Us</Link>
                 <Link to="/services" className="p-3 hover:bg-gray-100 border-b border-gray-200">Services</Link>
                 <Link to="/partners" className="p-3 hover:bg-gray-100 border-b border-gray-200">Partners</Link>
                 <Link to="/careers" className="p-3 hover:bg-gray-100 border-b border-gray-200">Careers</Link>
                 <Link to="/press" className="p-3 hover:bg-gray-100">Media Kit</Link>
              </div>
            </div>

            {/* RESOURCES DROPDOWN */}
            <div className="relative group cursor-pointer h-20 flex items-center">
              <span className="flex items-center gap-1 hover:text-blue-600">Resources <ChevronDown size={14}/></span>
              <div className="absolute top-20 left-0 w-56 bg-white border-2 border-black hidden group-hover:flex flex-col shadow-[4px_4px_0px_0px_#000] text-black">
                 <Link to="/audit" className="p-3 hover:bg-gray-100 border-b border-gray-200">Audit Report</Link>
                 <Link to="/status" className="p-3 hover:bg-gray-100 border-b border-gray-200">System Status</Link>
                 <Link to="/security" className="p-3 hover:bg-gray-100 border-b border-gray-200">Trust Center</Link>
                 <Link to="/sitemap" className="p-3 hover:bg-gray-100 border-b border-gray-200">Global Sitemap</Link>
                 <Link to="/faq" className="p-3 hover:bg-gray-100">FAQ</Link>
              </div>
            </div>

            <Link to="/pricing" className={`hover:text-blue-600 ${isActive('/pricing')}`}>Pricing</Link>
            <Link to="/contact" className={`hover:text-blue-600 ${isActive('/contact')}`}>Contact</Link>

            {/* FOUNDER SPECIAL LINK */}
            {isAdmin && (
                <Link to="/admin/verify" className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 border-2 border-black hover:bg-black hover:text-yellow-400 transition-colors">
                    <ShieldCheck size={16}/> Verification
                </Link>
            )}

            <Link to="/settings">
                <User size={20} className="hover:text-blue-600"/>
            </Link>

            <Link to="/dashboard" className="px-6 py-2 bg-red-600 text-white border-2 border-black hover:bg-black transition-colors flex items-center gap-2">
               <Lock size={16} /> Portal
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button className="lg:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {/* MOBILE MENU */}
          {isOpen && (
            <div className="absolute top-20 left-0 w-full h-[calc(100vh-80px)] overflow-y-auto bg-white border-t-2 border-black p-8 flex flex-col gap-8 z-40 pb-32 text-black">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main</p>
                <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase hover:text-blue-600">Home</Link>
                {isAdmin && <Link to="/admin/verify" onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase text-yellow-600">Founder Verification</Link>}
                <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase hover:text-blue-600">Pricing</Link>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase text-red-600 flex items-center gap-2"><Lock size={20}/> Portal Login</Link>
              </div>

              <div className="h-px bg-gray-200"></div>

              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Advanced Tools</p>
                <Link to="/tools/file-encrypt" onClick={() => setIsOpen(false)} className="text-lg font-bold text-green-600">AES File Vault</Link>
                <Link to="/tools/webrtc-leak" onClick={() => setIsOpen(false)} className="text-lg font-bold text-green-600">WebRTC Leak Check</Link>
                <Link to="/tools/password-gen" onClick={() => setIsOpen(false)} className="text-lg font-bold">Password Generator</Link>
                <Link to="/tools/browser-check" onClick={() => setIsOpen(false)} className="text-lg font-bold">Browser Fingerprint</Link>
                <Link to="/tools/ip-lookup" onClick={() => setIsOpen(false)} className="text-lg font-bold">IP Lookup</Link>
                {renderToolLink("/tools/phishing-check", "Phishing Check (Pro)", "pro", false, true)}
                {renderToolLink("/tools/incident-log", "Incident Log (Starter)", "starter", false, true)}
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                 <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full py-4 bg-black text-white text-center font-bold uppercase border-2 border-black">Sign Up Free</Link>
              </div>
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;