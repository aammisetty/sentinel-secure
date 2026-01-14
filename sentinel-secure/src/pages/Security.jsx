import React from 'react';
import { Lock, ShieldCheck, Database, Server, Cpu, Globe, Zap } from 'lucide-react';

const Security = () => {
  return (
    <div className="pt-28 min-h-screen bg-gray-50 p-6 lg:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-blue-900 text-white p-12 border-2 border-black mb-12 shadow-[8px_8px_0px_0px_#000]">
            <ShieldCheck size={48} className="mb-4 text-blue-400"/>
            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-4">Trust Center</h1>
            <p className="font-mono text-blue-200">Encryption Standards & Infrastructure Specifications 2026.</p>
        </div>

        <div className="space-y-12">
            
            {/* Zero-Knowledge Section */}
            <section>
                <h2 className="text-3xl font-black uppercase mb-4 flex items-center gap-2"><Lock/> Zero-Knowledge Forensics</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                    Sentinel Secure operates on a <strong>"Local-First"</strong> principle. All forensic computation is performed within the client-side execution environment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 border-2 border-black bg-white">
                        <Cpu size={24} className="mb-2 text-blue-600"/>
                        <h4 className="font-black uppercase text-xs">Shannon Entropy</h4>
                        <p className="text-[10px] text-gray-500 mt-1">Byte-level analysis calculated on your local CPU.</p>
                    </div>
                    <div className="p-4 border-2 border-black bg-white">
                        <Globe size={24} className="mb-2 text-blue-600"/>
                        <h4 className="font-black uppercase text-xs">Data Sovereignty</h4>
                        <p className="text-[10px] text-gray-500 mt-1">Raw file buffers never transit over the network.</p>
                    </div>
                    <div className="p-4 border-2 border-black bg-white">
                        <Zap size={24} className="mb-2 text-blue-600"/>
                        <h4 className="font-black uppercase text-xs">Sandbox Isolation</h4>
                        <p className="text-[10px] text-gray-500 mt-1">Browser-based execution prevents host system contamination.</p>
                    </div>
                </div>
            </section>

            {/* Encryption Specs */}
            <section>
                <h2 className="text-3xl font-black uppercase mb-4 flex items-center gap-2"><Database/> Cryptographic Standards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 border-2 border-black">
                        <h3 className="font-black uppercase text-blue-600 mb-2">Vault Encryption</h3>
                        <p className="text-sm font-bold">AES-256-GCM</p>
                        <p className="text-xs text-gray-600 mt-2">
                            Uses PBKDF2 with 100,000 iterations for key derivation. Unique 16-byte salts and 12-byte nonces (IVs) are generated for every object.
                        </p>
                    </div>
                    <div className="bg-white p-6 border-2 border-black">
                        <h3 className="font-black uppercase text-green-600 mb-2">Cloud Persistence</h3>
                        <p className="text-sm font-bold">PostgreSQL RLS</p>
                        <p className="text-xs text-gray-600 mt-2">
                            Transaction records are stored in Supabase with Row Level Security (RLS) enabled, ensuring data isolation between users.
                        </p>
                    </div>
                </div>
            </section>

            {/* Infrastructure Specs */}
            <section>
                <h2 className="text-3xl font-black uppercase mb-4 flex items-center gap-2"><Server/> Real-time Infrastructure</h2>
                <div className="bg-black text-white p-8 border-2 border-black font-mono text-xs leading-relaxed">
                    <p className="text-blue-400 mb-2 font-black tracking-widest uppercase">// SYSTEM SPECIFICATIONS</p>
                    <ul className="space-y-1">
                        <li><span className="text-gray-500">HOSTING:</span> Vercel Edge Runtime (Global)</li>
                        <li><span className="text-gray-500">DATABASE:</span> Supabase / PostgreSQL v15</li>
                        <li><span className="text-gray-500">PROTOCOL:</span> TLS 1.3 (ChaCha20-Poly1305)</li>
                        <li><span className="text-gray-500">BROADCAST:</span> Postgres Change Data Capture (CDC)</li>
                        <li><span className="text-gray-500">API_LAYER:</span> RESTful / WebSocket Real-time Sync</li>
                    </ul>
                </div>
            </section>

            {/* Verification Note */}
            <div className="p-6 border-l-4 border-blue-900 bg-blue-50">
                <p className="text-sm italic text-gray-700">
                    "Our architecture is designed to fail closed. If the real-time synchronization with our Command Center is lost, protected features automatically enter a restricted state until integrity is re-verified."
                </p>
                <p className="text-xs font-black uppercase mt-2">— Arun Ammisetty, Proprietor</p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Security;