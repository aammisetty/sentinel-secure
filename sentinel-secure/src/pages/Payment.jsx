import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Lock, ArrowLeft, Download, ShieldCheck, 
  Smartphone, Copy, Check, Printer, Clock, AlertOctagon, RefreshCw,
  ShieldAlert, Ban, UserX
} from 'lucide-react';
import Button from '../components/Button';
import { supabase } from '../utils/supabase';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({});
  const [invoiceId, setInvoiceId] = useState('');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); 
  const [txnId, setTxnId] = useState('');
  const [isPermanentlyBlocked, setIsPermanentlyBlocked] = useState(localStorage.getItem('sentinel_blocked') === 'true');

  const SUPPLIER_GSTIN = "27AABCU9603R1Z2"; 
  const SUPPLIER_PAN = "DEWPA4187R"; 
  const SAC_CODE = "998313"; 
  const INVOICE_DATE = new Date().toLocaleDateString('en-IN');

  useEffect(() => {
    if (!state?.plan) {
      navigate('/pricing');
    }
    const finYear = new Date().getMonth() > 2 ? '25-26' : '24-25';
    setInvoiceId(`SS/${finYear}/${Math.floor(1000 + Math.random() * 9000)}`);
  }, [state, navigate]);

  // --- SUPABASE REAL-TIME MONITORING ---
  useEffect(() => {
    if (!txnId || step !== 3) return;

    const subscription = supabase
      .channel('payment_status_check')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'payment_requests',
          filter: `txn_id=eq.${txnId}`,
        },
        (payload) => {
          const { status } = payload.new;

          if (status === 'approved') {
            localStorage.setItem('sentinel_plan', state?.plan?.id);
            localStorage.setItem('sentinel_status', 'active');
            localStorage.setItem('sentinel_token', `verified_${txnId}`);
            localStorage.setItem('sentinel_user', formData.email);
            navigate('/dashboard');
          } 
          
          if (status === 'blocked') {
            localStorage.setItem('sentinel_blocked', 'true');
            setIsPermanentlyBlocked(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [txnId, step, navigate, state, formData.email]);

  useEffect(() => {
    if (step >= 2) {
      window.history.pushState(null, null, window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, null, window.location.href);
        alert("Verification in progress. Do not leave this page.");
      };
      window.addEventListener('popstate', handlePopState);
      const handleBeforeUnload = (e) => { e.preventDefault(); e.returnValue = ''; };
      window.addEventListener('beforeunload', handleBeforeUnload);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        clearInterval(timer);
      };
    }
  }, [step]);

  // --- ACCESS DENIED RENDER ---
  if (isPermanentlyBlocked) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6 text-white font-mono overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black opacity-50"></div>
        <div className="relative max-w-2xl w-full border-4 border-red-600 p-8 md:p-12 bg-black shadow-[0_0_50px_rgba(220,38,38,0.5)] text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Ban size={80} className="text-red-600 animate-pulse" />
              <ShieldAlert size={40} className="absolute inset-0 m-auto text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-red-600 mb-4 glitch" data-text="ACCESS DENIED">
            Access Denied
          </h1>
          <div className="h-1 w-full bg-red-600 mb-6"></div>
          <p className="text-xl font-bold uppercase mb-8 leading-tight">
            Security Blacklist Active: Your session and hardware identifier have been permanently restricted.
          </p>
          <div className="bg-red-600/10 border border-red-600/50 p-6 mb-8 text-left">
            <p className="text-xs uppercase font-black text-red-500 mb-2 tracking-widest">Incident Telemetry:</p>
            <p className="text-sm font-bold text-red-200">REASON: FRAUDULENT PAYMENT CLAIM DETECTED</p>
            <p className="text-xs opacity-60 mt-1">STATUS: NON-APPEALABLE TERMINATION</p>
          </div>
          <p className="text-[10px] uppercase opacity-40">
            Founder Override Required for Restoration (testcodecfg@gmail.com)
          </p>
        </div>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!state?.plan) return null;

  const { plan, billing } = state;
  const taxableValue = plan.price;
  const gstRate = 0.18;
  const gstAmount = Math.round(taxableValue * gstRate);
  const totalAmount = taxableValue + gstAmount;

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setFormData({
      name: fd.get('name'),
      company: fd.get('company'),
      email: fd.get('email'),
      gst: fd.get('gst') || 'Unregistered',
      address: fd.get('address'),
      state: fd.get('state')
    });
    setStep(2);
    window.scrollTo(0, 0);
  };

  const copyUPI = () => {
    navigator.clipboard.writeText("918329004424@waicici");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleInitialPaymentClick = async () => {
    if(!txnId || txnId.length < 6) return alert("Please enter a valid Transaction ID.");
    
    const refId = `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const sessionId = `SID-${Date.now()}`;

    try {
      const { error } = await supabase
        .from('payment_requests')
        .insert([{
          txn_id: txnId,
          ref_id: refId,
          session_id: sessionId,
          user_name: formData.name,
          user_email: formData.email,
          amount: totalAmount,
          plan: plan.name,
          status: 'pending'
        }]);

      if (error) throw error;

      setStep(3);

      const msg = `
*✅ PAYMENT VERIFICATION REQUEST*
--------------------------------
*Ref ID:* ${refId}
*Session:* ${sessionId}
*UTR/Transaction ID:* ${txnId}
*Invoice No:* ${invoiceId}
*Plan:* ${plan.name}
*Amount:* ₹${totalAmount.toLocaleString('en-IN')}
*User:* ${formData.name}
--------------------------------
Founder, please verify this on the Secure Admin Panel.
`;
      window.open(`https://wa.me/918329004424?text=${encodeURIComponent(msg)}`, '_blank');

    } catch (err) {
      alert("Database Connection Error. Please check your internet.");
      console.error(err);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${step === 1 ? 'pt-32 p-6 lg:p-12' : ''}`}>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .no-print, header, footer, button, .verification-overlay { display: none !important; }
          #tax-invoice { 
            display: block !important;
            visibility: visible !important;
            position: absolute; left: 0; top: 0; width: 100%; height: auto;
            margin: 0; padding: 20px; background: white; z-index: 9999; border: none; box-shadow: none;
          }
          #tax-invoice * { visibility: visible !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      {step === 1 && (
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate('/pricing')} className="flex items-center gap-2 font-bold text-gray-500 hover:text-black mb-8">
              <ArrowLeft size={18}/> Back to Plans
          </button>

          <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
              <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                  <CreditCard className="text-blue-600"/> Billing Information
              </h2>
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-bold uppercase mb-1">Full Name</label>
                          <input name="name" required className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="Arun Ammisetty"/>
                      </div>
                      <div>
                          <label className="block text-xs font-bold uppercase mb-1">Company Name</label>
                          <input name="company" required className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="Sentinel Corp"/>
                      </div>
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase mb-1">Billing Address</label>
                      <textarea name="address" required rows="2" className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="Office No, Building, Street, City, Pincode"></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-bold uppercase mb-1">State</label>
                          <select name="state" required className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none">
                              <option value="Maharashtra">Maharashtra</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Delhi">Delhi</option>
                              <option value="Other">Other</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-bold uppercase mb-1">Email</label>
                          <input name="email" type="email" required className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="billing@work.com"/>
                      </div>
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase mb-1">GSTIN (Optional)</label>
                      <input name="gst" className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="27AAAAA0000A1Z5"/>
                  </div>
                  <Button className="w-full mt-4">Generate Tax Invoice</Button>
              </form>
          </div>
        </div>
      )}

      {step >= 2 && (
        <div className="fixed inset-0 z-[100] bg-gray-50 overflow-y-auto flex flex-col">
            <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-50 no-print">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-green-400"/>
                    <span className="font-bold uppercase tracking-wider">Secure Verification Gateway</span>
                </div>
                <div className={`flex items-center gap-2 font-mono font-bold text-xl ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                    <Clock size={20}/> {formatTime(timeLeft)}
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6 lg:p-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                {step === 3 && (
                    <div className="absolute inset-0 bg-white z-[60] flex flex-col items-center justify-center text-center p-8 verification-overlay">
                        <div className="relative mb-8">
                             <div className="w-24 h-24 border-8 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
                             <Lock className="absolute inset-0 m-auto text-blue-600" size={32}/>
                        </div>
                        <h2 className="text-4xl font-black uppercase mb-4 tracking-tighter">Founder Verification Active</h2>
                        <p className="max-w-md text-gray-500 font-bold mb-8">
                            Your transaction <span className="text-black bg-yellow-200 px-2 font-mono">{txnId}</span> is being cross-referenced by Arun Ammisetty. 
                            The portal will unlock instantly upon approval.
                        </p>
                        <div className="p-4 bg-red-50 border-2 border-red-200 text-red-600 text-xs font-black uppercase flex items-center gap-2">
                            <AlertOctagon size={16}/> Warning: Any attempt to spoof this session will trigger a global account ban.
                        </div>
                    </div>
                )}

                <div className="space-y-8 no-print">
                    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_#22c55e]">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black uppercase mb-2">Scan & Submit ID</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="border-2 border-black p-2 bg-white text-center">
                                <img src={phonePeQR} alt="QR" className="w-full h-auto"/>
                                <p className="text-[10px] font-bold mt-1">PHONEPE</p>
                            </div>
                            <div className="border-2 border-black p-2 bg-white text-center">
                                <img src={whatsAppQR} alt="QR" className="w-full h-auto"/>
                                <p className="text-[10px] font-bold mt-1">WHATSAPP PAY</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs font-black uppercase mb-1">Transaction ID / UTR Number</label>
                            <input 
                                value={txnId}
                                onChange={(e) => setTxnId(e.target.value)}
                                className="w-full p-4 border-2 border-black font-mono text-lg font-bold outline-none focus:bg-blue-50" 
                                placeholder="Enter 12-digit ID"
                            />
                        </div>

                        <Button onClick={handleInitialPaymentClick} className="w-full bg-black text-white py-6 text-xl">
                            Request Approval
                        </Button>
                    </div>
                    
                    <button onClick={handleDownloadPDF} className="w-full py-4 border-2 border-blue-600 text-blue-600 font-bold uppercase hover:bg-blue-50 flex items-center justify-center gap-2 transition-all">
                        <Printer size={20}/> Download Tax Invoice (PDF)
                    </button>
                </div>

                <div id="tax-invoice" className="bg-white border text-black p-8 h-fit shadow-lg relative">
                    <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-6">
                        <div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter">Tax Invoice</h3>
                            <p className="text-xs font-bold text-gray-500 mt-1 uppercase">(Original for Recipient)</p>
                        </div>
                        <div className="text-right">
                            <div className="w-32 h-12 bg-black text-white flex items-center justify-center font-black uppercase italic ml-auto mb-2">Sentinel</div>
                            <p className="text-xs font-bold">Sentinel Secure Systems</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 text-xs mb-6 border-b-2 border-black pb-6">
                        <div>
                            <p className="font-bold text-gray-500 uppercase mb-1">Details of Supplier</p>
                            <p className="font-bold text-sm">Sentinel Secure Systems</p>
                            <p>Office 404, IT Park, Baner, Pune - 411045</p>
                            <p className="mt-2"><span className="font-bold">GSTIN:</span> {SUPPLIER_GSTIN}</p>
                            <p><span className="font-bold">PAN:</span> {SUPPLIER_PAN}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-500 uppercase mb-1">Details of Recipient</p>
                            <p className="font-bold text-sm">{formData.name || '---'}</p>
                            <p>{formData.company || '---'}</p>
                            <p className="whitespace-pre-line">{formData.address || '---'}</p>
                        </div>
                    </div>

                    <div className="flex justify-between text-xs font-mono mb-6 bg-gray-100 p-2 border border-gray-300">
                        <div><span className="font-bold">Invoice No:</span> {invoiceId}</div>
                        <div><span className="font-bold">Invoice Date:</span> {INVOICE_DATE}</div>
                    </div>

                    <table className="w-full text-xs mb-6 border border-black">
                        <thead className="bg-gray-200 font-bold border-b border-black">
                            <tr>
                                <th className="text-left p-2 border-r border-black">Description</th>
                                <th className="text-center p-2 border-r border-black w-20">SAC</th>
                                <th className="text-right p-2 w-24">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono">
                            <tr>
                                <td className="p-2 border-r border-black border-b text-center">1</td>
                                <td className="p-2 border-r border-black border-b">
                                    <span className="font-bold block">{plan.name}</span>
                                    <span className="text-[10px] text-gray-500">Cycle: {billing}</span>
                                </td>
                                <td className="p-2 border-r border-black border-b text-center">{SAC_CODE}</td>
                                <td className="p-2 border-b text-right">₹{taxableValue.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="text-right p-2 border-r border-black border-b font-bold">IGST (18%)</td>
                                <td className="text-right p-2 border-b">₹{gstAmount.toFixed(2)}</td>
                            </tr>
                            <tr className="bg-black text-white text-sm">
                                <td colSpan="2" className="text-right p-2 border-r border-white font-bold uppercase">Total Payable</td>
                                <td className="text-right p-2 font-bold">₹{totalAmount.toLocaleString('en-IN')}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex justify-between items-end mt-12 relative">
                        <div className="text-[10px] text-gray-500 max-w-xs">
                            <p className="font-bold text-black mb-1">Computer Generated - Pune Jurisdiction.</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-xs mb-8 uppercase">For Sentinel Secure Systems</p>
                            <p className="text-[10px] uppercase font-bold border-t border-black pt-1">Authorized Signatory</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Payment;