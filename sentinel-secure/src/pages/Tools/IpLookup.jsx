import React, { useState, useEffect } from 'react';
import { Globe, MapPin, Server } from 'lucide-react';

const IpLookup = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Globe size={40} className="text-blue-600" /> Public IP Intel
      </h1>
      
      {loading ? (
        <div className="text-2xl font-black animate-pulse text-gray-400">CONNECTING TO SATELLITE...</div>
      ) : data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-black text-white p-8 border-2 border-black neo-shadow flex flex-col justify-center">
              <h2 className="text-5xl font-black mb-2 break-all">{data.ip}</h2>
              <p className="font-mono text-gray-400 uppercase tracking-widest">{data.org}</p>
           </div>
           
           <div className="bg-white border-2 border-black p-8 space-y-6 neo-shadow">
              <div className="flex items-start gap-4">
                 <MapPin className="text-red-600 mt-1" size={24}/>
                 <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Geolocation</div>
                    <div className="text-2xl font-black">{data.city}, {data.region}</div>
                    <div className="text-lg text-gray-600">{data.country_name}</div>
                 </div>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex items-start gap-4">
                 <Server className="text-green-600 mt-1" size={24}/>
                 <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Network ASN</div>
                    <div className="text-xl font-black">{data.asn}</div>
                    <div className="text-sm font-mono text-gray-500">{data.postal} / {data.currency}</div>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <div className="p-8 border-2 border-red-500 bg-red-50 text-red-700 font-bold">
            Failed to load IP data. Your Adblocker might be blocking the API request.
        </div>
      )}
    </div>
  );
};
export default IpLookup;