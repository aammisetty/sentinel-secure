import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, XCircle, User, CreditCard, 
  Clock, LogOut, ShieldAlert, Search, Hash, 
  History, Ban, CheckSquare, ListFilter
} from 'lucide-react';
import Button from '../components/Button';
import { supabase } from '../utils/supabase';

const AdminVerify = () => {
  const [activeTab, setActiveTab] = useState('pending'); // pending, approved, blocked
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialData();

    const channel = supabase
      .channel('admin_sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'payment_requests' },
        () => {
          fetchInitialData(); // Refresh list on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('payment_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setRequests(data);
    setIsLoading(false);
  };

  const handleDecision = async (id, txnId, status) => {
    const verdict = status === 'approved' ? 'approved' : 'blocked';
    
    // Confirmation for blocking to prevent accidental blacklisting
    if (verdict === 'blocked' && !window.confirm(`PERMANENTLY BLOCK TRANSACTION ${txnId}? This triggers a site-wide Access Denied screen for the user.`)) {
        return;
    }

    try {
      // Pushing the block status to Supabase for real-time global interception
      const { error } = await supabase
        .from('payment_requests')
        .update({ status: verdict })
        .eq('id', id);

      if (error) throw error;
      alert(`Transaction ${txnId} marked as ${verdict.toUpperCase()}`);
    } catch (err) {
      alert("Action failed. Check console.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sentinel_admin_email');
    localStorage.removeItem('sentinel_admin_2fa');
    navigate('/admin/login');
  };

  const filteredRequests = requests.filter(req => req.status === activeTab);

  const TabButton = ({ id, label, icon: Icon, color }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 font-black uppercase text-xs border-2 border-black transition-all ${
        activeTab === id 
        ? `${color} text-white translate-x-1 translate-y-1 shadow-none` 
        : `bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none`
      }`}
    >
      <Icon size={16} /> {label} ({requests.filter(r => r.status === id).length})
    </button>
  );

  return (
    <div className="pt-24 min-h-screen bg-gray-50 p-6 lg:p-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* ADMIN HEADER */}
        <div className="flex justify-between items-center bg-black text-white p-6 border-b-4 border-blue-600 mb-8">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
              <ShieldAlert className="text-blue-500" /> Sentinel Central Command
            </h1>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Operator: testcodecfg@gmail.com</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold hover:text-red-500 transition-colors">
            <LogOut size={16}/> TERMINATE SESSION
          </button>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton id="pending" label="Pending" icon={Clock} color="bg-blue-600" />
          <TabButton id="approved" label="Approved" icon={CheckSquare} color="bg-green-600" />
          <TabButton id="blocked" label="Denied / Blocked" icon={Ban} color="bg-red-600" />
        </div>

        {/* DATA LISTING */}
        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            <div className="p-20 text-center animate-pulse">
                <Hash size={48} className="mx-auto text-blue-600 mb-4 animate-spin"/>
                <p className="font-black uppercase tracking-widest text-gray-400">Syncing with Supabase...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="bg-white border-2 border-black p-20 text-center shadow-[8px_8px_0px_0px_#ddd]">
              <Search size={48} className="mx-auto text-gray-200 mb-4"/>
              <p className="font-bold text-gray-400 uppercase tracking-widest">No records found in {activeTab}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((req) => (
                <div key={req.id} className="bg-white border-2 border-black p-6 flex flex-col xl:flex-row justify-between items-center gap-6 shadow-[4px_4px_0px_0px_#000]">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 flex-grow w-full">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Customer</p>
                      <p className="font-bold text-sm truncate">{req.user_name}</p>
                      <p className="text-[10px] text-gray-500 truncate font-mono">{req.user_email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Reference ID</p>
                      <p className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-1 border border-blue-100 inline-block">
                        {req.ref_id}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Session</p>
                      <p className="font-mono text-[10px] truncate max-w-[120px] bg-gray-100 px-2 py-1">{req.session_id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">UTR / Transaction</p>
                      <p className="font-mono font-black text-sm">{req.txn_id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Plan / Value</p>
                      <p className="font-bold text-sm uppercase">{req.plan}</p>
                      <p className="text-xs font-black text-green-600 font-mono">₹{parseFloat(req.amount).toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Timestamp</p>
                      <p className="text-[10px] font-mono font-bold">{new Date(req.created_at).toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  {activeTab === 'pending' && (
                    <div className="flex gap-3 shrink-0 w-full xl:w-auto">
                      <button 
                        onClick={() => handleDecision(req.id, req.txn_id, 'approved')}
                        className="flex-1 xl:flex-none bg-green-600 text-white px-8 py-3 font-bold uppercase text-xs border-2 border-black hover:bg-green-700 flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={16}/> Approve
                      </button>
                      <button 
                        onClick={() => handleDecision(req.id, req.txn_id, 'blocked')}
                        className="flex-1 xl:flex-none bg-red-600 text-white px-8 py-3 font-bold uppercase text-xs border-2 border-black hover:bg-red-700 flex items-center justify-center gap-2"
                      >
                        <XCircle size={16}/> Deny & Block
                      </button>
                    </div>
                  )}

                  {activeTab !== 'pending' && (
                    <div className="shrink-0 w-full xl:w-auto">
                        <div className={`px-6 py-2 border-2 border-black text-[10px] font-black uppercase text-center ${activeTab === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            Verdict: {activeTab}
                        </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LOGS FOOTER */}
        <div className="mt-12 p-6 bg-gray-200 border-2 border-gray-300 text-[10px] font-mono text-gray-600">
           <div className="flex items-center gap-2 mb-2 text-black font-black uppercase">
             <Hash size={12}/> Live Database Context
           </div>
           LOG: [REALTIME] Postgres broadcast listening for 'public.payment_requests' <br/>
           LOG: [SECURITY] All decisions recorded with proprietor timestamp. <br/>
           LOG: [BLOCK] Deny actions push immediate 'status: blocked' to Supabase.
        </div>
      </div>
    </div>
  );
};

export default AdminVerify;