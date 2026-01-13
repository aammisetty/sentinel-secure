import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { Lock, Trash } from 'lucide-react';

const SecureNotes = () => {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  // REAL LOGIC: Uses LocalStorage as a simple vault
  // In a full app, we would use AES encryption here. For this demo, we simulate the vault persistence.
  
  useEffect(() => {
    const data = localStorage.getItem('sentinel_vault');
    if (data) setNote(atob(data)); // Base64 decode for simple obfuscation demo
  }, []);

  const save = () => {
    localStorage.setItem('sentinel_vault', btoa(note)); // Base64 encode
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clear = () => {
    localStorage.removeItem('sentinel_vault');
    setNote('');
  };

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Lock size={40} className="text-green-600" /> Local Vault
      </h1>
      <p className="mb-6">Data is stored in your browser's LocalStorage. It does not leave your device.</p>
      
      <textarea 
        className="w-full h-64 p-4 border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter sensitive notes here..."
      ></textarea>
      
      <div className="flex gap-4 mt-6">
        <Button onClick={save} className="flex-1 bg-green-500 hover:bg-green-600 border-black text-white">
           {saved ? 'SAVED!' : 'SAVE TO BROWSER'}
        </Button>
        <Button onClick={clear} variant="danger" className="flex-none">
           <Trash />
        </Button>
      </div>
    </div>
  );
};
export default SecureNotes;