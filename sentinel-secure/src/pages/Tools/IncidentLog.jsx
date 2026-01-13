import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { AlertCircle, Plus } from 'lucide-react';

const IncidentLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const sessionLogs = JSON.parse(localStorage.getItem('sentinel_logs') || '[]');
    if(sessionLogs.length === 0) {
        const init = [
            { ts: new Date().toISOString(), type: 'INFO', msg: 'System Monitor Initialized' },
            { ts: new Date().toISOString(), type: 'WARN', msg: 'Entropy Scanner Loaded' }
        ];
        setLogs(init);
    } else {
        setLogs(sessionLogs);
    }
  }, []);

  const addLog = () => {
      const msg = prompt("Enter log message:");
      if(msg) {
        const newLog = { ts: new Date().toISOString(), type: 'USER', msg };
        const updated = [newLog, ...logs];
        setLogs(updated);
        localStorage.setItem('sentinel_logs', JSON.stringify(updated));
      }
  };

  const clearLogs = () => {
      localStorage.removeItem('sentinel_logs');
      setLogs([]);
  }

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
          <AlertCircle size={40} className="text-yellow-500"/> Local Incident Log
      </h1>
      <div className="flex justify-end mb-4 gap-4">
          <Button onClick={clearLogs} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">Clear</Button>
          <Button onClick={addLog} variant="secondary"><Plus size={16} className="mr-2"/> Add Entry</Button>
      </div>
      <div className="border-2 border-black bg-black text-green-400 p-6 font-mono h-[60vh] overflow-y-auto neo-shadow text-sm">
          {logs.map((l, i) => (
              <div key={i} className="mb-2 border-b border-gray-800 pb-1 hover:bg-gray-900">
                  <span className="text-gray-500">[{l.ts.split('T')[1].split('.')[0]}]</span> 
                  <span className={`font-bold mx-2 ${l.type === 'WARN' ? 'text-yellow-400' : l.type === 'USER' ? 'text-white' : 'text-blue-400'}`}>
                      {l.type}
                  </span>
                  {l.msg}
              </div>
          ))}
          {logs.length === 0 && <div className="text-gray-600 italic">-- No logs found --</div>}
      </div>
    </div>
  );
};
export default IncidentLog;