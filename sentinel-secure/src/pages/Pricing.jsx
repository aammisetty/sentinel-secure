import React, { useState } from 'react';
import { 
  CheckCircle, Zap, Shield, Globe, Server, 
  CreditCard, Lock, Download, AlertOctagon, X 
} from 'lucide-react';
import Button from '../components/Button';

const Pricing = () => {
  const [billing, setBilling] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Sentinel Starter',
      price: billing === 'monthly' ? 999 : 9999,
      desc: 'Essential browser-based forensics for freelancers.',
      features: ['File Entropy Analysis', 'Basic Incident Logger', '1 User Seat', 'Email Support'],
      color: 'bg-white'
    },
    {
      id: 'pro',
      name: 'Sentinel Pro',
      price: billing === 'monthly' ? 2499 : 24999,
      desc: 'Full suite for small agency teams.',
      features: ['Advanced Phishing Detect', 'Ransomware Simulator', '5 User Seats', 'Priority Support', 'White Label Reports'],
      color: 'bg-blue-50',
      popular: true
    },
    {
      id: 'business',
      name: 'Business Grid',
      price: billing === 'monthly' ? 4999 : 49999,
      desc: 'Infrastructure audit & compliance for SMEs.',
      features: ['API Access', 'Automated Daily Scans', '20 User Seats', 'Dedicated Account Mgr', 'Audit Logs (1 Year)'],
      color: 'bg-yellow-50'
    }
  ];

  const handleInvoice = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    
    // Invoice Calculations
    const baseAmount = selectedPlan.price;
    const gst = Math.round(baseAmount * 0.18);
    const total = baseAmount + gst;
    const invoiceId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const date = new Date().toLocaleDateString();

    // Construct WhatsApp Message
    const msg = `
*🧾 INVOICE REQUEST: ${invoiceId}*
--------------------------------
*Date:* ${date}
*Plan:* ${selectedPlan.name} (${billing.toUpperCase()})
*Client:* ${fd.get('name')}
*Company:* ${fd.get('company')}
*GST No:* ${fd.get('gst') || 'N/A'}

*Base Amount:* ₹${baseAmount.toLocaleString()}
*GST (18%):* ₹${gst.toLocaleString()}
*TOTAL PAYABLE:* ₹${total.toLocaleString()}
--------------------------------
*PAYMENT INSTRUCTIONS:*
Please pay via WhatsApp Pay or UPI to:
👉 *918329004424@waicici*

Once paid, please share the screenshot here for account activation.
`;

    // Redirect to WhatsApp
    window.open(`https://wa.me/918329004424?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pt-48 min-h-screen bg-gray-50 p-6 lg:p-12 relative">
      
      <div className="max-w-7xl mx-auto">
        
        {/* 1. HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6">
                Transparent <span className="text-blue-600">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 font-medium mb-8">
                No hidden setup fees. No long-term contracts. 
                Invest in your security infrastructure today.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-4 bg-white border-2 border-black p-2 rounded-full">
                <button 
                    onClick={() => setBilling('monthly')}
                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${billing === 'monthly' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
                >
                    Monthly
                </button>
                <button 
                    onClick={() => setBilling('yearly')}
                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${billing === 'yearly' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
                >
                    Yearly <span className="bg-green-500 text-black text-[10px] px-2 py-0.5 rounded-full">SAVE 20%</span>
                </button>
            </div>
        </div>

        {/* 2. PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {plans.map((plan) => (
                <div key={plan.id} className={`border-2 border-black p-8 relative flex flex-col justify-between transition-transform hover:-translate-y-2 ${plan.color} ${plan.popular ? 'shadow-[12px_12px_0px_0px_#000]' : 'hover:shadow-[8px_8px_0px_0px_#000]'}`}>
                    {plan.popular && (
                        <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 uppercase">
                            Most Popular
                        </div>
                    )}
                    <div>
                        <h3 className="text-2xl font-black uppercase mb-2">{plan.name}</h3>
                        <p className="text-sm text-gray-600 mb-6 h-10">{plan.desc}</p>
                        <div className="text-5xl font-black mb-1">₹{plan.price.toLocaleString()}</div>
                        <div className="text-xs font-mono text-gray-500 mb-8 uppercase">Per {billing === 'monthly' ? 'Month' : 'Year'} / Excl. GST</div>
                        
                        <div className="space-y-3 mb-8">
                            {plan.features.map((feat, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm font-bold">
                                    <CheckCircle size={16} className="text-green-600 shrink-0"/> {feat}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button 
                        onClick={() => setSelectedPlan(plan)}
                        className={`w-full ${plan.popular ? 'bg-blue-600 text-white border-blue-600 hover:bg-black hover:border-black' : ''}`}
                    >
                        Select Plan
                    </Button>
                </div>
            ))}
        </div>

        {/* 3. CHECKOUT MODAL / SECTION (Visible on Selection) */}
        {selectedPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white border-2 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[16px_16px_0px_0px_#2563eb] flex flex-col md:flex-row">
                    
                    {/* Left: Summary */}
                    <div className="bg-gray-100 p-8 border-b-2 md:border-b-0 md:border-r-2 border-black md:w-1/3">
                        <h3 className="font-black uppercase text-xl mb-6">Order Summary</h3>
                        <div className="space-y-4 font-mono text-sm">
                            <div className="flex justify-between">
                                <span>Plan:</span>
                                <span className="font-bold">{selectedPlan.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Cycle:</span>
                                <span className="uppercase">{billing}</span>
                            </div>
                            <div className="border-t border-gray-300 my-2"></div>
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹{selectedPlan.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>GST (18%):</span>
                                <span>₹{Math.round(selectedPlan.price * 0.18).toLocaleString()}</span>
                            </div>
                            <div className="border-t-2 border-black my-2"></div>
                            <div className="flex justify-between text-xl font-black">
                                <span>Total:</span>
                                <span>₹{(selectedPlan.price + Math.round(selectedPlan.price * 0.18)).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="mt-8 bg-yellow-100 p-4 border border-yellow-500 text-xs text-yellow-800 font-bold">
                            <AlertOctagon size={16} className="inline mr-1 mb-1"/> 
                            Manual Verification Required. Account activated within 2 hours of payment.
                        </div>
                    </div>

                    {/* Right: Details Form */}
                    <div className="p-8 md:w-2/3 relative">
                        <button 
                            onClick={() => setSelectedPlan(null)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={24}/>
                        </button>

                        <h3 className="font-black uppercase text-2xl mb-6 flex items-center gap-2">
                            <CreditCard className="text-blue-600"/> Billing Details
                        </h3>
                        
                        <form onSubmit={handleInvoice} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Full Name</label>
                                    <input name="name" required className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="John Doe"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Company Name</label>
                                    <input name="company" required className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="Acme Corp"/>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Email Address</label>
                                <input name="email" type="email" required className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="billing@company.com"/>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">GSTIN (Optional)</label>
                                <input name="gst" className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white outline-none" placeholder="27AAAAA0000A1Z5"/>
                            </div>

                            <div className="pt-6">
                                <Button type="submit" className="w-full bg-green-600 text-white border-black hover:bg-black hover:text-white py-4 text-lg">
                                    <Zap className="mr-2" size={20}/> Generate Invoice & Pay
                                </Button>
                                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                                    <Lock size={10}/> Secured via WhatsApp Pay UPI (918329004424@waicici)
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* 4. FAQ */}
        <div className="max-w-3xl mx-auto border-t-2 border-black pt-16">
            <h2 className="text-3xl font-black uppercase mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold flex justify-between">Can I cancel anytime? <span className="group-open:rotate-180 transition-transform">▼</span></summary>
                    <p className="mt-2 text-sm text-gray-600 pt-2 border-t border-gray-200">Yes. Monthly plans can be cancelled anytime. Yearly plans are refundable within 14 days.</p>
                </details>
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold flex justify-between">Do you offer GST Invoices? <span className="group-open:rotate-180 transition-transform">▼</span></summary>
                    <p className="mt-2 text-sm text-gray-600 pt-2 border-t border-gray-200">Yes. Once payment is confirmed via WhatsApp, a compliant PDF Tax Invoice is emailed to you.</p>
                </details>
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold flex justify-between">What payment methods are accepted? <span className="group-open:rotate-180 transition-transform">▼</span></summary>
                    <p className="mt-2 text-sm text-gray-600 pt-2 border-t border-gray-200">We primarily accept UPI (WhatsApp Pay, GPay, PhonePe) for instant activation. Bank transfers available for Enterprise plans.</p>
                </details>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;