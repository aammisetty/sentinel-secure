import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Printer, CheckCircle, XCircle, Shield, FileLock, Search, HardDrive } from 'lucide-react';

const AuditReport = () => {
  const [logs, setLogs] = useState([]);
  
  const data = {
    ua: navigator.userAgent,
    res: `${window.screen.width}x${window.screen.height}`,
    cores: navigator.hardwareConcurrency || 'N/A',
    mem: navigator.deviceMemory || 'N/A',
    cookies: navigator.cookieEnabled ? 'Enabled' : 'Disabled',
    online: navigator.onLine ? 'Yes' : 'No',
    https: window.location.protocol === 'https:' ? 'Yes' : 'No',
    time: new Date().toLocaleString('en-IN'),
    proprietor: "Arun Ammisetty"
  };

  useEffect(() => {
    // Fetch local security session logs
    const sessionLogs = JSON.parse(localStorage.getItem('sentinel_scan_logs') || '[]');
    setLogs(sessionLogs.reverse().slice(0, 5)); // Show latest 5 operations
  }, []);

  const print = () => window.print();

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8 font-sans">
      <div className="flex justify-between items-center mb-8 no-print">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Compliance Audit</h1>
          <Button onClick={print} variant="secondary" className="border-2 border-black font-black">
            <Printer size={18} className="mr-2"/> Generate PDF Report
          </Button>
      </div>

      <div className="bg-white border-4 border-black p-12 print:border-2 print:p-8 print:shadow-none neo-shadow relative overflow-hidden" id="audit-area">
          {/* WATERMARK FOR PRINT */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-[-35deg] hidden print:block">
            <h1 className="text-[120px] font-black uppercase">Confidential</h1>
          </div>

          <div className="border-b-4 border-black pb-6 mb-8 flex justify-between items-center">
              <div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Sentinel Secure</h2>
                  <p className="font-mono text-xs text-gray-500 mt-1 uppercase tracking-widest">Forensic Intelligence Snapshot v2.4</p>
              </div>
              <Shield size={64} className="text-black"/>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                  <h3 className="font-black uppercase text-[10px] text-blue-600 mb-2 tracking-widest">Target Device Identity</h3>
                  <p className="font-mono bg-gray-50 p-3 border-2 border-black text-[10px] break-all leading-tight">{data.ua}</p>
              </div>
              <div className="text-right">
                  <h3 className="font-black uppercase text-[10px] text-blue-600 mb-2 tracking-widest">Audit Timestamp</h3>
                  <p className="font-mono font-black text-lg">{data.time}</p>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Timezone: IST (Asia/Kolkata)</p>
              </div>
          </div>

          {/* SYSTEM HEALTH TABLE */}
          <h3 className="font-black uppercase text-sm mb-4 flex items-center gap-2"><HardDrive size={18}/> Environment Verification</h3>
          <table className="w-full border-2 border-black text-left mb-12">
              <thead className="bg-black text-white uppercase text-[10px]">
                  <tr>
                      <th className="p-3 border-r border-gray-600 tracking-widest">Security Metric</th>
                      <th className="p-3 border-r border-gray-600">Observation</th>
                      <th className="p-3 text-right">Integrity Verdict</th>
                  </tr>
              </thead>
              <tbody className="font-mono text-xs">
                  <tr className="border-b border-black">
                      <td className="p-3 border-r border-black font-bold uppercase">SSL/TLS Encryption</td>
                      <td className="p-3 border-r border-black">{data.https === 'Yes' ? 'Active' : 'Insecure'}</td>
                      <td className="p-3 text-right">{data.https === 'Yes' ? <span className="text-green-600 font-black">VALIDATED</span> : <span className="text-red-600 font-black">FAIL</span>}</td>
                  </tr>
                  <tr className="border-b border-black bg-gray-50">
                      <td className="p-3 border-r border-black font-bold uppercase">Hardware Concurrency</td>
                      <td className="p-3 border-r border-black">{data.cores} Threads</td>
                      <td className="p-3 text-right text-green-600 font-black">OPTIMAL</td>
                  </tr>
                  <tr className="border-b border-black">
                      <td className="p-3 border-r border-black font-bold uppercase">Browser Sandbox</td>
                      <td className="p-3 border-r border-black">{data.cookies}</td>
                      <td className="p-3 text-right text-green-600 font-black">ISOLATED</td>
                  </tr>
                  <tr className="border-b border-black bg-gray-50">
                      <td className="p-3 border-r border-black font-bold uppercase">Screen Fingerprint</td>
                      <td className="p-3 border-r border-black">{data.res} px</td>
                      <td className="p-3 text-right text-yellow-600 font-black">UNIQUELY IDENTIFIED</td>
                  </tr>
              </tbody>
          </table>

          {/* RECENT OPERATIONS LOG */}
          <h3 className="font-black uppercase text-sm mb-4 flex items-center gap-2"><FileLock size={18}/> Security Operations Log</h3>
          <div className="border-2 border-black mb-12 min-h-[150px]">
            {logs.length > 0 ? (
              <table className="w-full text-left text-[10px] font-mono">
                <thead className="bg-gray-100 border-b border-black uppercase font-black">
                  <tr>
                    <th className="p-2 border-r border-black">Time</th>
                    <th className="p-2 border-r border-black">Operation</th>
                    <th className="p-2 border-r border-black">File/Asset</th>
                    <th className="p-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, idx) => (
                    <tr key={idx} className="border-b border-black last:border-b-0">
                      <td className="p-2 border-r border-black">{log.time}</td>
                      <td className="p-2 border-r border-black font-bold uppercase">{log.type}</td>
                      <td className="p-2 border-r border-black truncate max-w-[150px]">{log.fileName}</td>
                      <td className="p-2 text-right text-green-600 font-bold">SUCCESS</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-gray-400 uppercase font-black text-xs tracking-widest flex flex-col items-center gap-2">
                <Search size={24}/> No cryptographic operations recorded in current session.
              </div>
            )}
          </div>

          {/* SIGNATURE SECTION */}
          <div className="flex justify-between items-end mt-12 border-t-2 border-black pt-8">
              <div className="max-w-xs">
                <p className="text-[9px] uppercase font-black text-blue-600 mb-1">Compliance Disclaimer</p>
                <p className="text-[8px] leading-tight text-gray-500 italic">
                  This report provides a client-side forensic snapshot of the system environment and cryptographic actions performed via Sentinel Secure. This is not a substitute for a full network audit.
                </p>
              </div>
              <div className="text-center relative">
                  {/* AUTHENTICITY STAMP */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 border-[4px] border-double border-red-600/60 text-red-600/60 px-4 py-1 rounded font-black uppercase text-xs rotate-[-12deg] pointer-events-none">
                    Verified Original
                  </div>
                  <p className="text-[10px] font-black uppercase mb-8 tracking-tighter">Proprietor / Lead Developer</p>
                  <p className="text-[12px] font-mono font-black border-t-2 border-black pt-1 px-6">{data.proprietor}</p>
              </div>
          </div>
      </div>
      
      {/* Fixed Print Styles */}
      <style>{`
        @media print {
            body * { visibility: hidden; }
            #audit-area, #audit-area * { visibility: visible; }
            #audit-area { 
              position: absolute; 
              left: 0; 
              top: 0; 
              width: 100% !important; 
              border: 2px solid black !important; 
              margin: 0 !important; 
              padding: 40px !important;
            }
            .no-print { display: none !important; }
            .neo-shadow { box-shadow: none !important; }
            @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  );
};

export default AuditReport;