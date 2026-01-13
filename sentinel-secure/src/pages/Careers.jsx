import React from 'react';
import Button from '../components/Button';

const Careers = () => (
  <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8 text-center">
    <h1 className="text-5xl font-black uppercase mb-8">Join the Vanguard</h1>
    <p className="text-xl mb-12">We are looking for Ethical Hackers and React Developers in Pune.</p>
    <div className="grid md:grid-cols-2 gap-8 text-left">
        <div className="p-8 border-2 border-black bg-blue-50">
            <h3 className="font-black text-2xl mb-2">Security Analyst</h3>
            <p className="mb-4">Experience with Burp Suite and Python.</p>
            <Button className="w-full text-sm">Apply Now</Button>
        </div>
        <div className="p-8 border-2 border-black bg-green-50">
            <h3 className="font-black text-2xl mb-2">React Developer</h3>
            <p className="mb-4">Experience with Tailwind and Vite.</p>
            <Button className="w-full text-sm">Apply Now</Button>
        </div>
    </div>
  </div>
);
export default Careers;