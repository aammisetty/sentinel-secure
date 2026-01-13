import React, { useState } from 'react';
import Button from '../../components/Button';
import { checkNetworkSpeed } from '../../utils/cryptoLogic';
import { Wifi } from 'lucide-react';

const SpeedTest = () => {
  const [latency, setLatency] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    setLoading(true);
    setLatency(null);
    const ms = await checkNetworkSpeed();
    // Simulate slight delay for "feeling"
    setTimeout(() => {
        setLatency(ms);
        setLoading(false);
    }, 500);
  };

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Wifi size={40} className="text-blue-600" /> Network Latency
      </h1>
      
      <div className="border-2 border-black p-12 text-center bg-gray-50">
         {loading ? (
             <div className="text-4xl font-black animate-pulse text-gray-400">PINGING...</div>
         ) : latency ? (
             <div>
                 <div className="text-8xl font-black mb-2">{latency} <span className="text-2xl text-gray-500">ms</span></div>
                 <p className="font-bold uppercase text-green-600">Connection Active</p>
             </div>
         ) : (
             <div className="text-gray-400 font-bold uppercase">Ready to Test</div>
         )}
      </div>

      <Button onClick={runTest} className="w-full mt-8 text-xl py-6">RUN TEST</Button>
    </div>
  );
};
export default SpeedTest;