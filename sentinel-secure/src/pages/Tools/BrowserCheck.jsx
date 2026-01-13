import React, { useEffect, useState } from 'react';
import { getBrowserFingerprint } from '../../utils/cryptoLogic';
import { Monitor } from 'lucide-react';

const BrowserCheck = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    setInfo(getBrowserFingerprint());
  }, []);

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Monitor size={40} className="text-red-600" /> Browser Fingerprint
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {info && Object.entries(info).map(([key, val]) => (
          <div key={key} className="p-6 border-2 border-black bg-white hover:bg-yellow-50 transition-colors">
             <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">{key}</h3>
             <p className="font-mono text-lg font-black break-words">{val.toString()}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-500 font-mono">
        *This data is read from your navigator object. It is what websites see when you visit them.
      </p>
    </div>
  );
};
export default BrowserCheck;