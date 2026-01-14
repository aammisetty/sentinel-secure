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
  <div className="pt-28 min-h-screen max-w-3xl mx-auto p-8 font-sans">
    <h1 className="text-5xl font-black uppercase mb-12 border-b-4 border-black inline-block tracking-tighter">F.A.Q.</h1>
    <div className="space-y-4">
        <FAQItem 
            q="Do you upload my files?" 
            a="No. All scanning and entropy analysis happens locally in your browser using JavaScript and WebAssembly. Your raw data never touches our servers, ensuring absolute privacy." 
        />
        <FAQItem 
            q="Is the Audit Report legally valid?" 
            a="The Audit Report provides a forensic snapshot verified by Proprietor Arun Ammisetty. It is designed to assist in compliance with the Information Technology Act (India), though it serves as a technical supplement to, not a replacement for, statutory audits." 
        />
        <FAQItem 
            q="How do I verify a report's authenticity?" 
            a="Every report includes a 'Verified Original' digital stamp and a precise timestamp. For corporate verification, the hardware fingerprint and browser environment metrics can be cross-referenced with your internal system logs." 
        />
        <FAQItem 
            q="Is this an Antivirus?" 
            a="No. Sentinel Secure is an early-warning forensic tool. It complements existing Antivirus/EDR systems by detecting suspicious encryption patterns and file-system behaviors common in ransomware attacks." 
        />
        <FAQItem 
            q="How does payment and billing work?" 
            a="We accept UPI, NEFT, and Bank Transfers. Upon payment, we issue a GST-compliant Tax Invoice as per Rule 46 of CGST Rules, 2017, supporting both Intra-state (Maharashtra) and Inter-state transactions." 
        />
        <FAQItem 
            q="What happens if a payment is flagged as fraud?" 
            a="We maintain a zero-tolerance policy. Submitting fraudulent UTR or Transaction IDs results in a permanent hardware-level blacklist across the entire Sentinel Secure infrastructure, controlled by our central Command Center." 
        />
        <FAQItem 
            q="Can I self-host this dashboard?" 
            a="Yes. The core engine is built on React and can be deployed locally within your private intranet for maximum isolation and security." 
        />
    </div>

    <div className="mt-12 p-6 border-2 border-black bg-gray-50 italic text-sm text-gray-600">
        <p>Still have technical questions? Contact our Lead Developer, <strong>Arun Ammisetty</strong>, at <span className="text-blue-600 font-bold underline">contact.aa@tuta.io</span> for deep integration support.</p>
    </div>
  </div>
);

export default FAQ;