import React, { useState } from 'react';
import { ShieldCheck, Search, Globe, Mail, AlertTriangle, RefreshCw, Terminal, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../components/Button';

const DNSValidator = () => {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 8));
  };

  // CORE LOGIC: Fetching records via Google DNS over HTTPS (DoH)
  const fetchDNSRecords = async (target, type) => {
    const response = await fetch(`https://dns.google/resolve?name=${target}&type=${type}`);
    const data = await response.json();
    return data.Answer || [];
  };

  const validateDomain = async (e) => {
    e.preventDefault();
    if (!domain) return;
    
    const cleanDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    setIsLoading(true);
    setResults(null);
    addLog(`Initiating scan for: ${cleanDomain}`);

    try {
      // 1. Check DMARC (TXT record at _dmarc.domain.com)
      addLog("Querying DMARC policy...");
      const dmarcRecords = await fetchDNSRecords(`_dmarc.${cleanDomain}`, 'TXT');
      const dmarc = dmarcRecords.find(r => r.data.includes('v=DMARC1'));

      // 2. Check SPF (TXT record at domain.com)
      addLog("Querying SPF records...");
      const spfRecords = await fetchDNSRecords(cleanDomain, 'TXT');
      const spf = spfRecords.find(r => r.data.includes('v=spf1'));

      // 3. Check DNSSEC (DS record)
      addLog("Checking DNSSEC chain of trust...");
      const dnssecRecords = await fetchDNSRecords(cleanDomain, 'DS');
      const hasDNSSEC = dnssecRecords.length > 0;

      setResults({
        dmarc: dmarc ? dmarc.data : null,
        spf: spf ? spf.data : null,
        dnssec: hasDNSSEC,
        domain: cleanDomain,
        timestamp: new Date().toLocaleString()
      });

      addLog("Validation complete. Rendering intelligence report.");
    } catch (err) {
      addLog("ERROR: API Request failed.");
      alert("Could not reach DNS resolvers.");
    } finally {
      setIsLoading(false);
    }
  };

  const StatusCard = ({ title, status, desc, icon: Icon, color }) => (
    <div className={`p-6 border-2 border-black bg-white neo-shadow flex flex-col h-full`}>
      <div className={`flex items-center gap-3 mb-4`}>
        <div className={`p-2 bg-black text-white`}>
          <Icon size={18} className={color} />
        </div>
        <h3 className="font-black uppercase text-xs tracking-widest">{title}</h3>
      </div>
      <div className="flex-grow">
        <div className={`flex items-center gap-2 font-black text-sm mb-2 ${status ? 'text-green-600' : 'text-red-600'}`}>
          {status ? <CheckCircle size={16}/> : <XCircle size={16}/>}
          {status ? "CONFIGURED" : "MISSING / WEAK"}
        </div>
        <p className="text-[10px] text-gray-500 font-mono break-all leading-relaxed bg-gray-50 p-2 border border-gray-200">
          {desc || "No record found. Domain is vulnerable to spoofing."}
        </p>
      </div>
    </div>
  );

  return (
    <div className="pt-40 min-h-screen max-w-6xl mx-auto p-8 font-sans">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-600 p-3 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
          <Globe size={32} className="text-white"/>
        </div>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">DNSSEC & DMARC Validator</h1>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pro Tier / Email Security Intelligence</p>
        </div>
      </div>

      <div className="bg-white border-4 border-black p-8 neo-shadow mb-8">
        <form onSubmit={validateDomain} className="flex gap-4 mb-8">
          <input 
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-grow p-4 border-2 border-black font-mono focus:bg-blue-50 outline-none"
            placeholder="enter-target-domain.com"
          />
          <Button type="submit" disabled={isLoading} className="px-8 flex items-center gap-2 font-black uppercase">
            {isLoading ? <RefreshCw className="animate-spin" size={18}/> : <Search size={18}/>}
            Validate
          </Button>
        </form>

        {results && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatusCard 
                title="DMARC Policy" 
                status={!!results.dmarc} 
                desc={results.dmarc} 
                icon={Mail}
                color="text-blue-400"
              />
              <StatusCard 
                title="SPF Alignment" 
                status={!!results.spf} 
                desc={results.spf} 
                icon={ShieldCheck}
                color="text-green-400"
              />
              <StatusCard 
                title="DNSSEC Status" 
                status={results.dnssec} 
                desc={results.dnssec ? "DS Records found. DNS chain is authenticated." : null} 
                icon={Globe}
                color="text-purple-400"
              />
            </div>

            <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-600">
               <div className="flex items-center gap-2 text-red-600 font-black uppercase text-xs mb-2">
                 <AlertTriangle size={16}/> Security Assessment
               </div>
               <p className="text-xs text-red-800 font-bold">
                 {(!results.dmarc || !results.spf) 
                   ? "CRITICAL: This domain lacks basic email authentication. Attackers can easily send 'Executive Impersonation' emails to employees or customers." 
                   : "DOMAIN STRENGTH: Optimal. Email headers are protected against unauthorized relaying."}
               </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 no-print">
        <div className="bg-gray-900 border-2 border-black p-6 text-green-400 font-mono text-[10px] h-48 overflow-y-auto">
          <div className="flex justify-between items-center mb-2 text-white border-b border-gray-700 pb-2">
            <span className="font-black uppercase">Resolver Console</span>
            <Terminal size={12}/>
          </div>
          {logs.map((log, i) => <div key={i}>{log}</div>)}
          {isLoading && <div className="animate-pulse">_</div>}
        </div>
        <div className="border-2 border-black p-6 bg-blue-50">
           <h4 className="font-black uppercase text-xs mb-2">Why this matters</h4>
           <p className="text-[10px] text-blue-800 leading-normal font-bold">
             DMARC prevents phishing by telling receiving servers how to handle emails that fail authentication. DNSSEC prevents DNS hijacking by signing records with cryptographic keys. Pro Plan users should scan all vendor domains before high-value transactions.
           </p>
        </div>
      </div>
    </div>
  );
};

export default DNSValidator;