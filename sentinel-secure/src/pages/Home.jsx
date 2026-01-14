import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Activity, Lock, Database, ArrowRight, CheckCircle, 
  AlertTriangle, Cpu, Wifi, ShieldAlert, Zap, Globe, 
  Terminal, Server, FileLock, Users, BarChart, HardDrive, 
  Eye, Bell, Landmark, Briefcase, Microscope
} from 'lucide-react';
import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  // --- BLACKLIST / ACCESS DENIED LOGIC ---
  const isBlocked = localStorage.getItem('sentinel_blocked') === 'true';

  // Live System Stats from Browser API
  const [systemStats, setSystemStats] = useState({
    cores: navigator.hardwareConcurrency || 'N/A',
    memory: navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : 'N/A',
    connection: navigator.connection ? navigator.connection.effectiveType.toUpperCase() : 'UNKNOWN',
    latency: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const start = performance.now();
      setTimeout(() => {
        const end = performance.now();
        setSystemStats(prev => ({ ...prev, latency: (end - start).toFixed(2) }));
      }, 0);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- RENDER BLOCK: ACCESS DENIED ---
  if (isBlocked) {
    return (
      <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-6 text-white text-center font-sans overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20 pointer-events-none"></div>
        <div className="relative z-10 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-white text-red-600 flex items-center justify-center mx-auto mb-8 rounded-full shadow-2xl border-4 border-black animate-bounce">
                <ShieldAlert size={48} />
            </div>
            <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-4">ACCESS DENIED</h1>
            <div className="bg-black text-white p-4 inline-block mb-8 border-2 border-white shadow-[8px_8px_0px_0px_#fff]">
                <p className="font-mono text-lg font-bold">REASON: ATTEMPTED PAYMENT FRAUD DETECTED</p>
            </div>
            <p className="max-w-2xl mx-auto text-xl font-bold opacity-90 leading-relaxed uppercase italic">
                Your browser signature, IP address, and identity have been blacklisted from the Sentinel Secure Network. 
                Making false payment claims is a violation of IT Act, 2000. 
                <br/>Contact <span className="underline">gchk@duck.com</span> if you believe this is an error.
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gray-50 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] border-b-2 border-black">
        <div className="p-8 lg:p-20 flex flex-col justify-center bg-yellow-50 border-r-2 border-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <span className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">For Indian SMEs</span>
            <h1 className="text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
              Local<br/>Ransomware<br/><span className="text-blue-600">Defense.</span>
            </h1>
            <p className="text-xl text-gray-700 font-medium mb-10 max-w-md leading-relaxed">
              Lightweight file monitoring and instant lockdown protocols for Windows & SMB infrastructures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard"><Button variant="primary" className="w-full sm:w-auto">Launch Portal <ArrowRight size={20} /></Button></Link>
              <Link to="/pricing"><Button variant="secondary" className="w-full sm:w-auto">Plans & Pricing</Button></Link>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 flex items-center justify-center pattern-grid relative">
          <div className="bg-white border-2 border-black p-6 w-full max-w-md shadow-[12px_12px_0px_0px_#000]">
            <div className="flex items-center gap-4 mb-6 border-b-2 border-black pb-4">
              <div className="w-12 h-12 bg-red-100 border-2 border-black flex items-center justify-center text-red-600 rounded-full animate-pulse"><Activity size={24} /></div>
              <div><h3 className="font-black uppercase text-lg">Active Monitor</h3><p className="text-xs font-mono text-green-600 flex items-center gap-2"><span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>LIVE SESSION</p></div>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between p-2 bg-gray-50 border border-gray-200"><span><Cpu size={14} className="inline mr-2"/> CPU Cores</span><span className="font-bold">{systemStats.cores} Available</span></div>
              <div className="flex justify-between p-2 bg-gray-50 border border-gray-200"><span><Database size={14} className="inline mr-2"/> RAM Pool</span><span className="font-bold">{systemStats.memory}</span></div>
              <div className="flex justify-between p-2 bg-gray-50 border border-gray-200"><span><Wifi size={14} className="inline mr-2"/> Network</span><span className="font-bold text-blue-600">{systemStats.connection} ({systemStats.latency}ms)</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CORE SERVICES SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b-2 border-black bg-white">
        <ServiceCard icon={Activity} title="Anomaly Detection" desc="Detects encryption patterns via entropy analysis before the first folder is locked." price="Starter Plan" />
        <ServiceCard icon={Lock} title="Instant Isolation" desc="One-click network kill-switch to isolate infected endpoints from the server." price="Included" />
        <ServiceCard icon={Database} title="Backup Integrity" desc="Verifies the immutability of local shadows and cloud copies every 6 hours." price="Pro Plan" />
      </div>

      {/* 3. INDUSTRY VERTICALS SECTION */}
      <div className="p-12 lg:p-24 border-b-2 border-black">
        <h2 className="text-4xl lg:text-5xl font-black uppercase mb-12 text-center">Vertical Specific <span className="text-red-600">Solutions</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all group">
                <Landmark size={40} className="mb-4 text-blue-600 group-hover:text-white"/>
                <h3 className="text-xl font-black uppercase mb-2">Finance & CA</h3>
                <p className="text-sm opacity-80">Protection for Tally data, GST records, and client audit trails.</p>
            </div>
            <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all group">
                <Briefcase size={40} className="mb-4 text-blue-600 group-hover:text-white"/>
                <h3 className="text-xl font-black uppercase mb-2">Small Agencies</h3>
                <p className="text-sm opacity-80">Secure your intellectual property, designs, and raw source code files.</p>
            </div>
            <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all group">
                <Microscope size={40} className="mb-4 text-blue-600 group-hover:text-white"/>
                <h3 className="text-xl font-black uppercase mb-2">Healthcare</h3>
                <p className="text-sm opacity-80">HIPAA compliant monitoring for patient diagnostic data and history.</p>
            </div>
        </div>
      </div>

      {/* 4. REAL-TIME THREAT INTELLIGENCE SECTION */}
      <div className="bg-black text-white p-12 lg:p-24 border-b-2 border-black flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
            <Terminal size={48} className="text-green-500 mb-6"/>
            <h2 className="text-4xl font-black uppercase mb-6 leading-tight">Live Threat <br/> Intelligence Feed</h2>
            <p className="text-gray-400 font-bold mb-8">We cross-reference every scan with global ransomware databases and localized Indian phishing campaigns.</p>
            <div className="space-y-4">
                <div className="flex items-center gap-4 bg-gray-900 p-4 border border-gray-700">
                    <Zap size={20} className="text-yellow-400"/>
                    <span className="text-xs font-mono font-bold tracking-widest text-green-400">ALERT: LOCKBIT 3.0 VARIANTS DETECTED IN PUNE REGION</span>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-gray-900 p-8 border-2 border-white rounded shadow-[10px_10px_0px_0px_#22c55e]">
            <h4 className="text-xs font-black uppercase mb-4 text-green-500">Security Audit Logs</h4>
            <div className="font-mono text-[10px] space-y-2 opacity-80 overflow-hidden h-48">
                <p>[09:22:11] SCANNED: D:/Accounts/GST_2025.xlsx - OK</p>
                <p>[09:22:14] SCANNED: D:/Source/Matrix.py - OK</p>
                <p className="text-yellow-400 animate-pulse">[09:23:45] WARNING: HIGH ENTROPY DETECTED IN TEMP_FOLD/DOC.zip</p>
                <p>[09:23:48] ANALYZING MAGIC BYTES...</p>
                <p className="text-green-400">[09:24:01] VERDICT: FALSE POSITIVE - USER ARCHIVE ACTION</p>
                <p>[09:25:00] MONITORING RESUMED...</p>
            </div>
        </div>
      </div>

      {/* 5. TECH STACK SECTION */}
      <div className="p-12 lg:p-24 bg-blue-600 text-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black uppercase mb-12">The Sentinel Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center"><Server size={32} className="mb-2"/><p className="font-bold text-xs">Rust Engine</p></div>
                <div className="flex flex-col items-center"><FileLock size={32} className="mb-2"/><p className="font-bold text-xs">AES-256 GCM</p></div>
                <div className="flex flex-col items-center"><Globe size={32} className="mb-2"/><p className="font-bold text-xs">Edge API</p></div>
                <div className="flex flex-col items-center"><Users size={32} className="mb-2"/><p className="font-bold text-xs">Collaborative ID</p></div>
            </div>
        </div>
      </div>

      {/* 6. COMPLIANCE SECTION */}
      <div className="p-12 lg:p-24 border-b-2 border-black bg-white grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
            <Landmark size={64} className="text-black mb-6"/>
            <h2 className="text-4xl font-black uppercase mb-6">Indian Legal Compliance</h2>
            <p className="text-gray-600 font-medium leading-relaxed">
                Sentinel Secure is built to help SMEs comply with the Digital Personal Data Protection (DPDP) Act, 2023. Our logging and encryption standards match RBI and SEBI security guidelines for digital data storage.
            </p>
        </div>
        <div className="bg-gray-100 border-2 border-black p-8">
            <ul className="space-y-4 font-bold text-sm">
                <li className="flex gap-2"><CheckCircle size={18} className="text-blue-600"/> Data Stored in Pune, India</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-blue-600"/> Zero-Knowledge Architecture</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-blue-600"/> Forensic-Ready Export Logs</li>
            </ul>
        </div>
      </div>

      {/* 7. SCALABILITY SECTION */}
      <div className="p-12 lg:p-24 bg-yellow-50 border-b-2 border-black text-center">
        <BarChart size={64} className="mx-auto text-black mb-8"/>
        <h2 className="text-4xl lg:text-5xl font-black uppercase mb-6">Scales with your Business</h2>
        <p className="max-w-2xl mx-auto text-gray-600 font-bold mb-12">From a single laptop to a 200-node server grid, Sentinel's footprint never exceeds 20MB RAM per endpoint.</p>
        <div className="flex justify-center gap-12">
            <div><p className="text-4xl font-black">99.9%</p><p className="text-xs font-bold uppercase text-gray-400">Uptime</p></div>
            <div><p className="text-4xl font-black">0.2s</p><p className="text-xs font-bold uppercase text-gray-400">Response</p></div>
            <div><p className="text-4xl font-black">128</p><p className="text-xs font-bold uppercase text-gray-400">Threat Signatures</p></div>
        </div>
      </div>

      {/* 8. RECOVERY SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
        <div className="p-12 lg:p-20 bg-black text-white flex flex-col justify-center">
            <h2 className="text-4xl font-black uppercase mb-6 leading-tight text-red-500 underline decoration-white">Post-Infection <br/> Protocol</h2>
            <p className="text-gray-400 mb-10 font-bold">Already hit? Use our forensic toolset to identify the entry point and clear the persistent threats before restoring backups.</p>
            <Link to="/contact"><Button className="bg-white text-black border-white hover:bg-gray-200">Emergency Support</Button></Link>
        </div>
        <div className="bg-gray-200 p-12 lg:p-24 flex items-center justify-center overflow-hidden">
            <HardDrive size={200} className="text-gray-300 -rotate-12"/>
        </div>
      </div>

      {/* 9. DATA PRIVACY SECTION */}
      <div className="p-12 lg:p-24 bg-white border-b-2 border-black text-center">
        <Eye size={48} className="mx-auto mb-6 text-blue-600"/>
        <h2 className="text-4xl font-black uppercase mb-6 tracking-tighter">Your Data stays Yours</h2>
        <p className="max-w-2xl mx-auto text-gray-600 font-medium">We monitor file headers, not file contents. Sentinel never uploads your documents to the cloud. Everything is analyzed locally on the hardware.</p>
      </div>

      {/* 10. NOTIFICATION SECTION */}
      <div className="bg-black text-white p-8 flex flex-wrap justify-between items-center gap-6 border-b-2 border-black">
        <div className="flex items-center gap-4 uppercase font-black tracking-widest text-sm italic">
            <Bell className="animate-bounce" size={24}/> Real-Time SMS & WhatsApp Alerts enabled for all Business Grid users.
        </div>
        <Link to="/signup"><Button variant="secondary" className="border-white text-white hover:bg-white hover:text-black">Activate Alerts</Button></Link>
      </div>

      {/* 11. CTA FINAL */}
      <div className="p-12 lg:p-32 bg-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pattern-grid opacity-5 pointer-events-none"></div>
        <h2 className="text-5xl lg:text-7xl font-black uppercase mb-12 relative z-10 tracking-tighter">Secure Your <br/> Assets <span className="text-blue-600">Now.</span></h2>
        <div className="flex justify-center gap-4 relative z-10">
            <Link to="/pricing"><Button variant="primary" className="py-6 px-12 text-xl">Get Started</Button></Link>
        </div>
      </div>

      {/* 12. TRUST SECTION */}
      <div className="p-16 bg-black text-white text-center border-t-2 border-black">
        <h2 className="text-3xl font-black uppercase mb-8">Why Trust Sentinel?</h2>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
          {['100% Local Logic', 'No Data Uploads', '24/7 Response Team', 'Indian Compliance'].map((item, i) => (
            <div key={i} className="flex items-center gap-2 font-bold text-lg text-gray-300">
              <CheckCircle className="text-blue-500" /> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;