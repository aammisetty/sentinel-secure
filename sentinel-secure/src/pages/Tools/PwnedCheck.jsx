import React, { useState } from 'react';
import { ShieldAlert, Search, ShieldCheck, Lock, AlertTriangle, RefreshCw, Hash } from 'lucide-react';
import Button from '../../components/Button';

const PwnedCheck = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Core Logic: SHA-1 Hashing for k-Anonymity
  const sha1 = async (str) => {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join('');
  };

  const checkPwned = async (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    setResult(null);

    try {
      const fullHash = await sha1(input);
      const prefix = fullHash.substring(0, 5);
      const suffix = fullHash.substring(5);

      // Fetch only partial hashes (k-Anonymity)
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      if (!response.ok) throw new Error('API unreachable');
      
      const data = await response.text();
      const lines = data.split('\n');

      // Locally match the suffix
      let count = 0;
      const match = lines.find(line => line.split(':')[0] === suffix);
      
      if (match) {
        count = parseInt(match.split(':')[1]);
      }

      setResult({
        pwned: count > 0,
        count: count,
        prefix: prefix,
        timestamp: new Date().toLocaleTimeString()
      });

    } catch (err) {
      alert("Verification failed. Check network connectivity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-40 min-h-screen max-w-4xl mx-auto p-8 font-sans">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-red-600 p-3 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <ShieldAlert size={32} className="text-white"/>
        </div>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Dark Web Breach Check</h1>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Business Intelligence Module</p>
        </div>
      </div>

      <div className="bg-white border-4 border-black p-8 neo-shadow mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
          <div className="flex items-center gap-2 mb-1 text-blue-800 font-black uppercase text-xs">
            <Lock size={14}/> Privacy Architecture: k-Anonymity
          </div>
          <p className="text-xs text-blue-700 leading-relaxed">
            Your password is never sent to the server. We generate a SHA-1 hash and only send the first 5 characters. The comparison happens entirely on your local CPU.
          </p>
        </div>

        <form onSubmit={checkPwned} className="space-y-6">
          <div>
            <label className="block font-black uppercase text-xs mb-2">Check Password / String Strength</label>
            <div className="flex gap-4">
              <input 
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow p-4 border-2 border-black font-mono focus:bg-red-50 outline-none"
                placeholder="Enter string to verify against 10B+ leaked records..."
              />
              <Button type="submit" disabled={loading} className="px-8 flex items-center gap-2 font-black uppercase">
                {loading ? <RefreshCw className="animate-spin" size={18}/> : <Search size={18}/>}
                Analyze
              </Button>
            </div>
          </div>
        </form>

        {result && (
          <div className={`mt-12 border-4 p-8 transition-all animate-in fade-in slide-in-from-bottom-4 ${result.pwned ? 'bg-red-50 border-red-600' : 'bg-green-50 border-green-600'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-2xl font-black uppercase ${result.pwned ? 'text-red-600' : 'text-green-600'}`}>
                {result.pwned ? 'Breach Detected' : 'No Direct Matches'}
              </h3>
              {result.pwned ? <AlertTriangle size={32} className="text-red-600"/> : <ShieldCheck size={32} className="text-green-600"/>}
            </div>
            
            <p className="font-bold text-sm mb-6">
              {result.pwned 
                ? `This string was found ${result.count.toLocaleString()} times in known data breaches. It is highly compromised and must not be used.`
                : `This string does not appear in known public data breaches indexed by the HIBP database.`}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 border border-black/10 p-3 font-mono text-[10px]">
                <p className="text-gray-400 uppercase font-black mb-1">Hash Fragment (k-Anon)</p>
                <p className="font-bold text-black">{result.prefix}****</p>
              </div>
              <div className="bg-white/50 border border-black/10 p-3 font-mono text-[10px]">
                <p className="text-gray-400 uppercase font-black mb-1">Audit Timestamp</p>
                <p className="font-bold text-black">{result.timestamp}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 no-print">
        <div className="border-2 border-black p-6 bg-gray-900 text-green-400 font-mono text-[10px] leading-relaxed">
          <div className="flex items-center gap-2 text-white mb-2 uppercase font-black">
            <Hash size={12}/> Forensics Terminal
          </div>
          &gt; HASH_METHOD: SHA-1_OPENSSL_COMPATIBLE <br/>
          &gt; REMOTE_CALL: HIBP_RANGE_API_V3 <br/>
          &gt; RESULT_SET: LOCAL_MAP_INTERSECTION <br/>
          &gt; STATUS: {loading ? 'SCANNING_DARKNET...' : 'IDLE'}
        </div>
        <div className="border-2 border-black p-6 bg-yellow-50">
           <h4 className="font-black uppercase text-xs mb-2">Corporate Advice</h4>
           <p className="text-[10px] text-yellow-800 leading-normal">
             If a match is found, immediately rotate credentials across all corporate domains. Compromised passwords are the #1 entry vector for ransomware payloads.
           </p>
        </div>
      </div>
    </div>
  );
};

export default PwnedCheck;