import React from 'react';
import { Lock, ShieldCheck, Database, Server } from 'lucide-react';

const Security = () => {
  return (
    <div className="pt-28 min-h-screen bg-gray-50 p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-blue-900 text-white p-12 border-2 border-black mb-12">
            <ShieldCheck size={48} className="mb-4 text-blue-400"/>
            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-4">Security Whitepaper</h1>
            <p className="font-mono text-blue-200">Architecture, Encryption, and Compliance Standards.</p>
        </div>

        <div className="space-y-12">
            
            <section>
                <h2 className="text-3xl font-black uppercase mb-4 flex items-center gap-2"><Lock/> Zero-Knowledge Architecture</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                    Sentinel Secure operates on a <strong>"Local-First"</strong> principle. When you use our File Analysis tools, the data is processed entirely within your browser's WebAssembly sandbox.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 font-bold text-gray-800">
                    <li>Files are never uploaded to our servers.</li>
                    <li>Hashes (SHA-256) are generated locally.</li>
                    <li>Entropy calculation happens on your CPU.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-3xl font-black uppercase mb-4 flex items-center gap-2"><Database/> Data Encryption</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 border-2 border-black">
                        <h3 className="font-bold uppercase text-blue-600 mb-2">At Rest</h3>
                        <p className="text-sm">AES-256 Encryption for all database records stored in our Firebase infrastructure.</p>
                    </div>
                    <div className="bg-white p-6 border-2 border-black">
                        <h3 className="font-bold uppercase text-green-600 mb-2">In Transit</h3>
                        <p className="text-sm">TLS 1.3 for all data moving between your client and our API endpoints.</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-black uppercase mb-4 flex items-center gap-2"><Server/> Infrastructure</h2>
                <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    Our infrastructure is hosted on <strong>Vercel (Frontend)</strong> and <strong>Google Cloud Platform (Backend)</strong>, utilizing their world-class physical security controls.
                </p>
            </section>

        </div>
      </div>
    </div>
  );
};

export default Security;