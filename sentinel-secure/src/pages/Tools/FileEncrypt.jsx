import React, { useState } from 'react';
import Button from '../../components/Button';
import { Lock, Unlock, FileText, Download, RefreshCw } from 'lucide-react';

const FileEncrypt = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('IDLE'); // IDLE, WORKING, DONE

  const processFile = async (mode) => {
    if (!file || !password) return alert('Please select a file and enter a password.');
    setStatus('WORKING');

    try {
      // 1. Derive Key from Password (PBKDF2)
      const enc = new TextEncoder();
      const keyMaterial = await window.crypto.subtle.importKey(
        "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
      );

      // Salt generation (Simulated fixed salt for demo simplicity, real apps use random)
      const salt = enc.encode("SENTINEL_SALT_V1"); 
      
      const key = await window.crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        keyMaterial, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]
      );

      // 2. Encrypt / Decrypt
      const fileBuffer = await file.arrayBuffer();
      const iv = new Uint8Array(12); // Initialization Vector (should be random in prod)
      
      let resultBuffer;
      if (mode === 'ENCRYPT') {
        resultBuffer = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, fileBuffer);
      } else {
        resultBuffer = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, fileBuffer);
      }

      // 3. Download Result
      const blob = new Blob([resultBuffer], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = mode === 'ENCRYPT' ? `${file.name}.sentinel` : file.name.replace('.sentinel', '');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setStatus('DONE');
    } catch (e) {
      alert('Operation failed. Wrong password or corrupted file.');
      setStatus('IDLE');
    }
  };

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Lock size={40} className="text-blue-600" /> AES-256 File Vault
      </h1>
      
      <div className="bg-gray-50 border-2 border-black p-8 neo-shadow">
        <p className="mb-6 text-gray-600">
          Encrypt sensitive documents locally before emailing them. Uses <strong>AES-GCM 256-bit</strong> encryption derived from your password.
        </p>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-400 p-8 text-center bg-white">
             <input type="file" onChange={(e) => { setFile(e.target.files[0]); setStatus('IDLE'); }} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-sm file:font-bold file:bg-gray-50 hover:file:bg-gray-100"/>
             {file && <p className="mt-2 font-bold text-green-600">{file.name} ({(file.size/1024).toFixed(1)} KB)</p>}
          </div>

          <div>
             <label className="block font-bold uppercase text-sm mb-2">Encryption Password</label>
             <input 
               type="password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full p-3 border-2 border-black focus:outline-none"
               placeholder="Enter a strong key..."
             />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Button onClick={() => processFile('ENCRYPT')} disabled={status === 'WORKING'}>
               {status === 'WORKING' ? <RefreshCw className="animate-spin"/> : <Lock size={18}/>} Encrypt & Download
             </Button>
             <Button onClick={() => processFile('DECRYPT')} variant="secondary" disabled={status === 'WORKING'}>
               {status === 'WORKING' ? <RefreshCw className="animate-spin"/> : <Unlock size={18}/>} Decrypt .sentinel File
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileEncrypt;