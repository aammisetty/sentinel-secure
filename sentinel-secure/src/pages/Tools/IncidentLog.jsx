import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';

const IncidentLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // REAL LOGIC: Read fake system logs generated during session or stored
    const sessionLogs = JSON.parse(localStorage.getItem('sentinel_logs') || '[]');
    if(sessionLogs.length === 0) {
        // Init with some "Real" looking data if empty
        const init = [
            { ts: new Date().toISOString(), type: 'INFO', msg: 'System Monitor Initialized' },
            { ts: new Date().toISOString(), type: 'WARN', msg: 'Unverified Extension Detected' }
        ];
        setLogs(init);
    } else {
        setLogs(sessionLogs);
    }
  }, []);

  const addLog = () => {
      const newLog = { ts: new Date().toISOString(), type: 'USER', msg: 'Manual Check Performed' };
      const updated = [newLog, ...logs];
      setLogs(updated);
      localStorage.setItem('sentinel_logs', JSON.stringify(updated));
  };

  return (
    <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8">Local Incident Log</h1>
      <div className="flex justify-end mb-4">
          <Button onClick={addLog} variant="secondary">Add Entry</Button>
      </div>
      <div className="border-2 border-black bg-black text-green-400 p-6 font-mono h-[60vh] overflow-y-auto shadow-[8px_8px_0px_0px_#ccc]">
          {logs.map((l, i) => (
              <div key={i} className="mb-2 border-b border-gray-800 pb-1">
                  <span className="text-gray-500">[{l.ts}]</span> 
                  <span className={`font-bold mx-2 ${l.type === 'WARN' ? 'text-yellow-400' : 'text-blue-400'}`}>{l.type}</span>
                  {l.msg}
              </div>
          ))}
      </div>
    </div>
  );
};
export default IncidentLog;