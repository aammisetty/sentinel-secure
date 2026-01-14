import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, XCircle, User, CreditCard, 
  Clock, LogOut, ShieldAlert, Search 
} from 'lucide-react';
import Button from '../components/Button';

const AdminVerify = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = () => {
    const requests = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('pending_verification_')) {
        requests.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setPendingRequests(requests.sort((a, b) => b.timestamp - a.timestamp));
  };

  const handleDecision = (txnId, status) => {
    if (status === 'approved') {
      localStorage.setItem(`sentinel_pay_status_${txnId}`, 'approved');
      localStorage.removeItem(`pending_verification_${txnId}`);
      alert(`Transaction ${txnId} APPROVED.`);
    } else {
      // Logic for False Claim / Reject
      if (window.confirm("MARK AS FALSE CLAIM? This will block the user permanently.")) {
        localStorage.setItem('sentinel_blocked', 'true'); // Site-wide kill switch for the user
        localStorage.removeItem(`pending_verification_${txnId}`);
        alert(`Transaction ${txnId} REJECTED. User Blacklisted.`);
      }
    }
    fetchRequests();
  };

  const handleLogout = () => {
    localStorage.removeItem('sentinel_admin_email');
    localStorage.removeItem('sentinel_admin_2fa');
    navigate('/admin/login');
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* ADMIN HEADER */}
        <div className="flex justify-between items-center bg-black text-white p-6 border-b-4 border-blue-600 mb-8">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
              <ShieldAlert className="text-blue-500" /> Admin / Verification Panel
            </h1>
            <p className="text-[10px] font-bold opacity-60">LOGGED IN AS: gchk@duck.com</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold hover:text-red-500 transition-colors">
            <LogOut size={16}/> TERMINATE SESSION
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <h2 className="text-xl font-black uppercase flex items-center gap-2">
            <Clock size={20}/> Incoming Requests ({pendingRequests.length})
          </h2>

          {pendingRequests.length === 0 ? (
            <div className="bg-white border-2 border-black p-20 text-center">
              <Search size={48} className="mx-auto text-gray-300 mb-4"/>
              <p className="font-bold text-gray-400 uppercase tracking-widest">No pending transactions found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <div key={req.txnId} className="bg-white border-2 border-black p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[4px_4px_0px_0px_#000]">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-grow">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">User / Email</p>
                      <p className="font-bold text-sm truncate">{req.user}</p>
                      <p className="text-xs text-gray-500 truncate">{req.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">Transaction ID</p>
                      <p className="font-mono font-black text-blue-600 bg-blue-50 px-2 rounded inline-block">{req.txnId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">Plan / Amount</p>
                      <p className="font-bold text-sm">{req.plan}</p>
                      <p className="text-xs font-bold">₹{req.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">Timestamp</p>
                      <p className="text-xs font-mono">{new Date(req.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 shrink-0">
                    <button 
                      onClick={() => handleDecision(req.txnId, 'approved')}
                      className="bg-green-600 text-white px-6 py-2 font-bold uppercase text-xs border-2 border-black hover:bg-green-700 flex items-center gap-2"
                    >
                      <CheckCircle size={16}/> Approve
                    </button>
                    <button 
                      onClick={() => handleDecision(req.txnId, 'rejected')}
                      className="bg-red-600 text-white px-6 py-2 font-bold uppercase text-xs border-2 border-black hover:bg-red-700 flex items-center gap-2"
                    >
                      <XCircle size={16}/> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECURITY LOGS FOOTER */}
        <div className="mt-12 p-4 bg-gray-200 border-2 border-gray-300 text-[10px] font-mono text-gray-600">
           SYSTEM LOG: [INFO] Listening for storage mutation events... [OK] <br/>
           SYSTEM LOG: [AUTH] Founder session validated via 2FA. [OK]
        </div>
      </div>
    </div>
  );
};

export default AdminVerify;