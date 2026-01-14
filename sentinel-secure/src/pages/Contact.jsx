import React from 'react';
import { 
  MessageCircle, Phone, Mail, MapPin, Terminal, Code, Lock, 
  HelpCircle, Clock, ShieldCheck, Key, Cpu, Globe 
} from 'lucide-react';
import Button from '../components/Button';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const text = `*New Inquiry*\n\nName: ${fd.get('name')}\nEmail: ${fd.get('email')}\nType: ${fd.get('plan')}\nMessage: ${fd.get('message')}`;
    window.open(`https://wa.me/918329004424?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      
      {/* 1. HERO SECTION */}
      <div className="bg-black text-white p-12 lg:p-20 text-center border-b-2 border-black">
          <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter mb-6">
            Let's Talk <span className="text-blue-600">Security</span>.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
            Direct channels for Developers, SMEs, and Enterprise CISOs. 
            No bots, just engineers.
          </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto border-x-2 border-black bg-white">
        
        {/* LEFT COLUMN: INFORMATION */}
        <div className="p-8 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-black space-y-12">
          
          {/* Contact Details */}
          <div>
            <h3 className="font-black uppercase text-2xl mb-6 flex items-center gap-2">
                <Globe className="text-blue-600"/> HQ Coordinates
            </h3>
            <div className="space-y-4 font-bold text-lg">
              <div className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-black hover:bg-blue-50 transition-colors cursor-pointer">
                <Phone size={24} className="text-blue-600"/>
                <span>+91 83290 04424</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-black hover:bg-blue-50 transition-colors cursor-pointer">
                <Mail size={24} className="text-blue-600"/>
                <span>ask.sentinel@tuta.io</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-black">
                <MapPin size={24} className="text-blue-600"/>
                <span>Baner, Pune, MH, India</span>
              </div>
            </div>
          </div>

          {/* Secure Comm Channels */}
          <div className="bg-black text-green-400 p-6 border-2 border-black font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-20"><Lock size={64}/></div>
              <h3 className="font-black uppercase text-white mb-4 flex items-center gap-2">
                  <Terminal size={18} /> Encrypted Channels
              </h3>
              <div className="space-y-3 relative z-10">
                  <div className="flex items-start gap-3">
                      <Key size={16} className="mt-1"/>
                      <div>
                          <p className="font-bold text-white">PGP Fingerprint</p>
                          <p className="break-all opacity-80">8F4D 2A1C 990B E342 551F 009A 112B</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-3">
                      <ShieldCheck size={16} className="mt-1"/>
                      <div>
                          <p className="font-bold text-white">Signal / Session ID</p>
                          <p className="opacity-80">Available upon request for Red Team ops.</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-800">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="font-bold text-white">Bug Bounty Program: ACTIVE</span>
                  </div>
              </div>
          </div>

          {/* Availability Grid */}
          <div>
             <h3 className="font-black uppercase text-xl mb-6 flex items-center gap-2">
                <Clock className="text-blue-600"/> Engineering Hours (IST)
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm font-bold">
                <div className="bg-gray-100 p-4 border border-black text-center">
                    <p className="text-gray-500 mb-1">Mon - Fri</p>
                    <p className="text-xl">10:00 - 19:00</p>
                </div>
                <div className="bg-gray-100 p-4 border border-black text-center">
                    <p className="text-gray-500 mb-1">Weekends</p>
                    <p className="text-xl">Emergency Only</p>
                </div>
            </div>
          </div>

          {/* FAQ Accordion (Visual only) */}
          <div>
             <h3 className="font-black uppercase text-xl mb-6 flex items-center gap-2">
                <HelpCircle className="text-blue-600"/> Quick FAQ
            </h3>
            <div className="space-y-2">
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold list-none flex justify-between items-center">
                        Do you offer White Labeling?
                        <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 pt-2 border-t border-gray-200">Yes, Enterprise plans include custom domain and logo support.</p>
                </details>
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold list-none flex justify-between items-center">
                        What is the response time?
                        <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 pt-2 border-t border-gray-200">Standard: 24hrs. Emergency Panic Button: &lt; 15 mins via WhatsApp API.</p>
                </details>
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold list-none flex justify-between items-center">
                        Can I request a custom feature?
                        <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 pt-2 border-t border-gray-200">Absolutely. Use the form to describe your specific forensic needs.</p>
                </details>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="p-8 lg:p-12 bg-gray-50 flex flex-col justify-center relative">
          
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 border-l-2 border-b-2 border-black">
              RESPONSE TIME: &lt; 2 HRS
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_#000]">
            <h3 className="text-2xl font-black uppercase mb-6">Initialize Connection</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase mb-2">Organization / Identity</label>
                    <input 
                    name="name" 
                    required 
                    className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none transition-all" 
                    placeholder="Enter Organization Name" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase mb-2">Official Correspondence Email</label>
                    <input 
                    name="email" 
                    type="email" 
                    required 
                    className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none transition-all" 
                    placeholder="contact@organization.com" 
                    />
                </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-2">Engagement Protocol</label>
              <select 
                name="plan" 
                className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none transition-all"
              >
                <option>Enterprise Defense Grid (SME)</option>
                <option>Infrastructure Audit (Penetration Test)</option>
                <option>API Gateway Access / Integration</option>
                <option>Vulnerability Disclosure (Bug Bounty)</option>
                <option>Digital Forensics & Incident Response (DFIR)</option>
                <option>Strategic Partnership / General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-2">Technical Briefing</label>
              <textarea 
                name="message" 
                rows="6" 
                className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none transition-all font-mono text-sm" 
                placeholder="// Please outline your security requirements, infrastructure stack, or specific incident details..."
              ></textarea>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="nda" className="w-4 h-4 border-2 border-black"/>
                <label htmlFor="nda" className="text-xs font-bold text-gray-600 cursor-pointer select-none">Request Mutual Non-Disclosure Agreement (NDA) execution.</label>
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-black border-black hover:text-white py-4 text-lg">
              <MessageCircle className="mr-2"/> Initiate Secure Channel
            </Button>
            
            <p className="text-xs text-center text-gray-400 mt-4">
                *Communication secured via End-to-End Encryption standards.
            </p>
          </form>

          {/* Tech Stack Badges */}
          <div className="mt-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <p className="text-xs font-bold uppercase text-center mb-4 tracking-widest">Powered By</p>
              <div className="flex justify-center gap-6 items-center">
                  <Cpu size={24}/>
                  <Lock size={24}/>
                  <ShieldCheck size={24}/>
                  <Code size={24}/>
                  <Terminal size={24}/>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;