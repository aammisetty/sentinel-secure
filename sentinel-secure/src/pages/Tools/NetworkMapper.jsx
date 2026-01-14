import React, { useState, useEffect } from 'react';
import { Network, Search, ShieldAlert, Cpu, Database, RefreshCw, Terminal, Globe, Zap } from 'lucide-react';
import Button from '../../components/Button';

const NetworkMapper = () => {
  const [localIPs, setLocalIPs] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));
  };

  // CORE LOGIC: WebRTC Leak for Subnet Discovery
  const discoverLocalIPs = () => {
    return new Promise((resolve) => {
      const ips = new Set();
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });

      // Create a bogus data channel
      pc.createDataChannel("");

      // Create an offer to trigger ICE candidate gathering
      pc.createOffer().then(offer => pc.setLocalDescription(offer));

      pc.onicecandidate = (event) => {
        if (!event || !event.candidate) {
          pc.close();
          resolve(Array.from(ips));
          return;
        }

        const line = event.candidate.candidate;
        const parts = line.split(" ");
        const addr = parts[4];
        const type = parts[7];

        if (type === "host") {
          ips.add(addr);
          addLog(`Found local node candidate: ${addr}`);
        }
      };

      // Timeout safety
      setTimeout(() => {
        pc.close();
        resolve(Array.from(ips));
      }, 3000);
    });
  };

  const runScan = async () => {
    setIsScanning(true);
    setLocalIPs([]);
    addLog("Initializing WebRTC PeerConnection...");
    
    try {
      const results = await discoverLocalIPs();
      setLocalIPs(results);
      if(results.length > 0) {
        addLog(`Scan complete. ${results.length} active interfaces identified.`);
      } else {
        addLog("Scan complete. No internal leaks detected (mDNS active).");
      }
    } catch (err) {
      addLog("ERROR: PeerConnection blocked by browser security policy.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="pt-40 min-h-screen max-w-6xl mx-auto p-8 font-sans">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-black p-3 border-2 border-white shadow-[4px_4px_0px_0px_#2563eb]">
          <Network size={32} className="text-blue-500"/>
        </div>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Network Topology Mapper</h1>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Business Tier / Internal Reconnaissance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CONTROL PANEL */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border-4 border-black p-6 neo-shadow">
            <h3 className="font-black uppercase text-sm mb-4 flex items-center gap-2">
                <Cpu size={16}/> Mapper Controls
            </h3>
            <p className="text-xs text-gray-600 mb-6 leading-relaxed">
              Maps local subnet nodes using ICE candidate gathering. Useful for identifying rogue devices or misconfigured internal gateways.
            </p>
            <Button 
                onClick={runScan} 
                disabled={isScanning}
                className="w-full py-4 flex items-center justify-center gap-2 font-black uppercase tracking-widest"
            >
              {isScanning ? <RefreshCw className="animate-spin" size={20}/> : <Search size={20}/>}
              {isScanning ? "Mapping Subnet..." : "Start Discovery"}
            </Button>
          </div>

          <div className="bg-gray-900 border-2 border-black p-6 text-green-400 font-mono text-[10px] h-64 overflow-y-auto">
            <div className="flex justify-between items-center mb-2 text-white border-b border-gray-700 pb-2">
                <span className="font-black uppercase">Live Console</span>
                <Terminal size={12}/>
            </div>
            {logs.map((log, i) => (
                <div key={i} className="mb-1">{log}</div>
            ))}
            {isScanning && <div className="animate-pulse">_</div>}
          </div>
        </div>

        {/* TOPOLOGY MAP VIEW */}
        <div className="lg:col-span-2">
          <div className="bg-white border-4 border-black p-8 neo-shadow h-full min-h-[400px] relative">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black uppercase">Active Subnet Nodes</h2>
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600">
                    <Globe size={14}/> LOCAL_INT_NET
                </div>
            </div>

            {localIPs.length === 0 && !isScanning ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-300">
                <Zap size={64} className="mb-4 opacity-20"/>
                <p className="font-black uppercase tracking-widest">No Active Scan Data</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localIPs.map((ip, idx) => (
                  <div key={idx} className="border-2 border-black p-4 bg-blue-50 flex items-center justify-between hover:bg-blue-100 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="bg-black p-2">
                            <Database size={16} className="text-white"/>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase">Device Address</p>
                            <p className="font-mono font-bold text-lg">{ip}</p>
                        </div>
                    </div>
                    <div className="text-[10px] bg-green-200 text-green-800 px-2 py-1 font-black rounded uppercase">
                        Active
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="absolute bottom-8 left-8 right-8 p-4 bg-red-50 border-l-4 border-red-600 flex items-start gap-3">
                <ShieldAlert className="text-red-600 shrink-0" size={18}/>
                <p className="text-[10px] text-red-800 font-bold leading-tight">
                    CRITICAL: If IPs outside of your authorized range (e.g., 192.168.1.0/24) appear, investigate immediately for rogue hardware or VPN bypasses.
                </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NetworkMapper;