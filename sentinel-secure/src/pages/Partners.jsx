import React, { useState } from 'react';
import { 
  Users, DollarSign, Briefcase, TrendingUp, PieChart, 
  Layers, CheckCircle, Target, Shield, ArrowRight,
  Calculator, Settings, Download, Award, Globe, Server, 
  BookOpen, Zap, BarChart, Map, HelpCircle, Lock
} from 'lucide-react';
import Button from '../components/Button';

const Partners = () => {
  // -- STATE MANAGEMENT --
  const [clients, setClients] = useState(25);
  const [seatPrice, setSeatPrice] = useState(5000);
  const [selectedTier, setSelectedTier] = useState('Agency'); // Default Tier

  // Tier Data for Logic
  const tiers = {
    'Reseller': { rate: 0.20, color: 'bg-white', text: 'text-black', border: 'border-black' },
    'Agency':   { rate: 0.30, color: 'bg-blue-600', text: 'text-white', border: 'border-black' },
    'Distributor': { rate: 0.40, color: 'bg-yellow-400', text: 'text-black', border: 'border-black' }
  };

  // Calculations
  const monthlyRevenue = clients * seatPrice;
  const commission = monthlyRevenue * tiers[selectedTier].rate;
  const annualCommission = commission * 12;

  // Handle Application Logic (WhatsApp Redirect)
  const handleApply = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const text = `*New Partner Application*\n\nAgency: ${fd.get('agency')}\nEmail: ${fd.get('email')}\nClients: ${fd.get('clients')}\nRegion: ${fd.get('region')}`;
    window.open(`https://wa.me/918329004424?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      
      {/* 1. HERO SECTION */}
      <div className="bg-yellow-400 border-b-2 border-black p-8 lg:p-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter mb-8 text-black leading-[0.9]">
                Partner <br className="lg:hidden"/> Ecosystem
            </h1>
            <div className="inline-block bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
                <p className="text-xl lg:text-2xl font-bold text-black">
                    Turn Security into a Recurring Revenue Stream.
                </p>
                <p className="font-mono text-sm text-gray-500 mt-2">
                    For MSPs, Agencies, and Security Consultants.
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 space-y-24">
        
        {/* 2. THE CORE OFFER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
                <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                    Why Partner <br/> With Sentinel?
                </h2>
                <p className="text-lg text-gray-700 font-medium max-w-md">
                    Stop reselling bloated enterprise software. Offer your SME clients a security suite built for their budget, while you keep the margins.
                </p>
                
                <div className="space-y-4">
                    <div className="flex gap-4 p-6 border-2 border-black bg-white hover:bg-gray-50 transition-all cursor-default">
                        <div className="bg-black text-white p-3 h-fit shrink-0"><DollarSign/></div>
                        <div>
                            <h3 className="font-bold text-xl uppercase">30% Recurring Commission</h3>
                            <p className="text-sm text-gray-600 mt-1">Earn lifetime commissions on every client you refer. We pay out monthly via Stripe.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-6 border-2 border-black bg-white hover:bg-gray-50 transition-all cursor-default">
                        <div className="bg-black text-white p-3 h-fit shrink-0"><Briefcase/></div>
                        <div>
                            <h3 className="font-bold text-xl uppercase">White Label Dashboard</h3>
                            <p className="text-sm text-gray-600 mt-1">Your logo, your domain (security.youragency.com). We stay in the background.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-6 border-2 border-black bg-white hover:bg-gray-50 transition-all cursor-default">
                        <div className="bg-black text-white p-3 h-fit shrink-0"><TrendingUp/></div>
                        <div>
                            <h3 className="font-bold text-xl uppercase">Upsell Opportunities</h3>
                            <p className="text-sm text-gray-600 mt-1">Use our "Audit Reports" to sell your own remediation and fixing services.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Form */}
            <div className="bg-white p-8 lg:p-10 border-2 border-black shadow-[12px_12px_0px_0px_#000] sticky top-28">
                <h3 className="font-black uppercase text-3xl mb-8 flex items-center gap-3">
                    <Users className="text-blue-600" size={32}/> Join the Alliance
                </h3>
                <form onSubmit={handleApply} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2">Agency Name</label>
                        <input name="agency" required className="w-full p-4 border-2 border-black bg-gray-50 focus:bg-white outline-none transition-colors" placeholder="Tech Solutions Pvt Ltd"/>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2">Work Email</label>
                        <input name="email" type="email" required className="w-full p-4 border-2 border-black bg-gray-50 focus:bg-white outline-none transition-colors" placeholder="partner@agency.com"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase mb-2">Clients</label>
                            <select name="clients" className="w-full p-4 border-2 border-black bg-gray-50 outline-none h-14">
                                <option>1 - 10</option>
                                <option>10 - 50</option>
                                <option>50+</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase mb-2">Region</label>
                            <select name="region" className="w-full p-4 border-2 border-black bg-gray-50 outline-none h-14">
                                <option>India</option>
                                <option>APAC</option>
                                <option>Global</option>
                            </select>
                        </div>
                    </div>
                    <Button type="submit" className="w-full py-4 text-lg bg-blue-600 text-white hover:bg-black hover:text-white border-black">
                        Submit Application
                    </Button>
                    <p className="text-xs text-center text-gray-400 font-mono">Review time: 24-48 Hours</p>
                </form>
            </div>
        </div>

        {/* 3. INTERACTIVE PARTNER TIERS */}
        <div>
            <h2 className="text-3xl lg:text-5xl font-black uppercase text-center mb-12">Partner Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Tier 1 */}
                <div 
                    onClick={() => setSelectedTier('Reseller')}
                    className={`cursor-pointer p-8 border-2 transition-all duration-300 ${selectedTier === 'Reseller' ? 'border-black shadow-[8px_8px_0px_0px_#000] scale-105 z-10 bg-gray-100' : 'border-gray-300 bg-white opacity-60 hover:opacity-100'}`}
                >
                    <div className="bg-gray-200 text-black px-4 py-1 text-xs font-bold uppercase inline-block mb-4 border border-black">Bronze</div>
                    <h3 className="text-3xl font-black mb-2 uppercase">Reseller</h3>
                    <p className="text-sm text-gray-600 mb-6 font-medium">For freelancers.</p>
                    <div className="text-5xl font-black mb-6">20%</div>
                    <ul className="space-y-3 text-sm font-bold text-gray-700">
                        <li className="flex items-center gap-2"><CheckCircle size={16}/> Referral Links</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16}/> Basic Dashboard</li>
                    </ul>
                </div>

                {/* Tier 2 */}
                <div 
                    onClick={() => setSelectedTier('Agency')}
                    className={`cursor-pointer p-8 border-2 transition-all duration-300 ${selectedTier === 'Agency' ? 'border-black shadow-[8px_8px_0px_0px_#2563eb] scale-105 z-10 bg-blue-50' : 'border-gray-300 bg-white opacity-60 hover:opacity-100'}`}
                >
                    <div className="bg-blue-600 text-white px-4 py-1 text-xs font-bold uppercase inline-block mb-4 border border-black">Silver (Recommended)</div>
                    <h3 className="text-3xl font-black mb-2 uppercase">Agency</h3>
                    <p className="text-sm text-gray-600 mb-6 font-medium">For MSPs & Agencies.</p>
                    <div className="text-5xl font-black mb-6 text-blue-600">30%</div>
                    <ul className="space-y-3 text-sm font-bold text-gray-700">
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-600"/> White Labeling</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-600"/> Multi-Tenant Portal</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-600"/> Dedicated Manager</li>
                    </ul>
                </div>

                {/* Tier 3 */}
                <div 
                    onClick={() => setSelectedTier('Distributor')}
                    className={`cursor-pointer p-8 border-2 transition-all duration-300 ${selectedTier === 'Distributor' ? 'border-black shadow-[8px_8px_0px_0px_#fbbf24] scale-105 z-10 bg-yellow-50' : 'border-gray-300 bg-white opacity-60 hover:opacity-100'}`}
                >
                    <div className="bg-yellow-400 text-black px-4 py-1 text-xs font-bold uppercase inline-block mb-4 border border-black">Gold</div>
                    <h3 className="text-3xl font-black mb-2 uppercase">Distributor</h3>
                    <p className="text-sm text-gray-600 mb-6 font-medium">For Regional Distros.</p>
                    <div className="text-5xl font-black mb-6 text-yellow-600">40%</div>
                    <ul className="space-y-3 text-sm font-bold text-gray-700">
                        <li className="flex items-center gap-2"><CheckCircle size={16}/> API Access</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16}/> Co-Marketing Funds</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* 4. FUNCTIONAL REVENUE SIMULATOR */}
        <div className="bg-white border-2 border-black p-8 lg:p-16">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-8">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-black uppercase mb-4 flex items-center gap-3">
                            <Calculator size={36} className="text-green-600"/> Revenue Simulator
                        </h2>
                        <p className="text-gray-600 font-medium">
                            Adjust the sliders to see your potential earnings based on the 
                            <span className={`mx-2 px-2 py-0.5 text-xs font-bold uppercase border border-black ${tiers[selectedTier].color} ${tiers[selectedTier].text}`}>
                                {selectedTier}
                            </span>
                            tier rate ({(tiers[selectedTier].rate * 100).toFixed(0)}%).
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between font-bold text-sm mb-2 uppercase">
                                <span>Clients Managed</span>
                                <span>{clients}</span>
                            </div>
                            <input 
                                type="range" min="5" max="200" step="5" value={clients}
                                onChange={(e) => setClients(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between font-bold text-sm mb-2 uppercase">
                                <span>Avg. Seat Price (₹)</span>
                                <span>₹{seatPrice.toLocaleString()} / mo</span>
                            </div>
                            <input 
                                type="range" min="1000" max="10000" step="500" value={seatPrice}
                                onChange={(e) => setSeatPrice(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-black text-white p-8 border-4 border-double border-gray-700 flex flex-col justify-center text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-xs font-bold uppercase text-gray-400 mb-2">Monthly Recurring Revenue</p>
                        <p className="text-5xl lg:text-6xl font-black text-green-400 mb-6">₹{commission.toLocaleString('en-IN')}</p>
                        
                        <div className="pt-6 border-t border-gray-700">
                            <p className="text-xs font-bold uppercase text-gray-400 mb-1">Annual Projected Earnings</p>
                            <p className="text-2xl font-bold text-white">₹{annualCommission.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 5. COMPETITIVE ADVANTAGE (US VS THEM) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <h2 className="text-4xl font-black uppercase mb-8">The Edge</h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-black text-white rounded-none border border-black mt-1"><Zap size={20}/></div>
                        <div>
                            <h4 className="font-bold uppercase text-lg">Lightweight Agent</h4>
                            <p className="text-sm text-gray-600">Competitors consume 400MB RAM. Sentinel consumes 40MB. We don't slow down client PCs.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-black text-white rounded-none border border-black mt-1"><Shield size={20}/></div>
                        <div>
                            <h4 className="font-bold uppercase text-lg">Ransomware Guarantee</h4>
                            <p className="text-sm text-gray-600">If a client gets infected while Sentinel is active, we cover the forensic costs.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-black text-white rounded-none border border-black mt-1"><Server size={20}/></div>
                        <div>
                            <h4 className="font-bold uppercase text-lg">Data Sovereignty</h4>
                            <p className="text-sm text-gray-600">All data stays in India (Mumbai/Pune Data Centers). Compliant with DPDP Act 2023.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Comparison Table */}
            <div className="bg-white border-2 border-black p-0 overflow-hidden">
                <table className="w-full text-sm font-bold text-left">
                    <thead className="bg-black text-white uppercase text-xs">
                        <tr>
                            <th className="p-4">Feature</th>
                            <th className="p-4 bg-blue-900">Sentinel</th>
                            <th className="p-4 text-gray-400">Legacy AV</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="p-4">White Labeling</td>
                            <td className="p-4 text-green-600">Included</td>
                            <td className="p-4 text-red-500">$$$ Add-on</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-4">Setup Time</td>
                            <td className="p-4 text-green-600">5 Mins</td>
                            <td className="p-4 text-red-500">2-3 Days</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-4">Min. Commit</td>
                            <td className="p-4 text-green-600">None</td>
                            <td className="p-4 text-red-500">50 Seats</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-4">Margin</td>
                            <td className="p-4 text-green-600">30-40%</td>
                            <td className="p-4 text-red-500">10-15%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* 6. TRAINING & CERTIFICATION */}
        <div className="bg-black text-white p-12 border-2 border-black text-center">
            <BookOpen size={48} className="mx-auto mb-6 text-yellow-400"/>
            <h2 className="text-4xl font-black uppercase mb-4">Sentinel Academy</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                We don't just give you software; we train your team. Get your engineers "Sentinel Certified" to handle Level 1 Incidents.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-gray-900 border border-gray-700 px-6 py-3 rounded-full text-sm font-bold">L1: Analyst</div>
                <div className="bg-gray-900 border border-gray-700 px-6 py-3 rounded-full text-sm font-bold">L2: Responder</div>
                <div className="bg-gray-900 border border-gray-700 px-6 py-3 rounded-full text-sm font-bold">L3: Architect</div>
            </div>
        </div>

        {/* 7. RESOURCE KIT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border-2 border-black">
                <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                    <Layers className="text-blue-600"/> Sales Kit
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                    We provide the collateral. You close the deal.
                </p>
                <ul className="space-y-4 font-mono text-sm">
                    <li className="flex justify-between border-b border-gray-200 pb-2 hover:pl-2 transition-all cursor-pointer">
                        <span>Pitch Deck (PDF)</span><Download size={16}/>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2 hover:pl-2 transition-all cursor-pointer">
                        <span>Email Scripts</span><Download size={16}/>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2 hover:pl-2 transition-all cursor-pointer">
                        <span>SME Case Studies</span><Download size={16}/>
                    </li>
                </ul>
            </div>
            <div className="bg-white p-8 border-2 border-black">
                <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                    <Settings className="text-blue-600"/> Tech Tools
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                    Integration and management tools for your team.
                </p>
                <ul className="space-y-4 font-mono text-sm font-bold">
                    <li className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full"></div> RMM Integration (ConnectWise)</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Provisioning REST API</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Slack / Teams Webhooks</li>
                </ul>
            </div>
        </div>

        {/* 8. CO-MARKETING ASSETS */}
        <div>
            <h2 className="text-3xl font-black uppercase mb-8">Co-Marketing Assets</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="h-32 bg-gray-200 border-2 border-black flex items-center justify-center font-bold uppercase text-xs text-gray-500 hover:bg-blue-100 transition-colors">LinkedIn Banners</div>
                <div className="h-32 bg-gray-200 border-2 border-black flex items-center justify-center font-bold uppercase text-xs text-gray-500 hover:bg-blue-100 transition-colors">One-Pagers</div>
                <div className="h-32 bg-gray-200 border-2 border-black flex items-center justify-center font-bold uppercase text-xs text-gray-500 hover:bg-blue-100 transition-colors">Case Study Template</div>
                <div className="h-32 bg-gray-200 border-2 border-black flex items-center justify-center font-bold uppercase text-xs text-gray-500 hover:bg-blue-100 transition-colors">Email Signatures</div>
            </div>
        </div>

        {/* 9. ONBOARDING STEPS */}
        <div className="text-center">
            <h2 className="text-3xl font-black uppercase mb-12">How to Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative p-6 border-2 border-black bg-white">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-black text-white flex items-center justify-center font-black border-2 border-white">1</div>
                    <h4 className="font-bold uppercase text-lg mb-2">Apply</h4>
                    <p className="text-xs text-gray-600">Fill out the form above. Verification takes 24 hours.</p>
                </div>
                <div className="hidden md:flex items-center justify-center"><ArrowRight size={32} className="text-gray-300"/></div>
                <div className="relative p-6 border-2 border-black bg-white">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-black text-white flex items-center justify-center font-black border-2 border-white">2</div>
                    <h4 className="font-bold uppercase text-lg mb-2">Onboard</h4>
                    <p className="text-xs text-gray-600">Get access to your Partner Portal and affiliate links.</p>
                </div>
                <div className="hidden md:flex items-center justify-center"><ArrowRight size={32} className="text-gray-300"/></div>
                <div className="relative p-6 border-2 border-black bg-white">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-black text-white flex items-center justify-center font-black border-2 border-white">3</div>
                    <h4 className="font-bold uppercase text-lg mb-2">Scale</h4>
                    <p className="text-xs text-gray-600">Deploy to clients and start tracking your recurring revenue.</p>
                </div>
            </div>
        </div>

        {/* 10. GLOBAL PRESENCE */}
        <div className="bg-blue-50 border-2 border-black p-8 text-center">
            <h3 className="font-black uppercase mb-4 flex items-center justify-center gap-2"><Globe/> Global Reach</h3>
            <p className="text-sm font-medium mb-4">Trusted by 200+ Agencies across 4 Continents.</p>
            <div className="flex justify-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            </div>
        </div>

        {/* 11. FAQ */}
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black uppercase mb-8 text-center flex items-center justify-center gap-2"><HelpCircle/> Partner FAQ</h2>
            <div className="space-y-4">
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold flex justify-between">Is there a minimum commitment? <span className="group-open:rotate-180 transition-transform">▼</span></summary>
                    <p className="mt-2 text-sm text-gray-600 pt-2 border-t border-gray-200">No. For the Bronze tier, you can start with just 1 client.</p>
                </details>
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold flex justify-between">How do I get paid? <span className="group-open:rotate-180 transition-transform">▼</span></summary>
                    <p className="mt-2 text-sm text-gray-600 pt-2 border-t border-gray-200">We process payouts monthly via Bank Transfer (India) or Stripe (Global) once you cross $100.</p>
                </details>
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold flex justify-between">Do you provide leads? <span className="group-open:rotate-180 transition-transform">▼</span></summary>
                    <p className="mt-2 text-sm text-gray-600 pt-2 border-t border-gray-200">Yes, specifically for Gold (Distributor) partners in their designated region.</p>
                </details>
            </div>
        </div>

        {/* 12. MISSION STATEMENT FOOTER (Updated Style) */}
        <div className="bg-indigo-900 text-white p-12 text-center border-2 border-black">
            <Target size={48} className="mx-auto mb-4 text-white"/>
            <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight mb-4">
                "We protect the businesses that build India."
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
                Join us in securing the supply chain. Sentinel Secure is committed to a 100% Channel-First strategy for the SME market.
            </p>
        </div>

      </div>
    </div>
  );
};

export default Partners;