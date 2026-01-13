import React, { useState } from 'react';
import Button from '../../components/Button';
import { ShieldAlert, CheckCircle, Search, AlertTriangle } from 'lucide-react';

const PhishingDetector = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const checkUrl = () => {
    let score = 0;
    let flags = [];
    const lower = url.toLowerCase();
    
    // Heuristic Logic
    if (/^http:\/\/\d+\.\d+\.\d+\.\d+/.test(lower)) { score += 30; flags.push("Uses Raw IP Address (High Risk)"); }
    if (url.length > 75) { score += 10; flags.push("Suspiciously Long URL"); }
    if (url.includes('@')) { score += 40; flags.push("Contains '@' symbol (Credential Harvesting)"); }
    if (url.lastIndexOf('//') > 7) { score += 20; flags.push("Unusual Double Slash Position"); }
    if (/\.(xyz|top|work|loan|tk|ml|ga)$/.test(lower)) { score += 15; flags.push("High-Risk TLD Detected"); }
    if (lower.includes('login') || lower.includes('secure') || lower.includes('account')) { 
        if(!lower.startsWith('https')) { score += 20; flags.push("Sensitive keyword without HTTPS"); }
    }

    setResult({ score, flags });
  };

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <ShieldAlert size={40} className="text-red-600" /> Phishing Link Analyzer
      </h1>

      <div className="bg-gray-50 border-2 border-black p-8 neo-shadow">
         <p className="mb-6 text-gray-600">Enter a URL to scan for common phishing heuristics (Typosquatting, IP usage, etc).</p>
         
         <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input 
               className="flex-grow p-4 border-2 border-black font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000]"
               placeholder="http://login.bank-secure-update.com"
               value={url}
               onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={checkUrl} className="px-8"><Search className="mr-2"/> SCAN URL</Button>
         </div>

         {result && (
             <div className={`p-8 border-2 border-black ${result.score > 20 ? 'bg-red-100' : 'bg-green-100'} animate-in fade-in`}>
                 <div className="flex items-center gap-4 mb-4">
                     {result.score > 20 ? <AlertTriangle size={40} className="text-red-600"/> : <CheckCircle size={40} className="text-green-600"/>}
                     <div>
                        <h2 className="text-3xl font-black uppercase">
                            {result.score > 20 ? 'SUSPICIOUS' : 'LIKELY SAFE'}
                        </h2>
                        <p className="font-bold text-gray-700">Risk Score: {result.score}/100</p>
                     </div>
                 </div>
                 
                 {result.flags.length > 0 ? (
                     <div className="bg-white border-2 border-black p-4 mt-4">
                         <p className="font-bold uppercase text-xs text-gray-500 mb-2">Flags Detected</p>
                         <ul className="list-disc pl-6 space-y-2">
                             {result.flags.map((f, i) => <li key={i} className="font-medium text-red-800">{f}</li>)}
                         </ul>
                     </div>
                 ) : (
                     <div className="text-green-800 font-bold mt-2">
                         No heuristic flags detected. Always verify the source manually.
                     </div>
                 )}
             </div>
         )}
      </div>
    </div>
  );
};
export default PhishingDetector;