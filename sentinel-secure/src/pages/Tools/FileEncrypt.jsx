import React, { useState } from 'react';
import Button from '../../components/Button';
import { Lock, Unlock, FileText, Download, RefreshCw, ShieldCheck } from 'lucide-react';

const FileEncrypt = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('IDLE'); // IDLE, WORKING, DONE

  const processFile = async (mode) => {
    if (!file || !password) return alert('Please select a file and enter a password.');
    setStatus('WORKING');

    try {
      const enc = new TextEncoder();
      const fileBuffer = await file.arrayBuffer();

      if (mode === 'ENCRYPT') {
        // 1. Generate unique salt and IV for this specific session
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const iv = window.crypto.getRandomValues(new Uint8Array(12));

        // 2. Derive Key (PBKDF2)
        const keyMaterial = await window.crypto.subtle.importKey(
          "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
        );
        const key = await window.crypto.subtle.deriveKey(
          { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
          keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt"]
        );

        // 3. Encrypt data
        const ciphertext = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, fileBuffer);

        // 4. Package [SALT (16 bytes) + IV (12 bytes) + CIPHERTEXT] for portability
        const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(ciphertext), salt.length + iv.length);

        const blob = new Blob([combined], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.name}.sentinel`;
        a.click();
      } else {
        // 1. Extract Salt, IV, and Data from the .sentinel file
        const fullArray = new Uint8Array(fileBuffer);
        const salt = fullArray.slice(0, 16);
        const iv = fullArray.slice(16, 28);
        const data = fullArray.slice(28);

        // 2. Re-derive Key using extracted salt
        const keyMaterial = await window.crypto.subtle.importKey(
          "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
        );
        const key = await window.crypto.subtle.deriveKey(
          { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
          keyMaterial, { name: "AES-GCM", length: 256 }, false, ["decrypt"]
        );

        // 3. Decrypt
        const resultBuffer = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);

        const blob = new Blob([resultBuffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name.replace('.sentinel', '');
        a.click();
      }

      setStatus('DONE');
    } catch (e) {
      console.error(e);
      alert('Operation failed. Possible causes: Wrong password, corrupted file, or not a valid .sentinel container.');
      setStatus('IDLE');
    }
  };

  return (
    <div className="pt-40 min-h-screen max-w-4xl mx-auto p-8 font-sans no-print">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Lock size={40} className="text-blue-600" /> AES-256 File Vault
      </h1>
      
      <div className="bg-gray-50 border-2 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
        <p className="mb-6 text-gray-600 font-bold uppercase text-xs tracking-widest">
          Military-grade local encryption. Your data never leaves your browser.
        </p>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-black p-8 text-center bg-white transition-colors hover:bg-blue-50">
             <input 
               type="file" 
               onChange={(e) => { setFile(e.target.files[0]); setStatus('IDLE'); }} 
               className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-xs file:font-black file:uppercase file:bg-black file:text-white cursor-pointer"
             />
             {file && <p className="mt-4 font-black text-blue-600 uppercase text-xs">Target: {file.name} ({(file.size/1024).toFixed(1)} KB)</p>}
          </div>

          <div>
             <label className="block font-black uppercase text-xs mb-2 tracking-tighter">Vault Access Password</label>
             <input 
               type="password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full p-4 border-2 border-black focus:bg-blue-50 outline-none font-mono"
               placeholder="Minimum 12 characters recommended..."
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Button onClick={() => processFile('ENCRYPT')} disabled={status === 'WORKING'} className="py-4">
               {status === 'WORKING' ? <RefreshCw className="animate-spin mr-2"/> : <Lock size={18} className="mr-2"/>} Secure File
             </Button>
             <Button onClick={() => processFile('DECRYPT')} variant="secondary" disabled={status === 'WORKING'} className="py-4">
               {status === 'WORKING' ? <RefreshCw className="animate-spin mr-2"/> : <Unlock size={18} className="mr-2"/>} Unlock .sentinel
             </Button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-black flex items-center gap-4 text-[10px] font-mono text-gray-500 uppercase">
          <ShieldCheck size={16} className="text-green-600"/> PBKDF2 Iterations: 100,000 | Mode: GCM | Cipher: 256-bit
        </div>
      </div>
    </div>
  );
};

export default FileEncrypt;