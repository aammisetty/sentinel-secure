import React from 'react';
import { Download, FileText, BookOpen, ShieldCheck, Globe } from 'lucide-react';
import Button from '../components/Button';

const Resources = () => {
  const downloadResource = (title, version) => {
    const text = `
SENTINEL SECURE TECHNICAL DOCUMENTATION
----------------------------------------
Document: ${title}
Revision: ${version}
Verified By: Arun Ammisetty
Release Date: January 14, 2026
----------------------------------------
This document outlines the high-security protocols and local-first forensic 
logic used within the Sentinel Secure platform. 

CORE SECURITY PILLARS:
1. Shannon Entropy Byte-Level Analysis.
2. AES-256 GCM Local Encryption.
3. Real-time Supabase Fraud Detection.
4. Non-custodial Data Sovereign Policy.

For full technical integration, contact contact.aa@tuta.io
----------------------------------------
(C) 2026 Sentinel Secure Systems. Pune, India.
    `;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}_2026.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const whitepapers = [
    { id: 1, title: "The State of Indian Cybersecurity 2026", desc: "A deep dive into ransomware trends and local-first defense strategies.", size: "2.4 MB" },
    { id: 2, title: "Forensic Entropy Analysis V2.4", desc: "Technical breakdown of Shannon Entropy math in detecting malicious encryption.", size: "1.8 MB" },
    { id: 3, title: "Compliance & Data Sovereignty", desc: "Aligning local browser forensics with the Information Technology Act (India).", size: "3.1 MB" }
  ];

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8 font-sans">
      <div className="mb-12 border-b-4 border-black pb-8">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Technical Resources</h1>
        <p className="text-gray-500 font-mono text-sm flex items-center gap-2">
          <Globe size={14}/> Global Security Standards | Verified by Arun Ammisetty
        </p>
      </div>

      {/* WHITEPAPERS SECTION */}
      <div className="mb-12">
        <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
          <BookOpen size={24} className="text-blue-600"/> Security Whitepapers
        </h2>
        <div className="space-y-4">
            {whitepapers.map(paper => (
                <div key={paper.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border-2 border-black hover:bg-blue-50 neo-shadow transition-all group">
                    <div className="flex items-start gap-4">
                        <FileText size={40} className="text-gray-400 group-hover:text-blue-600 transition-colors shrink-0"/>
                        <div>
                            <h3 className="font-black text-lg uppercase leading-tight">{paper.title}</h3>
                            <p className="text-sm text-gray-600 mt-1 mb-2">{paper.desc}</p>
                            <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Format: PDF • Size: {paper.size} • Released Jan 2026</p>
                        </div>
                    </div>
                    <Button onClick={() => downloadResource(paper.title, "v1.0")} variant="secondary" className="mt-4 md:mt-0 md:px-6 py-3 border-2 border-black font-black flex items-center gap-2">
                        <Download size={18}/> DOWNLOAD
                    </Button>
                </div>
            ))}
        </div>
      </div>

      {/* DOCUMENTATION SECTION */}
      <div className="mb-12">
        <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
          <ShieldCheck size={24} className="text-green-600"/> Compliance Docs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border-2 border-black bg-gray-50">
            <h4 className="font-black uppercase text-sm mb-2">User Integration Guide</h4>
            <p className="text-xs text-gray-500 mb-4">Complete manual for using the AES-256 File Vault and interpreting forensic audit reports.</p>
            <button onClick={() => downloadResource("Integration_Guide", "v2.1")} className="text-blue-600 text-xs font-black uppercase hover:underline flex items-center gap-1">
              Download PDF <Download size={12}/>
            </button>
          </div>
          <div className="p-6 border-2 border-black bg-gray-50">
            <h4 className="font-black uppercase text-sm mb-2">Proprietor Statement</h4>
            <p className="text-xs text-gray-500 mb-4">Official declaration regarding data privacy and the non-custodial nature of the platform.</p>
            <button onClick={() => downloadResource("Proprietor_Statement", "v1.0")} className="text-blue-600 text-xs font-black uppercase hover:underline flex items-center gap-1">
              Download PDF <Download size={12}/>
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 border-2 border-black bg-black text-white text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-60 mb-2">Technical Support</p>
        <p className="text-lg font-black uppercase">Need Custom Documentation?</p>
        <p className="text-sm opacity-80 mt-2 mb-6">Contact our Pune branch for corporate onboarding and secure self-hosting resources.</p>
        <a href="mailto:contact.aa@tuta.io" className="bg-white text-black px-8 py-3 font-black uppercase text-sm border-2 border-white hover:bg-black hover:text-white transition-all">
          Contact Arun Ammisetty
        </a>
      </div>
    </div>
  );
};

export default Resources;