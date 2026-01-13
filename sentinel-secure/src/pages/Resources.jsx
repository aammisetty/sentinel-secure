import React from 'react';
import { Download, FileText } from 'lucide-react';
import Button from '../components/Button';

const Resources = () => {
  const downloadWhitepaper = (id) => {
    const text = `SENTINEL SECURE WHITEPAPER VOL-${id}\n\nThis is a generated placeholder for the whitepaper content.\nSecure your infrastructure with local-first policies.`;
    const blob = new Blob([text], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sentinel_Whitepaper_Vol${id}.pdf`; // Spoof PDF extension for demo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-5xl font-black uppercase mb-8">Whitepapers</h1>
      <div className="space-y-4">
          {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-6 border-2 border-black hover:bg-gray-50 neo-shadow transition-all">
                  <div className="flex items-center gap-4">
                      <FileText size={32} className="text-gray-400"/>
                      <div>
                          <h3 className="font-bold text-lg uppercase">The State of Indian Cybersecurity 2026 - Vol {i}</h3>
                          <p className="text-sm text-gray-500 font-mono">PDF • 2.4 MB • Released Jan 2026</p>
                      </div>
                  </div>
                  <Button onClick={() => downloadWhitepaper(i)} variant="secondary" className="px-4 py-2">
                      <Download size={20}/>
                  </Button>
              </div>
          ))}
      </div>
    </div>
  );
};
export default Resources;