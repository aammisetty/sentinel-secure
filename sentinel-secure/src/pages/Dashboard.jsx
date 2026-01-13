import React, { useState } from 'react';
import { Activity, Upload, AlertOctagon, Check, FileText, Lock, RefreshCw } from 'lucide-react';
import Button from '../components/Button';
import { analyzeFile } from '../utils/cryptoLogic';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lockdownStatus, setLockdownStatus] = useState('active'); // active | locked

  const handleFileUpload = async (e) => {
    setIsProcessing(true);
    const uploaded = Array.from(e.target.files);
    
    // Process purely client-side
    const results = await Promise.all(uploaded.map(file => analyzeFile(file)));
    
    setFiles(prev => [...results, ...prev]);
    setIsProcessing(false);
  };

  const triggerLockdown = () => {
    const confirmLock = window.confirm("ARE YOU SURE? This will alert the support team.");
    if (confirmLock) {
      setLockdownStatus('locked');
      const msg = encodeURIComponent("🚨 EMERGENCY: RANSOMWARE DETECTED. REQUESTING IMMEDIATE LOCKDOWN.");
      window.open(`https://wa.me/918329004424?text=${msg}`, '_blank');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 bg-white p-6 border-2 border-black neo-shadow">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Command Center</h1>
            <p className="text-gray-500 font-mono text-sm">Client-Side Forensics Tool v1.0.4</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className={`px-3 py-1 border-2 border-black font-bold uppercase text-xs ${lockdownStatus === 'active' ? 'bg-green-400' : 'bg-red-500 text-white'}`}>
              Status: {lockdownStatus === 'active' ? 'Monitoring' : 'LOCKDOWN'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Scanner */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white border-2 border-black p-6">
              <h2 className="font-black uppercase text-xl mb-4 flex items-center gap-2">
                <Activity className="text-blue-600" /> Manual Integrity Scan
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Upload suspicious files to calculate Shannon Entropy locally. 
                <br/><span className="font-bold text-black">No data leaves your browser.</span>
              </p>

              <div className="relative border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center hover:bg-blue-50 transition-colors group cursor-pointer">
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileUpload} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto mb-4 text-gray-400 group-hover:text-blue-600" size={32} />
                <p className="font-bold uppercase text-gray-500 group-hover:text-blue-600">Drop Files to Analyze</p>
              </div>

              {isProcessing && (
                <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-400 flex items-center gap-2 text-yellow-800 font-bold animate-pulse">
                  <RefreshCw className="animate-spin" /> Analyzing Bitstreams...
                </div>
              )}
            </div>

            {/* Results Table */}
            {files.length > 0 && (
              <div className="bg-white border-2 border-black p-0 overflow-hidden">
                <table className="w-full text-left text-sm font-mono">
                  <thead className="bg-black text-white uppercase">
                    <tr>
                      <th className="p-4">File</th>
                      <th className="p-4">Entropy</th>
                      <th className="p-4">Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((f, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-4 font-bold">{f.name} <span className="block text-xs text-gray-400">{f.size}</span></td>
                        <td className="p-4">{f.entropy}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 font-bold text-xs border border-black ${
                            f.riskLevel === 'CRITICAL' ? 'bg-red-500 text-white' : 
                            f.riskLevel === 'MEDIUM' ? 'bg-yellow-300' : 'bg-green-200'
                          }`}>
                            {f.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Sidebar Controls */}
          <div className="flex flex-col gap-6">
            
            {/* Panic Button */}
            <div className="bg-red-50 border-2 border-black p-6">
              <h3 className="font-black uppercase text-red-600 text-xl mb-2 flex items-center gap-2">
                <AlertOctagon /> Emergency
              </h3>
              <p className="text-xs font-bold text-red-800 mb-6">
                Triggering this will alert the Sentinel Response Team via WhatsApp API immediately.
              </p>
              <Button 
                onClick={triggerLockdown} 
                variant="danger" 
                className="w-full py-4 text-lg"
              >
                {lockdownStatus === 'active' ? 'TRIGGER LOCKDOWN' : 'ALERT SENT'}
              </Button>
            </div>

            {/* Honeyfile */}
            <div className="bg-white border-2 border-black p-6">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                <FileText /> Trap File
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Download <span className="font-mono bg-gray-200 px-1">passwords.xlsx</span>. Place it on your desktop. If this file changes, you have ransomware.
              </p>
              <Button variant="secondary" className="w-full text-xs">Download Honeyfile</Button>
            </div>

            {/* Support */}
            <div className="bg-blue-600 text-white border-2 border-black p-6">
              <h3 className="font-black uppercase mb-2">24/7 Hotline</h3>
              <p className="text-2xl font-black mb-1">+91 83290 04424</p>
              <p className="text-xs opacity-80">Available for WhatsApp Video Audit</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;