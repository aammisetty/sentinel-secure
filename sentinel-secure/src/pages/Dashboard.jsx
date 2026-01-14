import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Upload, AlertOctagon, FileText, Zap, Wifi, Binary, 
  RefreshCw, LogOut, User, MapPin, Maximize, Lock, Scissors, Eye, Cpu, 
  Globe, Smartphone, Fingerprint, Camera, Speaker, Layers, Shield,
  Bluetooth, Usb, Terminal, Moon, Sun, Clock, WifiOff, AlertTriangle,
  Ghost, Anchor, Activity as Pulse, Compass, Database
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
  const [speed, setSpeed] = useState('Test Ready');
  const [localIP, setLocalIP] = useState('Hidden');
  const [latency, setLatency] = useState('---');
  const [orientation, setOrientation] = useState('0°');
  
  // -- STATE: BASIC FEATURES --
  const [connectionType, setConnectionType] = useState('Unknown');
  const [cores, setCores] = useState(navigator.hardwareConcurrency || 'N/A');
  const [screenRes, setScreenRes] = useState(`${window.screen.width}x${window.screen.height}`);
  const [doNotTrack, setDoNotTrack] = useState(navigator.doNotTrack || 'Unspecified');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [platform, setPlatform] = useState(navigator.platform);
  const [language, setLanguage] = useState(navigator.language);
  const [touchPoints, setTouchPoints] = useState(navigator.maxTouchPoints || 0);
  const [cookieEnabled, setCookieEnabled] = useState(navigator.cookieEnabled);
  const [storageQuota, setStorageQuota] = useState('Calculating...');
  const [gpuRenderer, setGpuRenderer] = useState('Analyzing...');
  const [canvasHash, setCanvasHash] = useState('Pending');
  const [audioHash, setAudioHash] = useState('Pending');
  const [permissions, setPermissions] = useState({ cam: '?', mic: '?', loc: '?' });
  const [historyLen, setHistoryLen] = useState(window.history.length);
  const [darkMode, setDarkMode] = useState(false); 
  const [pdfViewer, setPdfViewer] = useState('Unknown');
  const [isStealth, setIsStealth] = useState(false);
  const [wakeLockObj, setWakeLockObj] = useState(null);

  // -- NEW STATE: DEEP TELEMETRY --
  const [deepScan, setDeepScan] = useState({
    maxTextureSize: 0, maxRenderBuffer: 0, aliasedLineRange: 'N/A',
    sampleRate: 0, channelCount: 0,
    downlink: 'N/A', rtt: 'N/A', saveData: 'N/A',
    chargeTime: 'N/A', dischargeTime: 'N/A',
    colorDepth: 0, pixelRatio: 1,
    bluetooth: false, usb: false, gamepad: false, vr: false, midi: false,
    webWorkers: false, serviceWorker: false, sharedWorkers: false,
    indexedDB: false, localStorage: false, sessionStorage: false,
    paymentAPI: false, credentialsAPI: false, wakeLock: false,
    emeSupport: false, pipSupport: false,
    vendor: '', javaEnabled: false
  });
  
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  
  // -- INACTIVITY TIMER STATE --
  const [idleTime, setIdleTime] = useState(0);
  const [showIdleWarning, setShowIdleWarning] = useState(false);
  const IDLE_LIMIT = 60; // 60 seconds

  // 1. AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem('sentinel_token');
    const email = localStorage.getItem('sentinel_user');
    if (!token) navigate('/login');
    else setUser(email);
  }, [navigate]);

  // 2. SESSION & IDLE TIMER
  useEffect(() => {
    const timer = setInterval(() => {
        setSessionTime(t => t + 1);
        setIdleTime(t => t + 1);
    }, 1000);

    const resetIdle = () => {
        setIdleTime(0);
        setShowIdleWarning(false);
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keypress', resetIdle);
    window.addEventListener('scroll', resetIdle);
    window.addEventListener('click', resetIdle);

    return () => {
        clearInterval(timer);
        window.removeEventListener('mousemove', resetIdle);
        window.removeEventListener('keypress', resetIdle);
        window.removeEventListener('scroll', resetIdle);
        window.removeEventListener('click', resetIdle);
    };
  }, []);

  // 3. IDLE LOGIC
  useEffect(() => {
      if (idleTime >= IDLE_LIMIT) {
          localStorage.removeItem('sentinel_token');
          navigate('/login');
      } else if (idleTime >= IDLE_LIMIT - 10) {
          setShowIdleWarning(true);
      }
  }, [idleTime, navigate]);

  // 4. LISTENERS & SCANS
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Orientation Listener
    const handleOrientation = (event) => {
        if(event.alpha) setOrientation(`${event.alpha.toFixed(0)}°`);
    };
    window.addEventListener('deviceorientation', handleOrientation);

    if (navigator.connection) {
        setConnectionType(navigator.connection.effectiveType || 'Wifi/Eth');
    }

    if (navigator.getBattery) {
      navigator.getBattery().then(bat => {
        const updateBat = () => setBattery({ level: (bat.level * 100).toFixed(0), charging: bat.charging });
        updateBat();
        bat.addEventListener('levelchange', updateBat);
        bat.addEventListener('chargingchange', updateBat);
      });
    }

    if (performance.memory) {
      const updateMem = () => {
        const used = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1);
        setMemory(`${used} MB`);
      };
      updateMem();
    }

    if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(estimate => {
            const gb = (estimate.quota / 1024 / 1024 / 1024).toFixed(1);
            setStorageQuota(`${gb} GB`);
        });
    }

    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) setGpuRenderer(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
        }
    } catch(e) {}

    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125,1,62,20);
        ctx.fillStyle = "#069";
        ctx.fillText("Sentinel", 2, 15);
        const b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
        const bin = atob(b64);
        setCanvasHash(bin.slice(-8, -1).split('').map(c => c.charCodeAt(0).toString(16)).join(''));
    } catch(e) {}

    setPdfViewer(Array.from(navigator.plugins).some(p => p.name.includes('PDF')) ? 'Native Support' : 'No Plugin');

    runDeepScan();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const runDeepScan = async () => {
    let scanData = {};

    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        if (gl) {
            scanData.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            scanData.maxRenderBuffer = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
            const aliased = gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE);
            scanData.aliasedLineRange = aliased ? `${aliased[0]}-${aliased[1]}` : 'N/A';
        }
    } catch(e) {}

    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if(AudioContext) {
            const audioCtx = new AudioContext();
            scanData.sampleRate = audioCtx.sampleRate;
            scanData.channelCount = audioCtx.destination.channelCount;
            // Generate Audio Fingerprint
            const osc = audioCtx.createOscillator();
            const anal = audioCtx.createAnalyser();
            const gain = audioCtx.createGain();
            osc.connect(anal);
            anal.connect(gain);
            gain.connect(audioCtx.destination);
            setAudioHash(`AF-${audioCtx.sampleRate}-${audioCtx.baseLatency || 0}`); 
            audioCtx.close();
        }
    } catch(e) {}

    if(navigator.connection) {
        scanData.downlink = navigator.connection.downlink + ' Mbps';
        scanData.rtt = navigator.connection.rtt + ' ms';
        scanData.saveData = navigator.connection.saveData ? 'On' : 'Off';
    }

    if(navigator.getBattery) {
        const b = await navigator.getBattery();
        scanData.chargeTime = b.chargingTime === Infinity ? 'Unknown' : b.chargingTime + 's';
        scanData.dischargeTime = b.dischargingTime === Infinity ? 'Unknown' : b.dischargingTime + 's';
    }

    scanData.colorDepth = window.screen.colorDepth;
    scanData.pixelRatio = window.devicePixelRatio;

    scanData.bluetooth = 'bluetooth' in navigator;
    scanData.usb = 'usb' in navigator;
    scanData.gamepad = 'getGamepads' in navigator;
    scanData.vr = 'xr' in navigator;
    scanData.midi = 'requestMIDIAccess' in navigator;
    
    scanData.webWorkers = typeof Worker !== 'undefined';
    scanData.sharedWorkers = typeof SharedWorker !== 'undefined';
    scanData.serviceWorker = 'serviceWorker' in navigator;
    scanData.indexedDB = 'indexedDB' in window;
    scanData.localStorage = 'localStorage' in window;
    scanData.sessionStorage = 'sessionStorage' in window;

    scanData.paymentAPI = 'PaymentRequest' in window;
    scanData.credentialsAPI = 'credentials' in navigator;
    scanData.wakeLock = 'wakeLock' in navigator;
    scanData.emeSupport = 'requestMediaKeySystemAccess' in navigator;
    scanData.pipSupport = 'pictureInPictureEnabled' in document;

    scanData.vendor = navigator.vendor;
    scanData.javaEnabled = navigator.javaEnabled ? navigator.javaEnabled() : false;

    setDeepScan(prev => ({...prev, ...scanData}));
  };

  const fetchGeo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setGeo({ lat: pos.coords.latitude.toFixed(4), lng: pos.coords.longitude.toFixed(4) }),
        () => setGeo({ lat: 'Blocked', lng: 'Blocked' })
      );
    }
  };

  const checkPermissions = async () => {
    try {
        const c = await navigator.permissions.query({ name: 'camera' });
        const m = await navigator.permissions.query({ name: 'microphone' });
        const l = await navigator.permissions.query({ name: 'geolocation' });
        setPermissions({ cam: c.state, mic: m.state, loc: l.state });
    } catch(e) {
        setPermissions({ cam: 'Error', mic: 'Error', loc: 'Error' });
    }
  };

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

  const poisonClipboard = async () => {
      try {
          await navigator.clipboard.writeText('FAKE_PASSWORD_12345_DO_NOT_USE');
          alert('Clipboard Poisoned with Fake Data');
      } catch (err) {
          alert('Failed');
      }
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

  const testVibration = () => {
      if(navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
      } else {
          alert("Vibration API not supported.");
      }
  };

  const testNetworkSpeed = () => {
      setSpeed('Testing...');
      const startTime = new Date().getTime();
      const img = new Image();
      img.src = "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg?t=" + startTime; // ~100KB
      img.onload = () => {
          const endTime = new Date().getTime();
          const duration = (endTime - startTime) / 1000;
          const bitsLoaded = 100 * 1024 * 8;
          const speedBps = (bitsLoaded / duration).toFixed(2);
          const speedKbps = (speedBps / 1024).toFixed(2);
          setSpeed(`${speedKbps} Kbps`);
      };
  };

  const checkWebRTCLeak = () => {
      setLocalIP('Scanning...');
      const pc = new RTCPeerConnection({iceServers: []});
      pc.createDataChannel("");
      pc.createOffer().then(o => pc.setLocalDescription(o));
      pc.onicecandidate = (ice) => {
          if (ice && ice.candidate && ice.candidate.candidate) {
              const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
              const ip = ipRegex.exec(ice.candidate.candidate);
              if (ip) setLocalIP(ip[1]);
              pc.close();
          }
      };
      setTimeout(() => {
          if(localIP === 'Scanning...') setLocalIP('Not Found (Secure)');
      }, 2000);
  };

  // FEATURE: STEALTH MODE (Fake Google Docs)
  const toggleStealth = () => {
      if (!isStealth) {
          document.title = "Untitled document - Google Docs";
          const link = document.querySelector("link[rel~='icon']");
          if (link) link.href = "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
          setIsStealth(true);
      } else {
          document.title = "Sentinel Dashboard";
          setIsStealth(false);
      }
  };

  // FEATURE: WAKE LOCK
  const toggleWakeLock = async () => {
      if ('wakeLock' in navigator) {
          if (!wakeLockObj) {
              try {
                  const wl = await navigator.wakeLock.request('screen');
                  setWakeLockObj(wl);
                  alert("Screen Wake Lock Active");
              } catch (err) {
                  alert(`Wake Lock Failed: ${err.name}`);
              }
          } else {
              wakeLockObj.release();
              setWakeLockObj(null);
              alert("Screen Wake Lock Released");
          }
      }
  };

  // FEATURE: NETWORK PING
  const pingNetwork = async () => {
      setLatency('Pinging...');
      const start = Date.now();
      try {
          await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors', cache: 'no-store' });
          const end = Date.now();
          setLatency(`${end - start} ms`);
      } catch (e) {
          setLatency('Error');
      }
  };

  // FEATURE: MEMORY STRESS TEST
  const stressMemory = () => {
      try {
          const arr = new Array(10000000).fill(Math.random());
          alert(`Memory Stress Test: Allocated ${arr.length} integers.`);
      } catch(e) {
          alert("Memory Allocation Failed (System Safe)");
      }
  };

  const lockSession = () => navigate('/login');

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`pt-80 min-h-screen p-4 lg:p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      
      {/* IDLE WARNING MODAL */}
      {showIdleWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-pulse">
              <div className="bg-red-600 text-white p-8 border-4 border-white text-center max-w-md">
                  <AlertTriangle size={64} className="mx-auto mb-4"/>
                  <h2 className="text-3xl font-black uppercase mb-2">Inactivity Alert</h2>
                  <p className="font-bold text-lg">Logging out in {IDLE_LIMIT - idleTime} seconds...</p>
                  <p className="text-sm mt-2">Move your mouse to stay logged in.</p>
              </div>
          </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-8 p-6 border-2 border-black neo-shadow mt-8 ${darkMode ? 'bg-gray-800 border-white' : 'bg-white'}`}>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-3xl font-black uppercase tracking-tighter">Command Center</h1>
               <div className="animate-pulse w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-4 mt-2">
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <User size={12} /> {user || 'Authenticated User'}
                </div>
                <div className="text-xs font-mono opacity-70">
                    Session: {formatTime(sessionTime)}
                </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
             <div className={`flex items-center gap-2 px-3 py-1 border-2 ${darkMode ? 'border-white bg-gray-700' : 'border-black bg-gray-50'}`}>
                <Wifi size={16} className={online ? "text-green-500" : "text-red-500"}/>
                <span className="text-xs font-bold">{online ? "ONLINE" : "OFFLINE"}</span>
             </div>
             <div className={`flex items-center gap-2 px-3 py-1 border-2 ${darkMode ? 'border-white bg-gray-700' : 'border-black bg-gray-50'}`}>
                <Zap size={16} className={battery.charging ? "text-yellow-400" : "text-gray-400"}/>
                <span className="text-xs font-bold">{battery.level}%</span>
             </div>
             <Button onClick={toggleDarkMode} variant="outline" className={`text-xs py-1 px-3 border-2 ${darkMode ? 'border-white bg-gray-700 text-white' : 'border-black bg-white'}`}>
                {darkMode ? <Sun size={14}/> : <Moon size={14}/>}
             </Button>
             <Button onClick={lockSession} variant="outline" className={`text-xs py-1 px-3 border-2 ${darkMode ? 'border-white bg-gray-700 text-white' : 'border-black bg-white'}`}>
               <LogOut size={14} className="mr-1"/> Lock
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: SCANNERS */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* FILE SCANNER */}
            <div className={`border-2 p-6 ${darkMode ? 'bg-gray-800 border-white' : 'bg-white border-black'}`}>
              <h2 className="font-black uppercase text-xl mb-4 flex items-center gap-2">
                <Binary className="text-blue-500" /> Deep File Forensics
              </h2>
              <div className={`relative border-2 border-dashed p-12 text-center transition-colors group cursor-pointer ${darkMode ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' : 'border-gray-300 bg-gray-50 hover:bg-blue-50'}`}>
                <input type="file" multiple onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                <Upload className={`mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-400 group-hover:text-blue-600'}`} size={32} />
                <p className={`font-bold uppercase ${darkMode ? 'text-gray-300' : 'text-gray-500 group-hover:text-blue-600'}`}>Drop Files to Analyze</p>
              </div>
              {isProcessing && (
                <div className="mt-4 p-4 bg-yellow-100 border-2 border-yellow-400 flex items-center gap-2 text-yellow-800 font-bold animate-pulse">
                  <RefreshCw className="animate-spin" /> Processing...
                </div>
              )}
            </div>

            {/* RESULTS */}
            {files.length > 0 && (
              <div className={`border-2 p-0 overflow-x-auto ${darkMode ? 'bg-gray-800 border-white' : 'bg-white border-black'}`}>
                <table className="w-full text-left text-sm font-mono">
                  <thead className={`${darkMode ? 'bg-white text-black' : 'bg-black text-white'} uppercase`}>
                    <tr><th className="p-4">File</th><th className="p-4">Verdicts</th><th className="p-4">Risk</th></tr>
                  </thead>
                  <tbody>
                    {files.map((f, i) => (
                      <tr key={i} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="p-4 font-bold">{f.name}</td>
                        <td className="p-4 text-xs">{f.magicVerdict}</td>
                        <td className="p-4 font-bold">{f.finalRisk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SYSTEM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Hardware */}
                <div className={`border-2 p-6 ${darkMode ? 'bg-gray-800 border-white' : 'bg-white border-black'}`}>
                    <h3 className="font-black uppercase mb-4 flex items-center gap-2"><Cpu size={18}/> Hardware Specs</h3>
                    <div className="space-y-2 text-xs font-mono font-bold">
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>CPU Cores</span><span>{cores}</span></div>
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>JS Heap</span><span>{memory}</span></div>
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>Storage</span><span>{storageQuota}</span></div>
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>Res</span><span>{screenRes}</span></div>
                        <div className="flex justify-between pt-1"><span>GPU</span><span className="truncate w-32 text-right">{gpuRenderer}</span></div>
                    </div>
                </div>

                {/* 2. Network */}
                <div className={`border-2 p-6 ${darkMode ? 'bg-gray-800 border-white' : 'bg-white border-black'}`}>
                    <h3 className="font-black uppercase mb-4 flex items-center gap-2"><Globe size={18}/> Network Identity</h3>
                    <div className="space-y-2 text-xs font-mono font-bold">
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>Type</span><span>{connectionType}</span></div>
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>Do Not Track</span><span>{doNotTrack === '1' ? 'ON' : 'OFF'}</span></div>
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>Cookies</span><span>{cookieEnabled ? 'ON' : 'OFF'}</span></div>
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>OS</span><span>{platform}</span></div>
                        <div className="flex justify-between pt-1"><span>Lang</span><span>{language}</span></div>
                    </div>
                </div>
                
                {/* 3. Fingerprint */}
                <div className={`border-2 p-6 ${darkMode ? 'bg-gray-800 border-white' : 'bg-white border-black'}`}>
                    <h3 className="font-black uppercase mb-4 flex items-center gap-2"><Fingerprint size={18}/> Fingerprint</h3>
                    <div className="space-y-2 text-xs font-mono font-bold">
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>Canvas</span><span className="truncate w-24">{canvasHash}</span></div>
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>Audio</span><span className="truncate w-24">{audioHash}</span></div>
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>Touch</span><span>{touchPoints}</span></div>
                        <div className="flex justify-between border-b border-gray-600/30 pb-1"><span>Timezone</span><span>{timezone}</span></div>
                        <div className="flex justify-between pt-1"><span>PDF</span><span>{pdfViewer}</span></div>
                    </div>
                </div>

                {/* 4. Sensors */}
                <div className={`border-2 p-6 ${darkMode ? 'bg-gray-800 border-white' : 'bg-white border-black'}`}>
                    <h3 className="font-black uppercase mb-4 flex items-center gap-2"><Shield size={18}/> Sensors</h3>
                    <div className="mb-4">
                        <div className="flex justify-between text-xs font-bold mb-1"><span>Geo</span><span>{geo.lat}</span></div>
                        <Button onClick={fetchGeo} variant="secondary" className="w-full text-xs py-1 h-auto">Ping</Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className={`p-2 border ${darkMode ? 'bg-gray-700 border-gray-500' : 'bg-gray-100 border-black'}`}><Camera size={16} className="mx-auto mb-1"/><div className="text-[10px]">{permissions.cam}</div></div>
                        <div className={`p-2 border ${darkMode ? 'bg-gray-700 border-gray-500' : 'bg-gray-100 border-black'}`}><Speaker size={16} className="mx-auto mb-1"/><div className="text-[10px]">{permissions.mic}</div></div>
                        <div className={`p-2 border ${darkMode ? 'bg-gray-700 border-gray-500' : 'bg-gray-100 border-black'}`}><MapPin size={16} className="mx-auto mb-1"/><div className="text-[10px]">{permissions.loc}</div></div>
                    </div>
                    <Button onClick={checkPermissions} className={`w-full mt-2 text-xs py-1 h-auto ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>Scan</Button>
                </div>
            </div>

            {/* DEEP SYSTEM TELEMETRY (Improved Design) */}
            <div className={`p-6 border-2 font-mono text-xs overflow-x-auto ${darkMode ? 'bg-black border-white text-green-400' : 'bg-black text-green-400 border-black'}`}>
                 <h3 className="font-black uppercase mb-6 text-white text-xl flex items-center gap-3 border-b-2 border-gray-700 pb-4">
                     <Terminal size={24}/> Deep System Telemetry
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     
                     <div>
                         <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[10px]">Graphics & Media</h4>
                         <div className="space-y-2">
                             <div className="flex justify-between border-b border-gray-800 pb-1"><span>Max Texture:</span> <span>{deepScan.maxTextureSize}</span></div>
                             <div className="flex justify-between border-b border-gray-800 pb-1"><span>Line Width:</span> <span>{deepScan.aliasedLineRange}</span></div>
                             <div className="flex justify-between border-b border-gray-800 pb-1"><span>Color Depth:</span> <span>{deepScan.colorDepth}</span></div>
                             <div className="flex justify-between"><span>Sample Rate:</span> <span>{deepScan.sampleRate}</span></div>
                         </div>
                     </div>

                     <div>
                         <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[10px]">Network & Power</h4>
                         <div className="space-y-2">
                             <div className="flex justify-between border-b border-gray-800 pb-1"><span>Downlink:</span> <span>{deepScan.downlink}</span></div>
                             <div className="flex justify-between border-b border-gray-800 pb-1"><span>RTT:</span> <span>{deepScan.rtt}</span></div>
                             <div className="flex justify-between border-b border-gray-800 pb-1"><span>Vendor:</span> <span>{deepScan.vendor || 'N/A'}</span></div>
                             <div className="flex justify-between"><span>Charging:</span> <span>{deepScan.chargeTime}</span></div>
                         </div>
                     </div>
                     
                     <div>
                         <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[10px]">Browser APIs</h4>
                         <div className="grid grid-cols-2 gap-y-2">
                             <div className="flex items-center gap-2">{deepScan.bluetooth ? <CheckC/> : <XC/>} BT</div>
                             <div className="flex items-center gap-2">{deepScan.usb ? <CheckC/> : <XC/>} USB</div>
                             <div className="flex items-center gap-2">{deepScan.gamepad ? <CheckC/> : <XC/>} Gamepad</div>
                             <div className="flex items-center gap-2">{deepScan.vr ? <CheckC/> : <XC/>} WebXR</div>
                             <div className="flex items-center gap-2">{deepScan.midi ? <CheckC/> : <XC/>} MIDI</div>
                             <div className="flex items-center gap-2">{deepScan.wakeLock ? <CheckC/> : <XC/>} Wake</div>
                         </div>
                     </div>

                     <div>
                         <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[10px]">Storage & Workers</h4>
                         <div className="grid grid-cols-2 gap-y-2">
                             <div className="flex items-center gap-2">{deepScan.webWorkers ? <CheckC/> : <XC/>} Worker</div>
                             <div className="flex items-center gap-2">{deepScan.serviceWorker ? <CheckC/> : <XC/>} Service</div>
                             <div className="flex items-center gap-2">{deepScan.indexedDB ? <CheckC/> : <XC/>} IdxDB</div>
                             <div className="flex items-center gap-2">{deepScan.localStorage ? <CheckC/> : <XC/>} Local</div>
                         </div>
                     </div>
                 </div>
            </div>

          </div>

          {/* RIGHT: TOOLS */}
          <div className="flex flex-col gap-6">
             <div className={`border-2 p-6 ${darkMode ? 'bg-red-900/20 border-red-500' : 'bg-red-50 border-black'}`}>
              <h3 className="font-black uppercase text-red-600 text-xl mb-2 flex items-center gap-2"><AlertOctagon /> Emergency</h3>
              <Button onClick={triggerLockdown} variant="danger" className="w-full py-4 text-lg">TRIGGER LOCKDOWN</Button>
            </div>

            <div className={`border-2 p-6 ${darkMode ? 'bg-gray-800 border-white' : 'bg-white border-black'}`}>
              <h3 className="font-black uppercase mb-4 flex items-center gap-2"><FileText /> Trap File</h3>
              <Button onClick={downloadHoneyfile} variant="secondary" className="w-full text-xs">Generate Honeyfile</Button>
            </div>
            
            <div className={`border-2 p-6 ${darkMode ? 'bg-gray-800 border-white' : 'bg-gray-50 border-black'}`}>
              <h3 className="font-black uppercase mb-4 text-sm tracking-widest text-gray-500">Quick Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                  {/* EXISTING TOOLS */}
                  <Button onClick={clearClipboard} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto"><Scissors size={20} className="mb-1"/> Wipe</Button>
                  <Button onClick={poisonClipboard} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto text-orange-600"><AlertOctagon size={20} className="mb-1"/> Poison</Button>
                  <Button onClick={toggleFullScreen} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto"><Maximize size={20} className="mb-1"/> Focus</Button>
                  <Button onClick={() => navigate('/tools/file-encrypt')} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto"><Lock size={20} className="mb-1"/> Encrypt</Button>
                  <Button onClick={() => navigate('/tools/ip-lookup')} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto"><Eye size={20} className="mb-1"/> IP Scan</Button>
                  <Button onClick={testVibration} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto"><Smartphone size={20} className="mb-1"/> Vibrate</Button>
                  <Button onClick={testNetworkSpeed} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto"><Wifi size={20} className="mb-1"/> Speed: {speed}</Button>
                  <Button onClick={checkWebRTCLeak} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto"><WifiOff size={20} className="mb-1"/> WebRTC: {localIP}</Button>
                  
                  {/* NEW 5+ TOOLS */}
                  <Button onClick={toggleStealth} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto text-purple-600"><Ghost size={20} className="mb-1"/> Stealth</Button>
                  <Button onClick={toggleWakeLock} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto text-yellow-600"><Anchor size={20} className="mb-1"/> {wakeLockObj ? 'Unlock' : 'WakeLock'}</Button>
                  <Button onClick={pingNetwork} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto text-blue-500"><Pulse size={20} className="mb-1"/> Ping: {latency}</Button>
                  <Button onClick={stressMemory} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto text-red-500"><Database size={20} className="mb-1"/> MemTest</Button>
                  <Button onClick={() => alert(`Compass: ${orientation}`)} variant="secondary" className="text-xs flex flex-col items-center py-4 h-auto text-indigo-500"><Compass size={20} className="mb-1"/> {orientation}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckC = () => <span className="text-green-500 font-bold">[ON]</span>;
const XC = () => <span className="text-red-500 font-bold">[OFF]</span>;

export default Dashboard;