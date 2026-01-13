import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import Button from '../components/Button';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const text = `*New SME Inquiry*\nName: ${fd.get('name')}\nEmail: ${fd.get('email')}\nService: ${fd.get('plan')}\nNote: ${fd.get('message')}`;
    window.open(`https://wa.me/918329004424?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-20 min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-blue-600 text-white p-12 lg:p-24 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-black">
        <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-8">
          Secure Your <br/>Business.
        </h1>
        <p className="text-xl opacity-90 mb-12 max-w-lg">
          Get Enterprise-grade protection for your SME starting at just ₹5,000/month.
        </p>
        <div className="space-y-6 font-bold text-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white text-black p-3 rounded-full border-2 border-black"><Phone size={20}/></div>
            +91 83290 04424
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white text-black p-3 rounded-full border-2 border-black"><Mail size={20}/></div>
            contact.aa@tuta.io
          </div>
        </div>
      </div>

      <div className="bg-white p-12 lg:p-24 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Company Name</label>
            <input name="name" required className="w-full p-4 border-2 border-black bg-gray-50 focus:bg-white transition-colors" placeholder="ABC Pvt Ltd" />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Email</label>
            <input name="email" type="email" required className="w-full p-4 border-2 border-black bg-gray-50 focus:bg-white transition-colors" placeholder="admin@abc.com" />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Select Plan</label>
            <select name="plan" className="w-full p-4 border-2 border-black bg-gray-50 focus:bg-white transition-colors">
              <option>Standard Defense (₹5k/mo)</option>
              <option>Audit Only (One Time)</option>
              <option>Enterprise (Custom)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Message</label>
            <textarea name="message" rows="4" className="w-full p-4 border-2 border-black bg-gray-50 focus:bg-white transition-colors" placeholder="Describe your current infrastructure..."></textarea>
          </div>
          <Button className="w-full bg-green-500 text-white hover:bg-green-600 border-black">
            <MessageCircle className="mr-2"/> Chat via WhatsApp
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;