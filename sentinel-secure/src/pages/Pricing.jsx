import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/Button';

const Pricing = () => {
  const [billing, setBilling] = useState('monthly');
  const navigate = useNavigate();

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

  const handleSelectPlan = (plan) => {
    navigate('/payment', { state: { plan, billing } });
  };

  return (
    <div className="pt-64 min-h-screen bg-gray-50 p-6 lg:p-12 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-24 mt-8">
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight">
                Transparent <span className="text-blue-600">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 font-medium mb-10">
                No hidden setup fees. No long-term contracts. 
                Invest in your security infrastructure today.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-4 bg-white border-2 border-black p-2 rounded-full shadow-lg">
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
                        onClick={() => handleSelectPlan(plan)}
                        className={`w-full ${plan.popular ? 'bg-blue-600 text-white border-blue-600 hover:bg-black hover:border-black' : ''}`}
                    >
                        Select Plan
                    </Button>
                </div>
            ))}
        </div>

        {/* 3. FAQ */}
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
            </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;