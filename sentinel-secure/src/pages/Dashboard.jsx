import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Upload, AlertOctagon, FileText, Zap, Wifi, ShieldAlert, Binary, 
  RefreshCw, LogOut, User, MapPin, Maximize, Lock, Scissors, Eye, Cpu, Database 
} from 'lucide-react';
import Button from '../components/Button';
import { analyzeFile } from '../utils/cryptoLogic';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // -- STATE: FILE ANALYSIS --
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // -- STATE: SYSTEM MONITORS --
  const [lockdownStatus, setLockdownStatus] = useState('active'); 
  const [battery, setBattery] = useState({ level: 100, charging: true });
  const [online, setOnline] = useState(navigator.onLine);
  const [geo, setGeo] = useState({ lat: '...', lng: '...' });
  const [memory, setMemory] = useState('N/A');
  const [ua, setUa] = useState('');
  
  // -- STATE: UI --
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // 1. AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem('sentinel_token');
    const email = localStorage.getItem('sentinel_user');
    if (!token) navigate('/login');
    else setUser(email);
  }, [navigate]);

  // 2. SESSION TIMER
  useEffect(() => {
    const timer = setInterval(() => setSessionTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. HARDWARE & NETWORK LISTENERS
  useEffect(() => {
    setUa(navigator.userAgent);

    // Network
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Battery
    if (navigator.getBattery) {
      navigator.getBattery().then(bat => {
        const updateBat = () => setBattery({ level: (bat.level * 100).toFixed(0), charging: bat.charging });
        updateBat();
        bat.addEventListener('levelchange', updateBat);
        bat.addEventListener('chargingchange', updateBat);
      });
    }

    // Memory (Chrome only)
    if (performance.memory) {
      const updateMem = () => {
        const used = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1);
        setMemory(`${used} MB`);
      };
      const memInterval = setInterval(updateMem, 2000);
      updateMem();
      return () => clearInterval(memInterval);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 4. REAL LOGIC: Geolocation
  const fetchGeo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setGeo({ lat: pos.coords.latitude.toFixed(4), lng: pos.coords.longitude.toFixed(4) }),
        () => setGeo({ lat: 'Blocked', lng: 'Blocked' })
      );
    }
  };

  // 5. REAL LOGIC: File Hashing & Analysis
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

  // 6. ACTIONS
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

  const clearClipboard = async () => {
    try {
      await navigator.clipboard.writeText('');
      alert('Clipboard Wiped Successfully');
    } catch (err) {
      alert('Failed to access clipboard');
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const lockSession = () => {
    navigate('/login');
  };

  // Format Timer
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 bg-white p-6 border-2 border-black neo-shadow">
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-3xl font-black uppercase tracking-tighter">Command Center</h1>
               <div className="animate-pulse w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-xs font-bold bg-black text-white px-2 py-1">
                    <User size={12} /> {user || 'Authenticated User'}
                </div>
                <div className="text-xs font-mono text-gray-500">
                    Session: {formatTime(sessionTime)}
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
             <Button onClick={lockSession} variant="outline" className="text-xs py-1 px-3 border-black bg-white hover:bg-gray-200">
               <LogOut size={14} className="mr-1"/> Lock
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: SCANNERS */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* FILE SCANNER */}
            <div className="bg-white border-2 border-black p-6">
              <h2 className="font-black uppercase text-xl mb-4 flex items-center gap-2">
                <Binary className="text-blue-600" /> Deep File Forensics
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

            {/* RESULTS TABLE */}
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

            {/* SYSTEM HEALTH GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-black p-6">
                    <h3 className="font-black uppercase mb-4 flex items-center gap-2"><Cpu size={18}/> Process Monitor</h3>
                    <div className="space-y-2 text-sm font-mono">
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span>JS Heap</span>
                            <span className="font-bold">{memory}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span>User Agent</span>
                            <span className="text-xs truncate w-32" title={ua}>Chrome/Linux</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white border-2 border-black p-6">
                    <h3 className="font-black uppercase mb-4 flex items-center gap-2"><MapPin size={18}/> Geolocation</h3>
                    <div className="space-y-2 text-sm font-mono">
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span>Latitude</span>
                            <span className="font-bold">{geo.lat}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span>Longitude</span>
                            <span className="font-bold">{geo.lng}</span>
                        </div>
                    </div>
                    <button onClick={fetchGeo} className="mt-2 text-xs font-bold text-blue-600 hover:underline">REFRESH COORDS</button>
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ACTIONS & TOOLS */}
          <div className="flex flex-col gap-6">
             
             {/* 1. PANIC BUTTON */}
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

            {/* 2. HONEYFILE */}
            <div className="bg-white border-2 border-black p-6">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                <FileText /> Trap File Gen
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                Generates a unique <span className="font-mono bg-gray-200 px-1">.txt</span> blob. Place it on desktop.
              </p>
              <Button onClick={downloadHoneyfile} variant="secondary" className="w-full text-xs">Generate Honeyfile</Button>
            </div>
            
            {/* 3. QUICK TOOLS */}
            <div className="bg-gray-50 border-2 border-black p-6">
              <h3 className="font-black uppercase mb-4 text-sm tracking-widest text-gray-500">Security Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                  <Button onClick={clearClipboard} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto">
                      <Scissors size={20} className="mb-1"/> Wipe Clip
                  </Button>
                  <Button onClick={toggleFullScreen} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto">
                      <Maximize size={20} className="mb-1"/> {isFullScreen ? 'Exit Full' : 'Focus Mode'}
                  </Button>
                  <Button onClick={() => navigate('/tools/file-encrypt')} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto">
                      <Lock size={20} className="mb-1"/> Encrypt
                  </Button>
                  <Button onClick={() => navigate('/tools/ip-lookup')} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto">
                      <Eye size={20} className="mb-1"/> IP Scan
                  </Button>
              </div>
            </div>

            {/* 4. SUPPORT */}
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