import React from 'react';
import { AlertOctagon } from 'lucide-react';

const AcceptableUse = () => {
  return (
    <div className="pt-28 min-h-screen bg-gray-50 p-6 lg:p-12 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-red-600 text-white p-8 border-2 border-black mb-8 neo-shadow">
          <AlertOctagon size={48} className="mb-4" />
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Acceptable Use</h1>
          <p className="font-mono text-sm font-bold opacity-90">Do not cross the line.</p>
        </div>

        <div className="bg-white border-2 border-black p-8 lg:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-black uppercase mb-4">1. Prohibited Actions</h2>
              <p>You agree NOT to use Sentinel Secure for:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Illegal Hacking:</strong> Scanning, probing, or attacking networks or devices you do not own or have explicit permission to test.</li>
                <li><strong>Malware Distribution:</strong> Hosting, uploading, or distributing viruses, worms, or ransomware via our file analysis tools.</li>
                <li><strong>Phishing:</strong> Generating "Honeyfiles" or "Traps" to deceive legitimate users or steal credentials outside of authorized Red Teaming exercises.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-4">2. System Abuse</h2>
              <p>
                You must not interfere with the proper functioning of the Dashboard, including:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Overloading our authentication servers (Rate Limiting applies).</li>
                <li>Attempting to bypass our client-side entropy logic.</li>
                <li>Scraping data from our IP Lookup or Threat Intelligence feeds.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-4">3. Reporting Abuse</h2>
              <p>
                If you suspect a user is utilizing Sentinel Secure for malicious purposes, please report it immediately to:
              </p>
              <div className="bg-gray-100 p-4 mt-4 border-2 border-black font-mono">
                Email: abuse.sentinel@tuta.io<br/>
                Subject: [ABUSE REPORT]
              </div>
            </section>

        </div>
      </div>
    </div>
  );
};

export default AcceptableUse;