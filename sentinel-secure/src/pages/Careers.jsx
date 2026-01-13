import React from 'react';
import Button from '../components/Button';
import { Briefcase } from 'lucide-react';

const Careers = () => (
  <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8 text-center">
    <Briefcase size={64} className="mx-auto mb-6 text-black"/>
    <h1 className="text-5xl font-black uppercase mb-8">Join the Vanguard</h1>
    <p className="text-xl mb-12 text-gray-600 max-w-xl mx-auto">We are looking for Ethical Hackers and React Developers based in Pune to build the future of localized security.</p>
    
    <div className="grid md:grid-cols-2 gap-8 text-left">
        <div className="p-8 border-2 border-black bg-blue-50 neo-shadow">
            <h3 className="font-black text-2xl mb-2">Security Analyst</h3>
            <p className="mb-4 text-gray-700">Experience with Burp Suite, Python scripting, and OWASP Top 10.</p>
            <p className="font-bold text-sm mb-6">Pune, India (Hybrid)</p>
            <Button className="w-full text-sm">Apply via Email</Button>
        </div>
        <div className="p-8 border-2 border-black bg-green-50 neo-shadow">
            <h3 className="font-black text-2xl mb-2">React Developer</h3>
            <p className="mb-4 text-gray-700">Experience with Tailwind, Vite, and Client-Side Cryptography.</p>
            <p className="font-bold text-sm mb-6">Remote / Pune</p>
            <Button className="w-full text-sm">Apply via Email</Button>
        </div>
    </div>
  </div>
);
export default Careers;