import React from 'react';
import { FileText } from 'lucide-react';

const Terms = () => {
  const scrollTo = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="pt-28 min-h-screen bg-gray-50 p-6 lg:p-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-black text-white p-8 border-2 border-black mb-8">
          <FileText size={48} className="mb-4 text-green-500" />
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Terms of Service</h1>
          <p className="text-gray-400 font-mono text-sm">Effective Date: January 14, 2026</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black p-6 sticky top-28">
              <h3 className="font-black uppercase mb-4 text-lg">Table of Contents</h3>
              <ul className="space-y-2 text-sm font-bold text-gray-600">
                <li onClick={() => scrollTo('sec-1')} className="cursor-pointer hover:text-green-600 hover:underline">1. Acceptance</li>
                <li onClick={() => scrollTo('sec-2')} className="cursor-pointer hover:text-green-600 hover:underline">2. License Grant</li>
                <li onClick={() => scrollTo('sec-3')} className="cursor-pointer hover:text-green-600 hover:underline">3. User Obligations</li>
                <li onClick={() => scrollTo('sec-4')} className="cursor-pointer hover:text-green-600 hover:underline">4. Disclaimers</li>
                <li onClick={() => scrollTo('sec-5')} className="cursor-pointer hover:text-green-600 hover:underline">5. Liability</li>
                <li onClick={() => scrollTo('sec-6')} className="cursor-pointer hover:text-green-600 hover:underline">6. Termination</li>
                <li onClick={() => scrollTo('sec-7')} className="cursor-pointer hover:text-green-600 hover:underline">7. Jurisdiction</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border-2 border-black p-8 lg:p-12 space-y-8">
            
            <section id="sec-1">
              <h2 className="text-2xl font-black uppercase mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the <strong>Sentinel Secure</strong> platform, dashboard, or tools (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Service.
              </p>
            </section>

            <section id="sec-2">
              <h2 className="text-2xl font-black uppercase mb-4">2. License Grant</h2>
              <p>
                We grant you a limited, non-exclusive, non-transferable, and revocable license to use the Service for your internal business or personal security monitoring purposes. You may not:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Reverse engineer, decompile, or disassemble the source code.</li>
                <li>Use the Service for any illegal activity or to support cyber-attacks.</li>
                <li>Resell or redistribute the Service without our express written consent.</li>
              </ul>
            </section>

            <section id="sec-3">
              <h2 className="text-2xl font-black uppercase mb-4">3. User Obligations</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Provide accurate information during registration.</li>
                <li>Keep your authentication credentials (passwords, OTPs) secure.</li>
                <li>Use the "Panic Button" feature only in genuine emergencies.</li>
              </ul>
            </section>

            <section id="sec-4">
              <h2 className="text-2xl font-black uppercase mb-4">4. Disclaimers</h2>
              <p className="font-bold mb-2">NO WARRANTY FOR VIRUS REMOVAL</p>
              <p>
                Sentinel Secure is a <strong>forensic analysis and detection tool</strong>. It is NOT a substitute for Antivirus software or Endpoint Detection and Response (EDR) systems. We do not guarantee that the Service will detect all malware, ransomware, or vulnerabilities.
              </p>
            </section>

            <section id="sec-5">
              <h2 className="text-2xl font-black uppercase mb-4">5. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by Indian Law, Sentinel Secure and its developers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>The use or inability to use the Service.</li>
                <li>Data loss caused by ransomware or malware.</li>
                <li>False positives or false negatives in file analysis.</li>
              </ul>
            </section>

            <section id="sec-6">
              <h2 className="text-2xl font-black uppercase mb-4">6. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to the Service immediately, without prior notice, if you breach these Terms or engage in "Prohibited Conduct" as defined in our Acceptable Use Policy.
              </p>
            </section>

            <section id="sec-7" className="border-t-2 border-black pt-8">
              <h2 className="text-2xl font-black uppercase mb-4">7. Governing Law & Jurisdiction</h2>
              <p>
                These Terms shall be governed by the laws of <strong>India</strong>. Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Pune, Maharashtra</strong>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;