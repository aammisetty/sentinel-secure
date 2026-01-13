import React from 'react';
import { Shield } from 'lucide-react';

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
       <div className="p-8 border-2 border-black">
          <h2 className="text-2xl font-black uppercase mb-4">Our Mission</h2>
          <p>To provide "Local First" security. We believe data sovereignty matters. Your files shouldn't leave your office to be secured.</p>
       </div>
       <div className="p-8 border-2 border-black bg-black text-white">
          <h2 className="text-2xl font-black uppercase mb-4">The Architect</h2>
          <p className="mb-4">Developed by <strong>Arun Ammisetty</strong>.</p>
          <a href="https://github.com/aammisetty" className="text-blue-400 hover:underline">github.com/aammisetty</a>
       </div>
    </div>
  </div>
);
export default About;