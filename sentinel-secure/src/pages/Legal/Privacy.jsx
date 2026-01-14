import React from 'react';
import { Shield } from 'lucide-react';

const Privacy = () => {
  const scrollTo = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="pt-28 min-h-screen bg-gray-50 p-6 lg:p-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-black text-white p-8 border-2 border-black mb-8">
          <Shield size={48} className="mb-4 text-blue-500" />
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Privacy Policy</h1>
          <p className="text-gray-400 font-mono text-sm">Last Updated: January 14, 2026</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black p-6 sticky top-28">
              <h3 className="font-black uppercase mb-4 text-lg">Table of Contents</h3>
              <ul className="space-y-2 text-sm font-bold text-gray-600">
                <li onClick={() => scrollTo('sec-1')} className="cursor-pointer hover:text-blue-600 hover:underline">1. Introduction</li>
                <li onClick={() => scrollTo('sec-2')} className="cursor-pointer hover:text-blue-600 hover:underline">2. Client-Side Architecture</li>
                <li onClick={() => scrollTo('sec-3')} className="cursor-pointer hover:text-blue-600 hover:underline">3. Data We Collect</li>
                <li onClick={() => scrollTo('sec-4')} className="cursor-pointer hover:text-blue-600 hover:underline">4. How We Use Data</li>
                <li onClick={() => scrollTo('sec-5')} className="cursor-pointer hover:text-blue-600 hover:underline">5. Third-Party Services</li>
                <li onClick={() => scrollTo('sec-6')} className="cursor-pointer hover:text-blue-600 hover:underline">6. Data Security</li>
                <li onClick={() => scrollTo('sec-7')} className="cursor-pointer hover:text-blue-600 hover:underline">7. User Rights</li>
                <li onClick={() => scrollTo('sec-8')} className="cursor-pointer hover:text-blue-600 hover:underline">8. Contact Us</li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 bg-white border-2 border-black p-8 lg:p-12 space-y-8">
            
            <section id="sec-1">
              <h2 className="text-2xl font-black uppercase mb-4">1. Introduction</h2>
              <p className="mb-4">
                <strong>Sentinel Secure</strong> ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and security dashboard.
              </p>
              <p>
                We operate in accordance with the <strong>Information Technology Act, 2000</strong> (India) and follow best practices outlined in the GDPR.
              </p>
            </section>

            <section id="sec-2">
              <h2 className="text-2xl font-black uppercase mb-4">2. Client-Side Architecture</h2>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="font-bold text-blue-800">CRITICAL NOTICE: LOCAL PROCESSING</p>
                <p className="text-sm mt-2">
                  Sentinel Secure is architected as a "Local-First" application. When you use our File Scanner, Entropy Calculator, or Encryption tools, <strong>your files are processed entirely within your web browser using JavaScript and WebAssembly.</strong> Your files are NEVER uploaded to our servers.
                </p>
              </div>
            </section>

            <section id="sec-3">
              <h2 className="text-2xl font-black uppercase mb-4">3. Data We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> When you sign up, we collect your email address and company name for authentication purposes.</li>
                <li><strong>System Telemetry:</strong> We collect non-identifiable technical data (User Agent, Screen Resolution, Battery Status) to provide the "System Health" dashboard features.</li>
                <li><strong>Usage Logs:</strong> We store a local history of incidents (Ransomware triggers) inside your browser's LocalStorage. This data does not leave your device unless you manually export it.</li>
              </ul>
            </section>

            <section id="sec-4">
              <h2 className="text-2xl font-black uppercase mb-4">4. How We Use Data</h2>
              <p>We use your data solely for:</p>
              <ul className="list-decimal pl-6 space-y-2 mt-2">
                <li>Providing authentication services (Login/Signup).</li>
                <li>Sending critical security alerts (via EmailJS).</li>
                <li>Generating local audit reports for your own use.</li>
                <li>Improving the performance of our algorithms.</li>
              </ul>
            </section>

            <section id="sec-5">
              <h2 className="text-2xl font-black uppercase mb-4">5. Third-Party Services</h2>
              <p className="mb-2">We utilize specific third-party providers to function:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>EmailJS:</strong> Used to send OTPs and Alerts. Your email address passes through their system.</li>
                <li><strong>ReqRes/Firebase:</strong> Used for authenticating user sessions.</li>
                <li><strong>WhatsApp API:</strong> If you use the "Panic Button," data is pre-filled into a WhatsApp message which is governed by WhatsApp's privacy policy.</li>
              </ul>
            </section>

            <section id="sec-6">
              <h2 className="text-2xl font-black uppercase mb-4">6. Data Security</h2>
              <p>
                While no service is 100% secure, we use <strong>AES-256 encryption</strong> for local file processing and standard SSL/TLS (HTTPS) for all network communications.
              </p>
            </section>

            <section id="sec-7">
              <h2 className="text-2xl font-black uppercase mb-4">7. User Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Request deletion of your account.</li>
                <li>Clear your local data (via the "Clear Data" button in Settings).</li>
                <li>Opt-out of email communications.</li>
              </ul>
            </section>

            <section id="sec-8" className="border-t-2 border-black pt-8">
              <h2 className="text-2xl font-black uppercase mb-4">8. Contact Us</h2>
              <p>For privacy concerns, please contact our Data Protection Officer:</p>
              <p className="font-bold mt-2">Arun Ammisetty</p>
              <p>Email: <a href="mailto:contact.aa@tuta.io" className="text-blue-600 underline">contact.aa@tuta.io</a></p>
              <p>Address: Baner, Pune, Maharashtra, India.</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;