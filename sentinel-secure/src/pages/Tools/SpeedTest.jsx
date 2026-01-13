import React, { useState } from 'react';
import Button from '../../components/Button';
import { checkNetworkSpeed } from '../../utils/cryptoLogic';
import { Wifi, Activity } from 'lucide-react';

const SpeedTest = () => {
  const [latency, setLatency] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    setLatency(null);
    const ms = await checkNetworkSpeed();
    setTimeout(() => {
        setLatency(ms);
        setLoading(false);
    }, 800); // UI feel
  };

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Wifi size={40} className="text-blue-600" /> Network Latency
      </h1>
      
      <div className="border-2 border-black p-12 text-center bg-gray-50 neo-shadow">
         {loading ? (
             <div className="flex flex-col items-center justify-center h-40">
                 <Activity className="animate-spin mb-4 text-blue-600" size={48} />
                 <div className="text-xl font-black animate-pulse text-gray-500">PINGING GOOGLE CDN...</div>
             </div>
         ) : latency ? (
             <div className="h-40 flex flex-col items-center justify-center">
                 <div className="text-8xl font-black mb-2">{latency} <span className="text-2xl text-gray-500">ms</span></div>
                 <p className="font-bold uppercase text-green-600 bg-green-100 px-3 py-1 border border-green-300 rounded">Connection Active</p>
             </div>
         ) : (
             <div className="h-40 flex flex-col items-center justify-center text-gray-400 font-bold uppercase">
                 Ready to Test
             </div>
         )}
      </div>

      <Button onClick={runTest} className="w-full mt-8 text-xl py-6">START LATENCY TEST</Button>
    </div>
  );
};
export default SpeedTest;