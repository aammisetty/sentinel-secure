import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Upload, AlertOctagon, FileText, Zap, Wifi, ShieldAlert, Binary, RefreshCw, LogOut, User } from 'lucide-react';
import Button from '../components/Button';
import { analyzeFile } from '../utils/cryptoLogic';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lockdownStatus, setLockdownStatus] = useState('active'); 
  const [battery, setBattery] = useState({ level: 100, charging: true });
  const [online, setOnline] = useState(navigator.onLine);

  // AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem('sentinel_token');
    const email = localStorage.getItem('sentinel_user');
    
    if (!token) {
      navigate('/login');
    } else {
      setUser(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); // Clear session
    navigate('/login');
  };

  // SYSTEM MONITORING
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.getBattery) {
      navigator.getBattery().then(bat => {
        const updateBat = () => setBattery({ level: (bat.level * 100).toFixed(0), charging: bat.charging });
        updateBat();
        bat.addEventListener('levelchange', updateBat);
        bat.addEventListener('chargingchange', updateBat);
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // REAL LOGIC: File Analysis
  const generateHash = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const checkMagicBytes = async (file) => {
    const slice = file.slice(0, 4);
    const buffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    
    const ext = file.name.split('.').pop().toLowerCase();
    
    // Simple heuristic for Extension Spoofing (e.g. EXE disguised as PDF)
    if (hex.startsWith('4D 5A') && ext !== 'exe' && ext !== 'dll') {
      return { hex, verdict: 'SPOOFED_EXTENSION', risk: 'CRITICAL' };
    }
    return { hex, verdict: 'HEADER_OK', risk: 'LOW' };
  };

  const handleFileUpload = async (e) => {
    setIsProcessing(true);
    const uploaded = Array.from(e.target.files);
    
    const results = await Promise.all(uploaded.map(async (file) => {
      const entropyData = await analyzeFile(file);
      const hash = await generateHash(file);
      const magic = await checkMagicBytes(file);

      let finalRisk = entropyData.riskLevel;
      if (magic.risk === 'CRITICAL') finalRisk = 'CRITICAL';

      return {
        ...entropyData,
        hash: hash.substring(0, 12) + '...',
        fullHash: hash,
        magicHex: magic.hex,
        magicVerdict: magic.verdict,
        finalRisk
      };
    }));
    
    setFiles(prev => [...results, ...prev]);
    setIsProcessing(false);
  };

  const triggerLockdown = () => {
    if (window.confirm("ARE YOU SURE? This will alert the support team.")) {
      setLockdownStatus('locked');
      const msg = encodeURIComponent(`🚨 EMERGENCY: RANSOMWARE DETECTED.\nUser: ${user}\nAction: IMMEDIATE LOCKDOWN REQUEST.`);
      window.open(`https://wa.me/918329004424?text=${msg}`, '_blank');
    }
  };

  const downloadHoneyfile = () => {
    const blob = new Blob(["SENTINEL HONEYPOT FILE\nDO NOT MODIFY."], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwords_do_not_open.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Protected Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 bg-white p-6 border-2 border-black neo-shadow">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Command Center</h1>
            <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-xs font-bold bg-black text-white px-2 py-1">
                    <User size={12} /> {user || 'Authenticated User'}
                </div>
                <div className="text-xs font-mono text-gray-500">
                    Session: ACTIVE
                </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
             <div className="flex items-center gap-2 px-3 py-1 border-2 border-black bg-gray-50">
                <Wifi size={16} className={online ? "text-green-600" : "text-red-600"}/>
                <span className="text-xs font-bold">{online ? "ONLINE" : "OFFLINE"}</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1 border-2 border-black bg-gray-50">
                <Zap size={16} className={battery.charging ? "text-yellow-500" : "text-gray-500"}/>
                <span className="text-xs font-bold">{battery.level}%</span>
             </div>
             <Button onClick={handleLogout} variant="outline" className="text-xs py-1 px-3 border-black bg-white hover:bg-gray-200">
               <LogOut size={14} className="mr-1"/> Logout
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Scanner */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white border-2 border-black p-6">
              <h2 className="font-black uppercase text-xl mb-4 flex items-center gap-2">
                <Binary className="text-blue-600" /> Deep File Analysis
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Checks <strong>Entropy</strong>, <strong>Magic Bytes</strong>, and <strong>SHA-256</strong> locally.
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
                  <RefreshCw className="animate-spin" /> Processing...
                </div>
              )}
            </div>

            {/* Results Table */}
            {files.length > 0 && (
              <div className="bg-white border-2 border-black p-0 overflow-x-auto">
                <table className="w-full text-left text-sm font-mono">
                  <thead className="bg-black text-white uppercase">
                    <tr>
                      <th className="p-4 border-r border-gray-700">File</th>
                      <th className="p-4 border-r border-gray-700">Verdicts</th>
                      <th className="p-4">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((f, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-4 font-bold border-r border-gray-200">
                            {f.name} <span className="block text-xs font-normal text-gray-500">{f.size}</span>
                        </td>
                        <td className="p-4 border-r border-gray-200">
                           <div className="text-xs">Hex: {f.magicHex}</div>
                           <div className={`text-xs font-bold ${f.magicVerdict.includes('SPOOF') ? 'text-red-600' : 'text-green-600'}`}>
                               {f.magicVerdict}
                           </div>
                           <div className="text-xs text-gray-400 mt-1" title={f.fullHash}>Hash: {f.hash}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 font-bold text-xs border border-black ${f.finalRisk === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-green-200'}`}>
                            {f.finalRisk}
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

            <div className="bg-white border-2 border-black p-6">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                <FileText /> Trap File Gen
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Generates a unique <span className="font-mono bg-gray-200 px-1">.txt</span> blob locally. Place it on your desktop.
              </p>
              <Button onClick={downloadHoneyfile} variant="secondary" className="w-full text-xs">Generate Honeyfile</Button>
            </div>
            
            <div className="bg-gray-50 border-2 border-black p-6">
              <h3 className="font-black uppercase mb-4 text-sm tracking-widest text-gray-500">Quick Tools</h3>
              <div className="space-y-2">
                  <a href="/tools/password-gen" className="block text-sm font-bold hover:text-blue-600 hover:underline">Secure Password Gen &rarr;</a>
                  <a href="/tools/browser-check" className="block text-sm font-bold hover:text-blue-600 hover:underline">Browser Fingerprint &rarr;</a>
                  <a href="/tools/ip-lookup" className="block text-sm font-bold hover:text-blue-600 hover:underline">IP Lookup &rarr;</a>
              </div>
            </div>

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