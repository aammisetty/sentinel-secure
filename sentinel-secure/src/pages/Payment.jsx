import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Lock, ArrowLeft, Download, ShieldCheck, 
  Smartphone, Copy, Check 
} from 'lucide-react';
import Button from '../components/Button';

// Import your QR images here (Ensure files are in src/assets/)
import phonePeQR from '../assets/p1.png'; 
import whatsAppQR from '../assets/p2.png';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Details, 2: Invoice & Pay
  const [formData, setFormData] = useState({});
  const [invoiceId, setInvoiceId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!state?.plan) {
      navigate('/pricing');
    }
    setInvoiceId(`INV-${Math.floor(100000 + Math.random() * 900000)}`);
  }, [state, navigate]);

  if (!state?.plan) return null;

  const { plan, billing } = state;
  const gstAmount = Math.round(plan.price * 0.18);
  const totalAmount = plan.price + gstAmount;
  const date = new Date().toLocaleDateString();

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setFormData({
      name: fd.get('name'),
      company: fd.get('company'),
      email: fd.get('email'),
      gst: fd.get('gst'),
      address: fd.get('address')
    });
    setStep(2);
    window.scrollTo(0, 0);
  };

  const copyUPI = () => {
    navigator.clipboard.writeText("918329004424@waicici");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirmation = () => {
    const msg = `
*✅ PAYMENT CONFIRMATION*
--------------------------------
*Invoice ID:* ${invoiceId}
*Date:* ${date}
*Plan:* ${plan.name} (${billing.toUpperCase()})
*Amount Paid:* ₹${totalAmount.toLocaleString()}

*Client Details:*
Name: ${formData.name}
Company: ${formData.company}
GST: ${formData.gst || 'N/A'}
Email: ${formData.email}

*Payment Method:* UPI / QR Scan
--------------------------------
I have completed the payment. Please activate my account.
`;
    window.open(`https://wa.me/918329004424?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pt-32 min-h-screen bg-gray-50 p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <button onClick={() => navigate('/pricing')} className="flex items-center gap-2 font-bold text-gray-500 hover:text-black mb-8">
            <ArrowLeft size={18}/> Back to Plans
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT COLUMN: ACTION AREA */}
            <div className="space-y-8">
                {step === 1 ? (
                    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
                        <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                            <CreditCard className="text-blue-600"/> Billing Information
                        </h2>
                        <form onSubmit={handleDetailsSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Full Name</label>
                                <input name="name" required className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="Enter Full Name"/>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Company / Organization</label>
                                <input name="company" required className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="Company Name"/>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Billing Address</label>
                                <textarea name="address" required rows="2" className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="Full Address for Invoice"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Email</label>
                                    <input name="email" type="email" required className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="name@work.com"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">GSTIN (Optional)</label>
                                    <input name="gst" className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="GST Number"/>
                                </div>
                            </div>
                            <Button className="w-full mt-4">Proceed to Payment</Button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_#22c55e]">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black uppercase mb-2">Scan to Pay</h2>
                            <p className="text-sm text-gray-600">Use any UPI App to complete the transaction.</p>
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
                            *Clicking this will open WhatsApp to share proof of payment for instant activation.
                        </p>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: INVOICE PREVIEW */}
            <div className="bg-white border-2 border-black p-8 h-fit">
                <div className="flex justify-between items-start mb-8 border-b-2 border-black pb-6">
                    <div>
                        <h3 className="text-xl font-black uppercase">Tax Invoice</h3>
                        <p className="text-xs font-mono text-gray-500">#{invoiceId}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg">Sentinel Secure</p>
                        <p className="text-xs text-gray-500">Pune, MH, India</p>
                    </div>
                </div>

                <div className="space-y-6 mb-8">
                    <div className="grid grid-cols-2 text-sm">
                        <div>
                            <p className="text-gray-500 font-bold uppercase text-xs">Billed To</p>
                            <p className="font-bold">{formData.name || '---'}</p>
                            <p className="text-gray-600">{formData.company || '---'}</p>
                            <p className="text-gray-600 text-xs">{formData.address || '---'}</p>
                            {formData.gst && <p className="text-xs font-mono mt-1">GST: {formData.gst}</p>}
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 font-bold uppercase text-xs">Date Issued</p>
                            <p className="font-bold">{date}</p>
                        </div>
                    </div>

                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 border-y-2 border-black">
                            <tr>
                                <th className="text-left py-2">Description</th>
                                <th className="text-right py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono">
                            <tr>
                                <td className="py-2">{plan.name} ({billing})</td>
                                <td className="text-right py-2">₹{plan.price.toLocaleString()}</td>
                            </tr>
                            <tr className="text-gray-500">
                                <td className="py-2">IGST (18%)</td>
                                <td className="text-right py-2">₹{gstAmount.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center border-t-2 border-black pt-4">
                        <p className="font-black text-xl uppercase">Total Payable</p>
                        <p className="font-black text-2xl text-blue-600">₹{totalAmount.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 text-xs text-yellow-800 flex gap-2">
                    <ShieldCheck size={16} className="shrink-0"/>
                    <p>
                        This is a pro-forma invoice. A valid GST Tax Invoice (signed) will be emailed to 
                        <strong> {formData.email || 'your email'} </strong> 
                        automatically upon payment confirmation.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;