import React from 'react';
import { Shield, Target, Users } from 'lucide-react';

const About = () => (
  <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
    <div className="bg-yellow-50 border-2 border-black p-12 mb-12 neo-shadow">
      <h1 className="text-5xl font-black uppercase mb-6">About Sentinel</h1>
      <p className="text-xl font-medium leading-relaxed">
        We bridge the gap between enterprise-grade security and the Indian SME sector. 
        Most ransomware tools are too expensive or too complex. We are neither.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
       <div className="p-8 border-2 border-black hover:bg-gray-50 transition-colors">
          <div className="mb-4 text-blue-600"><Target size={40}/></div>
          <h2 className="text-2xl font-black uppercase mb-4">Our Mission</h2>
          <p className="text-gray-700">To provide "Local First" security. We believe data sovereignty matters. Your files shouldn't leave your office to be secured.</p>
       </div>
       <div className="p-8 border-2 border-black bg-black text-white">
          <div className="mb-4 text-white"><Users size={40}/></div>
          <h2 className="text-2xl font-black uppercase mb-4">The Architect</h2>
          <p className="mb-4 text-gray-400">Developed by <strong>Arun Ammisetty</strong>, a security researcher focused on defensive cyber operations.</p>
          <a href="https://github.com/aammisetty" className="text-blue-400 hover:underline font-mono">github.com/aammisetty</a>
       </div>
    </div>
  </div>
);
export default About;