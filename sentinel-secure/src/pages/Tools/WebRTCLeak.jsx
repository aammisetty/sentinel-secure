import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { Network, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

const WebRTCLeak = () => {
  const [ips, setIps] = useState([]);
  const [status, setStatus] = useState('Scanning...');

  useEffect(() => {
    // REAL LOGIC: WebRTC Peer Connection Trick
    const rtc = new RTCPeerConnection({ iceServers: [] });
    rtc.createDataChannel('');
    
    rtc.onicecandidate = (e) => {
      if (!e.candidate) return;
      const parts = e.candidate.candidate.split(' ');
      const ip = parts[4];
      if (ip && !ips.includes(ip) && ip.indexOf('.') > -1) {
        setIps(prev => [...prev, ip]);
      }
    };

    rtc.createOffer().then(o => rtc.setLocalDescription(o));
    
    setTimeout(() => setStatus('Scan Complete'), 3000);
  }, []);

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Network size={40} className="text-red-600" /> WebRTC Leak Test
      </h1>
      
      <div className="bg-white border-2 border-black p-8 neo-shadow">
         <div className="flex items-center gap-2 mb-6">
            <div className={`w-3 h-3 rounded-full ${status === 'Scanning...' ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="font-mono uppercase font-bold">{status}</span>
         </div>

         {ips.length > 0 ? (
             <div className="p-6 bg-red-50 border-2 border-red-500">
                 <h3 className="text-xl font-black text-red-700 mb-4 flex items-center gap-2">
                    <AlertTriangle/> LEAK DETECTED
                 </h3>
                 <p className="mb-4">Your browser is leaking your Local LAN IP address via WebRTC.</p>
                 <div className="space-y-2">
                    {ips.map((ip, i) => (
                        <div key={i} className="font-mono text-2xl font-bold bg-white border border-red-200 p-2 inline-block mr-4">
                            {ip}
                        </div>
                    ))}
                 </div>
             </div>
         ) : (
             <div className="p-6 bg-green-50 border-2 border-green-500 flex items-center gap-4">
                 <CheckCircle className="text-green-600" size={32}/>
                 <div>
                     <h3 className="text-xl font-black text-green-800">No Leaks Found</h3>
                     <p>Your browser is obfuscating your local IP correctly (mDNS is active).</p>
                 </div>
             </div>
         )}

         <p className="mt-8 text-sm text-gray-500">
            *WebRTC leaks occur when browsers reveal your local LAN IP (e.g. 192.168.x.x) to websites, potentially identifying devices behind a VPN.
         </p>
      </div>
    </div>
  );
};
export default WebRTCLeak;