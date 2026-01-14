import React from 'react';
import { CreditCard } from 'lucide-react';

const Refund = () => {
  const scrollTo = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="pt-28 min-h-screen bg-gray-50 p-6 lg:p-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-black text-white p-8 border-2 border-black mb-8">
          <CreditCard size={48} className="mb-4 text-pink-500" />
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Refund Policy</h1>
          <p className="text-gray-400 font-mono text-sm">Fair & Transparent Billing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black p-6 sticky top-28">
              <h3 className="font-black uppercase mb-4 text-lg">Menu</h3>
              <ul className="space-y-2 text-sm font-bold text-gray-600">
                <li onClick={() => scrollTo('sec-1')} className="cursor-pointer hover:text-pink-600 hover:underline">1. General Policy</li>
                <li onClick={() => scrollTo('sec-2')} className="cursor-pointer hover:text-pink-600 hover:underline">2. 7-Day Guarantee</li>
                <li onClick={() => scrollTo('sec-3')} className="cursor-pointer hover:text-pink-600 hover:underline">3. Non-Refundable Items</li>
                <li onClick={() => scrollTo('sec-4')} className="cursor-pointer hover:text-pink-600 hover:underline">4. Process</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border-2 border-black p-8 lg:p-12 space-y-8">
            
            <section id="sec-1">
              <h2 className="text-2xl font-black uppercase mb-4">1. General Policy</h2>
              <p>
                At Sentinel Secure, we strive to provide high-quality security tools for Indian SMEs. If you are not satisfied with our premium services, we are here to help.
              </p>
            </section>

            <section id="sec-2">
              <h2 className="text-2xl font-black uppercase mb-4">2. 7-Day Money-Back Guarantee</h2>
              <p>
                For all <strong>Subscription Plans</strong> (Standard Defense), we offer a no-questions-asked 7-day money-back guarantee. If you cancel within 7 days of your initial purchase, we will refund the full amount.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                *This applies only to the first month of service for new customers.
              </p>
            </section>

            <section id="sec-3">
              <h2 className="text-2xl font-black uppercase mb-4">3. Non-Refundable Items</h2>
              <p>The following services are strictly non-refundable once delivered:</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>One-Time Security Audits:</strong> Due to the manual labor and expert time involved.</li>
                <li><strong>Enterprise Custom Setup Fees:</strong> Any hardware or bespoke configuration costs.</li>
                <li><strong>Consultation Calls:</strong> Once the call has taken place.</li>
              </ul>
            </section>

            <section id="sec-4">
              <h2 className="text-2xl font-black uppercase mb-4">4. Refund Process</h2>
              <p className="mb-4">To request a refund:</p>
              <ol className="list-decimal pl-6 space-y-2 font-bold">
                <li>Email us at <span className="text-blue-600">contact.aa@tuta.io</span>.</li>
                <li>Subject line: "Refund Request - [Your Company Name]".</li>
                <li>Include your Invoice ID and reason for cancellation (optional, for feedback).</li>
              </ol>
              <p className="mt-4">
                Refunds are processed within <strong>5-7 business days</strong> to the original payment method.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;