import React from 'react';

const FAQItem = ({ q, a }) => (
    <div className="mb-6 border-b-2 border-gray-200 pb-6">
        <h3 className="text-xl font-black uppercase mb-2">{q}</h3>
        <p className="text-gray-700">{a}</p>
    </div>
);

const FAQ = () => (
  <div className="pt-28 min-h-screen max-w-3xl mx-auto p-8">
    <h1 className="text-5xl font-black uppercase mb-12">F.A.Q.</h1>
    <FAQItem q="Do you upload my files?" a="No. All scanning happens locally in your browser using JavaScript FileReader APIs." />
    <FAQItem q="Is this an Antivirus?" a="No. This is an early-warning system and forensic tool. It complements your existing Antivirus." />
    <FAQItem q="How does payment work?" a="We accept UPI and Bank Transfer. Invoices are GST compliant." />
    <FAQItem q="Can I self-host this?" a="Yes, the dashboard is built on React and can be deployed locally." />
  </div>
);
export default FAQ;