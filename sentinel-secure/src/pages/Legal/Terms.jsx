import React from 'react';
import { FileText, Gavel, AlertTriangle, ShieldCheck } from 'lucide-react';

const Terms = () => {
  const scrollTo = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="pt-28 min-h-screen bg-gray-50 p-6 lg:p-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-black text-white p-8 border-2 border-black mb-8 shadow-[8px_8px_0px_0px_#22c55e]">
          <FileText size={48} className="mb-4 text-green-500" />
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Terms of Service</h1>
          <p className="text-gray-400 font-mono text-sm">Effective Date: January 14, 2026</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black p-6 sticky top-28 shadow-[4px_4px_0px_0px_#000]">
              <h3 className="font-black uppercase mb-4 text-lg">Table of Contents</h3>
              <ul className="space-y-2 text-sm font-bold text-gray-600">
                <li onClick={() => scrollTo('sec-1')} className="cursor-pointer hover:text-green-600 hover:underline">1. Acceptance</li>
                <li onClick={() => scrollTo('sec-2')} className="cursor-pointer hover:text-green-600 hover:underline">2. License Grant</li>
                <li onClick={() => scrollTo('sec-3')} className="cursor-pointer hover:text-green-600 hover:underline">3. User Obligations</li>
                <li onClick={() => scrollTo('sec-4')} className="cursor-pointer hover:text-green-600 hover:underline">4. Payment Verification</li>
                <li onClick={() => scrollTo('sec-5')} className="cursor-pointer hover:text-green-600 hover:underline">5. Disclaimers</li>
                <li onClick={() => scrollTo('sec-6')} className="cursor-pointer hover:text-green-600 hover:underline">6. Liability</li>
                <li onClick={() => scrollTo('sec-7')} className="cursor-pointer hover:text-green-600 hover:underline">7. Termination</li>
                <li onClick={() => scrollTo('sec-8')} className="cursor-pointer hover:text-green-600 hover:underline">8. Jurisdiction</li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 bg-white border-2 border-black p-8 lg:p-12 space-y-8 shadow-[8px_8px_0px_0px_#ddd]">
            
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
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Reverse engineer, decompile, or disassemble the source code.</li>
                <li>Use the Service for any illegal activity or to support cyber-attacks.</li>
                <li>Resell or redistribute the Service without express written consent.</li>
              </ul>
            </section>

            <section id="sec-3">
              <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2"><Gavel size={24}/> 3. User Obligations</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide accurate information during registration and billing.</li>
                <li>Keep your 2FA credentials and admin sessions secure.</li>
                <li>Submit only valid, authentic Transaction IDs (UTRs) for manual verification.</li>
              </ul>
            </section>

            <section id="sec-4" className="bg-yellow-50 p-6 border-l-4 border-yellow-500">
              <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2"><ShieldCheck size={24}/> 4. Payment Verification</h2>
              <p className="mb-2 font-bold">Manual Review Protocol:</p>
              <p className="text-sm">
                Upgrades to Starter, Pro, or Business plans require manual cross-referencing of UTR/Transaction IDs. Upon submission, a unique **Reference ID** and **Session ID** are generated for administrative tracking.
              </p>
              <p className="text-sm mt-2">
                Approval is granted only after payment confirmation in our primary settlement accounts. You acknowledge that this process may take up to 24 hours.
              </p>
            </section>

            <section id="sec-5">
              <h2 className="text-2xl font-black uppercase mb-4">5. Disclaimers</h2>
              <p className="font-black mb-2 text-red-600 flex items-center gap-2"><AlertTriangle size={18}/> NO WARRANTY FOR MALWARE REMOVAL</p>
              <p>
                Sentinel Secure is a <strong>forensic analysis and detection tool</strong>. It is NOT a substitute for Antivirus software. We do not guarantee that the Service will detect all ransomware or vulnerabilities, especially if the underlying system environment is already compromised.
              </p>
            </section>

            <section id="sec-6">
              <h2 className="text-2xl font-black uppercase mb-4">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by Indian Law, Sentinel Secure and its developers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>The use or inability to use the Service.</li>
                <li>Data loss caused by ransomware, hardware failure, or malware.</li>
                <li>False positives or false negatives in forensic file analysis.</li>
              </ul>
            </section>

            <section id="sec-7">
              <h2 className="text-2xl font-black uppercase mb-4 text-red-600">7. Termination & Anti-Fraud Policy</h2>
              <div className="bg-red-50 border-2 border-red-200 p-4">
                <p className="font-black uppercase mb-2">Finality of Rejection (The "Kill-Switch" Policy)</p>
                <p className="text-xs">
                  We reserve the right to suspend access immediately if you breach these Terms. Specifically, **submitting fraudulent or "spoofed" Transaction IDs** will trigger an automatic hardware-level ban.
                </p>
                <p className="text-xs mt-2 font-bold">
                  Decisions made by the Administrator (testcodecfg@gmail.com) regarding "False Claims" are final and binding. Rejection on grounds of fraud results in a permanent blacklist without a refund.
                </p>
              </div>
            </section>

            <section id="sec-8" className="border-t-2 border-black pt-8">
              <h2 className="text-2xl font-black uppercase mb-4">8. Governing Law & Jurisdiction</h2>
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