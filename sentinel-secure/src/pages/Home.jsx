import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Activity, Lock, Database, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] border-b-2 border-black">
        <div className="p-8 lg:p-20 flex flex-col justify-center bg-yellow-50 border-r-2 border-black relative overflow-hidden">
          {/* Abstract BG Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <span className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">
              For Indian SMEs
            </span>
            <h1 className="text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
              Local<br/>Ransomware<br/><span className="text-blue-600">Defense.</span>
            </h1>
            <p className="text-xl text-gray-700 font-medium mb-10 max-w-md leading-relaxed">
              Don't let a clicked link destroy your business. Lightweight file monitoring and instant lockdown protocols for Windows & SMB.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button variant="primary" className="w-full sm:w-auto">
                  Launch Demo <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Get Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="bg-white p-12 flex items-center justify-center pattern-grid relative">
          <div className="bg-white border-2 border-black p-6 w-full max-w-md shadow-[12px_12px_0px_0px_#000]">
            <div className="flex items-center gap-4 mb-6 border-b-2 border-black pb-4">
              <div className="w-12 h-12 bg-red-100 border-2 border-black flex items-center justify-center text-red-600 rounded-full animate-pulse">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="font-black uppercase text-lg">Threat Monitor</h3>
                <p className="text-xs font-mono text-green-600">● SYSTEM ACTIVE</p>
              </div>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between p-2 bg-gray-50">
                <span>Entropy Scan</span>
                <span className="font-bold">Running...</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50">
                <span>File Integrity</span>
                <span className="font-bold text-green-600">100% OK</span>
              </div>
              <div className="p-3 bg-red-50 border-l-4 border-red-500 mt-4">
                <p className="font-bold text-red-700 text-xs uppercase mb-1 flex items-center gap-1">
                  <AlertTriangle size={12}/> Last Incident
                </p>
                <p className="text-xs">Blocked suspicious write access to /Payroll_Data</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard 
          icon={Activity}
          title="File Anomaly Detection"
          desc="Our Python agents (or lightweight JS scanners) monitor file entropy to detect encryption in real-time."
          price="₹2,000 / mo"
        />
        <ServiceCard 
          icon={Lock}
          title="Quick Lockdown"
          desc="One-click Panic Button triggers network isolation and alerts our response team via WhatsApp."
          price="Included"
        />
        <ServiceCard 
          icon={Database}
          title="Backup Validation"
          desc="Automated checks to ensure your local and cloud backups are immutable and uncorrupted."
          price="₹3,000 / mo"
        />
      </div>

      {/* Trust Section */}
      <div className="p-16 bg-black text-white text-center">
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