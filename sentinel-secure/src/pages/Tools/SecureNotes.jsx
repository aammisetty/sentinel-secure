import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { Lock, Trash, Save } from 'lucide-react';

const SecureNotes = () => {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('sentinel_vault');
    if (data) setNote(atob(data)); // Base64 decode (Demo obfuscation)
  }, []);

  const save = () => {
    localStorage.setItem('sentinel_vault', btoa(note)); // Base64 encode
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clear = () => {
    if(confirm('Delete all notes?')) {
        localStorage.removeItem('sentinel_vault');
        setNote('');
    }
  };

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Lock size={40} className="text-green-600" /> Local Vault
      </h1>
      <p className="mb-6 text-gray-600">
          Data is stored in your browser's <code>localStorage</code>. It does not leave your device. 
          Use this for temporary storage of sensitive keys or configs.
      </p>
      
      <textarea 
        className="w-full h-64 p-6 border-2 border-black font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all bg-yellow-50"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="// Enter sensitive notes here..."
      ></textarea>
      
      <div className="flex gap-4 mt-6">
        <Button onClick={save} className="flex-1 bg-green-500 hover:bg-green-600 border-black text-white">
           <Save className="mr-2"/> {saved ? 'SAVED!' : 'SAVE TO BROWSER'}
        </Button>
        <Button onClick={clear} variant="danger" className="flex-none px-6">
           <Trash />
        </Button>
      </div>
    </div>
  );
};
export default SecureNotes;