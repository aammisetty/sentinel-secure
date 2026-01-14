import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Lock, ArrowLeft, Download, ShieldCheck, 
  Smartphone, Copy, Check, Printer, Clock
} from 'lucide-react';
import Button from '../components/Button';

// Import your QR images here
import phonePeQR from '../assets/p2.png'; 
import whatsAppQR from '../assets/p1.png';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Details, 2: Invoice & Pay
  const [formData, setFormData] = useState({});
  const [invoiceId, setInvoiceId] = useState('');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 Minutes (180 seconds)

  // Constants for Indian Invoice Standards
  const SUPPLIER_GSTIN = "27AABCU9603R1Z2"; // Maharashtra (27)
  const SUPPLIER_PAN = "DEWPA4187R"; // Updated PAN
  const SAC_CODE = "998313"; // IT Support Services
  const INVOICE_DATE = new Date().toLocaleDateString('en-IN');

  useEffect(() => {
    if (!state?.plan) {
      navigate('/pricing');
    }
    // Generate compliant Invoice Serial Number (e.g., SS/25-26/0042)
    const finYear = new Date().getMonth() > 2 ? '25-26' : '24-25';
    setInvoiceId(`SS/${finYear}/${Math.floor(1000 + Math.random() * 9000)}`);
  }, [state, navigate]);

  // --- NAVIGATION GUARD & TIMER ---
  useEffect(() => {
    if (step === 2) {
      // 1. Trap Back Button
      window.history.pushState(null, null, window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, null, window.location.href);
        alert("Transaction in progress. Please complete the payment to generate your license key.");
      };
      window.addEventListener('popstate', handlePopState);

      // 2. Warn on Tab Close
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);

      // 3. Countdown Timer
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            alert("Payment Session Expired. Creating new session.");
            navigate('/pricing'); 
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
  }, [step, navigate]);

  // Format Time (MM:SS)
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

  const handlePaymentConfirmation = () => {
    const msg = `
*✅ PAYMENT CONFIRMATION*
--------------------------------
*Invoice No:* ${invoiceId}
*Date:* ${INVOICE_DATE}
*Plan:* ${plan.name} (${billing.toUpperCase()})
*Amount Paid:* ₹${totalAmount.toLocaleString('en-IN')}

*Beneficiary:* Arun Ammisetty (Founder, Sentinel Secure)

*Client Details:*
Name: ${formData.name}
Company: ${formData.company}
GSTIN: ${formData.gst}
Email: ${formData.email}

*Payment Method:* UPI / QR Scan
--------------------------------
I have completed the payment. Please activate my account.
`;
    window.open(`https://wa.me/918329004424?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${step === 1 ? 'pt-32 p-6 lg:p-12' : ''}`}>
      
      {/* Strict Print Styles to Hide Website UI */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #tax-invoice, #tax-invoice * { visibility: visible; }
          #tax-invoice { position: absolute; left: 0; top: 0; width: 100%; height: auto; margin: 0; padding: 40px; border: none; box-shadow: none; background: white; z-index: 9999; }
          .no-print, header, footer, button { display: none !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      {/* STEP 1: BILLING FORM (Standard Layout) */}
      {step === 1 && (
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate('/pricing')} className="flex items-center gap-2 font-bold text-gray-500 hover:text-black mb-8 print:hidden">
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

      {/* STEP 2: FULL SCREEN PAYMENT & INVOICE (Overlays everything) */}
      {step === 2 && (
        <div className="fixed inset-0 z-[100] bg-gray-50 overflow-y-auto flex flex-col no-print-bg">
            
            {/* Payment Header (Timer) - Hidden on Print */}
            <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg no-print">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-green-400"/>
                    <span className="font-bold uppercase tracking-wider">Secure Payment Gateway</span>
                </div>
                <div className={`flex items-center gap-2 font-mono font-bold text-xl ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                    <Clock size={20}/>
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6 lg:p-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* LEFT: PAYMENT (Hidden on Print) */}
                <div className="space-y-8 no-print">
                    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_#22c55e]">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black uppercase mb-2">Scan to Pay</h2>
                            <p className="text-sm text-gray-600 mb-2">Scan using any UPI App to activate plan.</p>
                            <p className="text-xs bg-yellow-100 border border-yellow-300 p-2 rounded text-yellow-800 font-bold">
                                Payment will be credited to: Arun Ammisetty (Founder)
                            </p>
                        </div>

                        {/* UPI ID COPY */}
                        <div className="bg-gray-100 border-2 border-black p-4 flex justify-between items-center mb-8">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Official UPI ID</p>
                                <p className="font-mono font-bold text-lg">918329004424@waicici</p>
                            </div>
                            <button onClick={copyUPI} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                {copied ? <Check size={20} className="text-green-600"/> : <Copy size={20}/>}
                            </button>
                        </div>

                        {/* QR CODES GRID */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="text-center">
                                <div className="border-2 border-black p-2 mb-2 bg-white">
                                    <img src={phonePeQR} alt="PhonePe QR" className="w-full h-auto object-contain"/>
                                </div>
                                <p className="text-xs font-bold uppercase flex items-center justify-center gap-1">
                                    <Smartphone size={12}/> PhonePe
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="border-2 border-black p-2 mb-2 bg-white">
                                    <img src={whatsAppQR} alt="WhatsApp QR" className="w-full h-auto object-contain"/>
                                </div>
                                <p className="text-xs font-bold uppercase flex items-center justify-center gap-1">
                                    <Smartphone size={12}/> WhatsApp Pay
                                </p>
                            </div>
                        </div>

                        <Button onClick={handlePaymentConfirmation} className="w-full bg-green-600 text-white border-green-800 hover:bg-green-700">
                            I Have Made the Payment
                        </Button>
                        <p className="text-xs text-center text-gray-500 mt-4">
                            *Clicking this opens WhatsApp to verify transaction ID.
                        </p>
                    </div>
                    
                    {/* PDF Button */}
                    <button 
                        onClick={handleDownloadPDF}
                        className="w-full py-4 border-2 border-blue-600 text-blue-600 font-bold uppercase hover:bg-blue-50 flex items-center justify-center gap-2"
                    >
                        <Printer size={20}/> Download Tax Invoice (PDF)
                    </button>
                </div>

                {/* RIGHT: INVOICE (The only thing that prints) */}
                <div id="tax-invoice" className="bg-white border text-black p-8 h-fit shadow-lg relative">
                    {/* INVOICE HEADER */}
                    <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-6">
                        <div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter">Tax Invoice</h3>
                            <p className="text-xs font-bold text-gray-500 mt-1 uppercase">(Original for Recipient)</p>
                        </div>
                        <div className="text-right">
                            <div className="w-32 h-12 bg-black text-white flex items-center justify-center font-black uppercase italic ml-auto mb-2">
                                Sentinel
                            </div>
                            <p className="text-xs font-bold">Sentinel Secure Systems</p>
                        </div>
                    </div>

                    {/* SUPPLIER & RECIPIENT GRID */}
                    <div className="grid grid-cols-2 gap-8 text-xs mb-6 border-b-2 border-black pb-6">
                        <div>
                            <p className="font-bold text-gray-500 uppercase mb-1">Details of Supplier</p>
                            <p className="font-bold text-sm">Sentinel Secure Systems</p>
                            <p>Office 404, IT Park, Baner</p>
                            <p>Pune, Maharashtra - 411045</p>
                            <p className="mt-2"><span className="font-bold">Proprietor:</span> Arun Ammisetty</p>
                            <p><span className="font-bold">GSTIN:</span> {SUPPLIER_GSTIN}</p>
                            <p><span className="font-bold">PAN:</span> {SUPPLIER_PAN}</p>
                            <p><span className="font-bold">State Code:</span> 27 (Maharashtra)</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-500 uppercase mb-1">Details of Recipient (Billed To)</p>
                            <p className="font-bold text-sm">{formData.name || '---'}</p>
                            <p>{formData.company || '---'}</p>
                            <p className="whitespace-pre-line">{formData.address || '---'}</p>
                            <p className="mt-2"><span className="font-bold">GSTIN:</span> {formData.gst || 'Unregistered'}</p>
                            <p><span className="font-bold">Place of Supply:</span> {formData.state || 'Maharashtra'}</p>
                        </div>
                    </div>

                    {/* INVOICE METADATA */}
                    <div className="flex justify-between text-xs font-mono mb-6 bg-gray-100 p-2 border border-gray-300">
                        <div>
                            <span className="font-bold">Invoice No:</span> {invoiceId}
                        </div>
                        <div>
                            <span className="font-bold">Invoice Date:</span> {INVOICE_DATE}
                        </div>
                        <div>
                            <span className="font-bold">Reverse Charge:</span> No
                        </div>
                    </div>

                    {/* ITEM TABLE */}
                    <table className="w-full text-xs mb-6 border border-black">
                        <thead className="bg-gray-200 font-bold border-b border-black">
                            <tr>
                                <th className="text-left p-2 border-r border-black w-12">#</th>
                                <th className="text-left p-2 border-r border-black">Description of Service</th>
                                <th className="text-center p-2 border-r border-black w-20">SAC</th>
                                <th className="text-right p-2 w-24">Taxable Value</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono">
                            <tr>
                                <td className="p-2 border-r border-black border-b text-center">1</td>
                                <td className="p-2 border-r border-black border-b">
                                    <span className="font-bold block">{plan.name} Subscription</span>
                                    <span className="text-[10px] text-gray-500">Billing Cycle: {billing}</span>
                                </td>
                                <td className="p-2 border-r border-black border-b text-center">{SAC_CODE}</td>
                                <td className="p-2 border-b text-right">₹{taxableValue.toFixed(2)}</td>
                            </tr>
                            {/* TAX ROWS */}
                            <tr>
                                <td colSpan="3" className="text-right p-2 border-r border-black border-b font-bold">IGST (18%)</td>
                                <td className="text-right p-2 border-b">₹{gstAmount.toFixed(2)}</td>
                            </tr>
                            <tr className="bg-black text-white text-sm">
                                <td colSpan="3" className="text-right p-2 border-r border-white font-bold uppercase">Total Invoice Value</td>
                                <td className="text-right p-2 font-bold">₹{totalAmount.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="text-xs mb-8">
                        <p className="font-bold">Amount in Words:</p>
                        <p className="italic text-gray-600">Indian Rupee {totalAmount} Only</p>
                    </div>

                    {/* FOOTER & STAMP */}
                    <div className="flex justify-between items-end mt-12 relative">
                        <div className="text-[10px] text-gray-500 max-w-xs">
                            <p className="font-bold text-black mb-1">Terms & Conditions:</p>
                            <ol className="list-decimal pl-3 space-y-1">
                                <li>Payment is due immediately.</li>
                                <li>This is a computer generated invoice.</li>
                                <li>Subject to Pune Jurisdiction.</li>
                            </ol>
                        </div>

                        <div className="text-center relative">
                            {/* CSS STAMP */}
                            <div className="absolute bottom-4 right-0 w-24 h-24 border-4 border-blue-600 rounded-full flex flex-col items-center justify-center text-blue-600 opacity-80 -rotate-12 pointer-events-none mix-blend-multiply">
                                <div className="w-20 h-20 border border-blue-600 rounded-full flex flex-col items-center justify-center p-1">
                                    <span className="text-[8px] font-black tracking-tighter uppercase text-center leading-none">Sentinel Secure Systems</span>
                                    <span className="text-[8px] font-bold mt-1">PAID</span>
                                    <span className="text-[6px] mt-1">{INVOICE_DATE}</span>
                                    <span className="text-[6px]">Pune-45</span>
                                </div>
                            </div>

                            <p className="font-bold text-xs mb-8 relative z-10">For Sentinel Secure Systems</p>
                            <div className="h-8"></div> {/* Signature Space */}
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