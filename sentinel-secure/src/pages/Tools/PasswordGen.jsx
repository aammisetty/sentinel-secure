import React, { useState } from 'react';
import Button from '../../components/Button';
import { generateSecurePassword } from '../../utils/cryptoLogic';
import { Copy, RefreshCw, Key } from 'lucide-react';

const PasswordGen = () => {
  const [pass, setPass] = useState('');
  const [len, setLen] = useState(16);

  const gen = () => setPass(generateSecurePassword(len));

  const copy = () => {
    navigator.clipboard.writeText(pass);
    alert("Copied to clipboard!");
  };

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Key size={40} className="text-blue-600" /> CSPRNG Password Generator
      </h1>
      <div className="bg-gray-50 border-2 border-black p-8 neo-shadow">
        <p className="mb-6 font-mono text-gray-600 text-sm">
          Cryptographically secure randomness using <code>window.crypto.getRandomValues</code>.
        </p>
        
        <div className="bg-white border-2 border-black p-6 mb-8 flex items-center justify-between">
            <span className="font-mono text-2xl break-all font-bold">{pass || 'CLICK GENERATE'}</span>
            <button onClick={copy} className="p-2 hover:bg-gray-100 rounded border-2 border-black active:translate-y-1 transition-all"><Copy/></button>
        </div>

        <div className="flex items-center gap-4 mb-8">
           <label className="font-bold uppercase w-24">Length: {len}</label>
           <input 
             type="range" min="8" max="64" value={len} 
             onChange={(e) => setLen(parseInt(e.target.value))}
             className="w-full accent-black h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
           />
        </div>

        <Button onClick={gen} className="w-full text-lg">
           <RefreshCw className="mr-2"/> Generate Secure Password
        </Button>
      </div>
    </div>
  );
};
export default PasswordGen;