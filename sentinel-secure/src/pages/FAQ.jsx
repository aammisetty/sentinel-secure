import React from 'react';

const FAQItem = ({ q, a }) => (
    <div className="mb-6 border-2 border-black p-6 hover:bg-blue-50 transition-colors neo-shadow-hover">
        <h3 className="text-xl font-black uppercase mb-2 flex items-start gap-2">
            <span className="text-blue-600">Q:</span> {q}
        </h3>
        <p className="text-gray-700 font-medium pl-6">{a}</p>
    </div>
);

const FAQ = () => (
  <div className="pt-28 min-h-screen max-w-3xl mx-auto p-8">
    <h1 className="text-5xl font-black uppercase mb-12 border-b-4 border-black inline-block">F.A.Q.</h1>
    <div className="space-y-4">
        <FAQItem q="Do you upload my files?" a="No. All scanning happens locally in your browser using JavaScript FileReader APIs. We respect data sovereignty." />
        <FAQItem q="Is this an Antivirus?" a="No. This is an early-warning forensic tool. It complements your existing Antivirus by detecting encryption behaviors." />
        <FAQItem q="How does payment work?" a="We accept UPI, NEFT, and Bank Transfers. All invoices are GST compliant for Indian businesses." />
        <FAQItem q="Can I self-host this?" a="Yes, the dashboard is built on React and can be deployed locally within your intranet." />
    </div>
  </div>
);
export default FAQ;