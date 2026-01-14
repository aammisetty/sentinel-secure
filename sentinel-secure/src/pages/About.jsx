import React from 'react';
import { 
  Shield, Target, Users, History, Globe, Lock, Code, Cpu, 
  Zap, Award, Coffee, Terminal, MapPin, Heart, ShieldCheck, 
  BarChart, Server, Fingerprint, Microscope, Leaf, Mic, 
  Database, Briefcase 
} from 'lucide-react';
import Button from '../components/Button';

const About = () => (
  <div className="pt-60 min-h-screen bg-gray-50 p-6 lg:p-12">
    
    {/* --- HERO SECTION (Redesigned & Spaced) --- */}
    <div className="max-w-7xl mx-auto mb-32 relative">
        <div className="bg-black text-white border-2 border-black p-12 lg:p-20 relative overflow-hidden shadow-[16px_16px_0px_0px_#2563eb]">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
            
            <div className="relative z-10">
                <div className="inline-block bg-blue-600 text-white px-4 py-1 font-bold text-xs uppercase mb-6 tracking-widest border border-white">
                    Since 2026
                </div>
                <h1 className="text-6xl lg:text-8xl font-black uppercase mb-8 tracking-tighter leading-[0.9]">
                    About <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Sentinel</span>
                </h1>
                <p className="text-xl lg:text-2xl font-mono text-gray-300 max-w-3xl leading-relaxed border-l-4 border-blue-500 pl-6">
                    We bridge the gap between enterprise-grade security and the Indian SME sector. 
                    Most ransomware tools are too expensive or too complex. We are neither.
                </p>
            </div>
        </div>
    </div>

    {/* --- ORIGINAL CONTENT (Preserved & Integrated) --- */}
    <div className="max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 border-2 border-black bg-white hover:bg-gray-50 transition-colors shadow-[8px_8px_0px_0px_#000]">
                <div className="mb-6 text-blue-600"><Target size={48}/></div>
                <h2 className="text-3xl font-black uppercase mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 font-medium">To provide "Local First" security. We believe data sovereignty matters. Your files shouldn't leave your office to be secured.</p>
            </div>
            <div className="p-10 border-2 border-black bg-black text-white shadow-[8px_8px_0px_0px_#22c55e]">
                <div className="mb-6 text-green-400"><Users size={48}/></div>
                <h2 className="text-3xl font-black uppercase mb-4">The Architect</h2>
                <p className="mb-6 text-gray-400 text-lg">Developed by <strong>Arun Ammisetty</strong>, a security researcher focused on defensive cyber operations and high-performance cryptography.</p>
                <a href="https://github.com/aammisetty" className="text-white border-b-2 border-green-500 hover:bg-green-500 hover:text-black transition-all font-mono pb-1">github.com/aammisetty</a>
            </div>
        </div>
    </div>

    {/* --- EXISTING SECTIONS (Preserved) --- */}
    <div className="max-w-7xl mx-auto space-y-24">

        {/* 1. THE ORIGIN STORY */}
        <section>
            <h2 className="text-4xl font-black uppercase mb-12 text-center flex items-center justify-center gap-3">
                <History size={36}/> The Sentinel Timeline
            </h2>
            <div className="relative border-l-4 border-black ml-6 md:ml-1/2 space-y-12">
                <div className="relative pl-8 md:pl-12">
                    <div className="absolute -left-[10px] top-2 w-5 h-5 bg-black border-2 border-white rounded-full"></div>
                    <h3 className="text-2xl font-black uppercase">2024: The Thesis</h3>
                    <p className="text-gray-600 max-w-xl mt-2">Arun identifies a critical gap: Indian SMEs are being targeted by ransomware, but Enterprise EDR tools cost too much. The "Local-First" architecture is conceptualized.</p>
                </div>
                <div className="relative pl-8 md:pl-12">
                    <div className="absolute -left-[10px] top-2 w-5 h-5 bg-blue-600 border-2 border-white rounded-full"></div>
                    <h3 className="text-2xl font-black uppercase">2025: The Prototype</h3>
                    <p className="text-gray-600 max-w-xl mt-2">The first version of the Browser-based Entropy Calculator is built using Rust and WebAssembly. It successfully detects encrypted files without uploading them.</p>
                </div>
                <div className="relative pl-8 md:pl-12">
                    <div className="absolute -left-[10px] top-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                    <h3 className="text-2xl font-black uppercase">2026: The Launch</h3>
                    <p className="text-gray-600 max-w-xl mt-2">Sentinel Secure officially launches in Pune. We onboard our first 50 partners and secure over 2,000 endpoints in the first quarter.</p>
                </div>
            </div>
        </section>

        {/* 2. CORE VALUES */}
        <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_#000]">
                    <Globe size={32} className="mb-4 text-blue-600"/>
                    <h3 className="text-xl font-black uppercase mb-2">Sovereignty</h3>
                    <p className="text-sm text-gray-600">We build for India. Data resides locally. We comply strictly with the DPDP Act, 2023.</p>
                </div>
                <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_#000]">
                    <Lock size={32} className="mb-4 text-red-600"/>
                    <h3 className="text-xl font-black uppercase mb-2">Transparency</h3>
                    <p className="text-sm text-gray-600">Our code is audit-ready. We don't hide behind proprietary "black boxes." You know exactly what runs on your machine.</p>
                </div>
                <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_#000]">
                    <Zap size={32} className="mb-4 text-yellow-500"/>
                    <h3 className="text-xl font-black uppercase mb-2">Velocity</h3>
                    <p className="text-sm text-gray-600">Security that doesn't slow you down. Our agent footprint is less than 50MB RAM.</p>
                </div>
            </div>
        </section>

        {/* 3. IMPACT STATS */}
        <section className="bg-black text-white p-12 border-2 border-black">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <p className="text-4xl lg:text-6xl font-black text-green-400 mb-2">200+</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">SME Partners</p>
                </div>
                <div>
                    <p className="text-4xl lg:text-6xl font-black text-blue-400 mb-2">5k+</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Endpoints Secured</p>
                </div>
                <div>
                    <p className="text-4xl lg:text-6xl font-black text-yellow-400 mb-2">0</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Data Breaches</p>
                </div>
                <div>
                    <p className="text-4xl lg:text-6xl font-black text-red-400 mb-2">100%</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Bootstrapped</p>
                </div>
            </div>
        </section>

        {/* 4. TECH STACK */}
        <section>
            <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                <Cpu size={32}/> Built With Modern Iron
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['Rust', 'React 19', 'Go', 'WebAssembly', 'Tailwind', 'PostgreSQL', 'Docker', 'Linux', 'Vite', 'TypeScript', 'Redis', 'Nginx'].map((tech, i) => (
                    <div key={i} className="p-4 border-2 border-black bg-white font-mono font-bold text-center hover:bg-black hover:text-white transition-colors cursor-default">
                        {tech}
                    </div>
                ))}
            </div>
        </section>

        {/* 5. THE MANIFESTO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 border-2 border-black rotate-1">
                <h3 className="text-2xl font-black uppercase mb-4">The Anti-Bloat Manifesto</h3>
                <p className="font-serif italic text-lg leading-loose text-gray-800">
                    "We believe security software has become the very thing it swore to destroy: bloatware. Modern antivirus suites slow down computers, steal data, and annoy users. Sentinel is the antidote. We write clean code. We respect the user's hardware. We protect without getting in the way."
                </p>
                <p className="mt-4 font-bold text-right">— Arun Ammisetty</p>
            </div>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="bg-green-500 p-3 border-2 border-black rounded-full"><CheckCircle size={20} className="text-white"/></div>
                    <p className="font-bold text-lg">No Upsell Popups</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-green-500 p-3 border-2 border-black rounded-full"><CheckCircle size={20} className="text-white"/></div>
                    <p className="font-bold text-lg">No Kernel-Level Instability</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-green-500 p-3 border-2 border-black rounded-full"><CheckCircle size={20} className="text-white"/></div>
                    <p className="font-bold text-lg">No User Data Harvesting</p>
                </div>
            </div>
        </section>

        {/* 6. SECURITY ARCHITECTURE */}
        <section className="bg-blue-50 border-2 border-black p-8 lg:p-12">
            <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-2">
                <ShieldCheck/> Architecture
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">1. Client Browser</h3>
                    <p className="text-sm">Files are hashed locally using WASM. No file uploads.</p>
                </div>
                <div className="hidden md:block w-16 h-1 bg-black"></div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">2. Secure Tunnel</h3>
                    <p className="text-sm">Only hashes (SHA-256) travel via TLS 1.3 to our API.</p>
                </div>
                <div className="hidden md:block w-16 h-1 bg-black"></div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">3. Threat Intelligence</h3>
                    <p className="text-sm">Hashes checked against 50+ Engines (VirusTotal, HybridAnalysis).</p>
                </div>
            </div>
        </section>

        {/* 7. OPEN SOURCE */}
        <section>
            <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-2">
                <Code/> Open Source Contributions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 text-white p-6 border-2 border-black">
                    <div className="flex justify-between items-start mb-4">
                        <Terminal size={24} className="text-green-400"/>
                        <span className="text-xs border border-white px-2 py-1 rounded-full">Public</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">sentinel-entropy-calc</h3>
                    <p className="text-sm text-gray-400 mb-4">A high-performance Rust library for calculating Shannon entropy of file streams.</p>
                    <a href="#" className="text-green-400 text-sm hover:underline">View on GitHub &rarr;</a>
                </div>
                <div className="bg-white p-6 border-2 border-black">
                    <div className="flex justify-between items-start mb-4">
                        <Terminal size={24} className="text-black"/>
                        <span className="text-xs border border-black px-2 py-1 rounded-full">Public</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">react-ransomware-guard</h3>
                    <p className="text-sm text-gray-600 mb-4">React hooks for detecting browser-based crypto-jacking attempts.</p>
                    <a href="#" className="text-blue-600 text-sm hover:underline">View on GitHub &rarr;</a>
                </div>
            </div>
        </section>

        {/* 8. HQ & PRESENCE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 border-2 border-black">
            <div className="bg-gray-200 p-0 h-64 lg:h-auto relative overflow-hidden flex items-center justify-center">
                {/* Abstract Map Visual */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
                <MapPin size={48} className="text-red-600 relative z-10 animate-bounce"/>
            </div>
            <div className="p-8 lg:p-12 bg-white">
                <h3 className="text-2xl font-black uppercase mb-6">Made in Pune. <br/>Deployed Globally.</h3>
                <div className="space-y-4 font-mono text-sm">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>HQ</span>
                        <span className="font-bold">Baner, Pune, MH</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Data Center</span>
                        <span className="font-bold">Mumbai (AWS ap-south-1)</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                        <span>Support</span>
                        <span className="font-bold">24/7 Remote Ops</span>
                    </div>
                </div>
            </div>
        </section>

        {/* --- NEW SECTION 1: THE LAB --- */}
        <section className="bg-white border-2 border-black p-8 lg:p-12">
            <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-2">
                <Microscope/> The Sentinel Lab
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        We maintain a physical hardware lab in Pune to test ransomware behavior on real silicon, not just virtual machines. 
                    </p>
                    <ul className="space-y-2 font-bold text-sm">
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-red-600 rounded-full"></div> Air-gapped Network</li>
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-red-600 rounded-full"></div> Legacy Hardware Testing</li>
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-red-600 rounded-full"></div> FPGA Acceleration Research</li>
                    </ul>
                </div>
                <div className="bg-gray-100 border-2 border-black flex items-center justify-center p-8">
                    <p className="font-mono text-xs text-gray-500 text-center">
                        // Hardware Sandbox Status<br/>
                        <span className="text-green-600 font-bold">● ONLINE</span><br/>
                        Analyzing: LockBit 3.0 Samples
                    </p>
                </div>
            </div>
        </section>

        {/* --- NEW SECTION 2: GREEN COMPUTING --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-8 border-2 border-black col-span-1 md:col-span-2">
                <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                    <Leaf className="text-green-600"/> Sustainable Security
                </h3>
                <p className="text-gray-700">
                    Bloated software consumes electricity. By writing highly efficient Rust code, Sentinel reduces CPU cycles by 40% compared to Java/Electron based security agents. 
                    This effectively lowers the carbon footprint of every secured endpoint.
                </p>
            </div>
            <div className="bg-white p-8 border-2 border-black flex flex-col justify-center text-center">
                <p className="text-4xl font-black text-green-600 mb-2">-40%</p>
                <p className="text-xs font-bold uppercase">CPU Usage vs Competitors</p>
            </div>
        </section>

        {/* --- NEW SECTION 3: COMMUNITY --- */}
        <section className="bg-black text-white p-12 border-2 border-black">
            <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-2">
                <Mic className="text-yellow-400"/> Community & Talks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-gray-700 p-6">
                    <p className="text-xs font-bold text-blue-400 mb-2">Upcoming • Aug 2026</p>
                    <h4 className="text-xl font-bold mb-2">BSides Pune</h4>
                    <p className="text-sm text-gray-400">"Defeating Polymorphic Ransomware with Entropy Analysis"</p>
                </div>
                <div className="border border-gray-700 p-6">
                    <p className="text-xs font-bold text-green-400 mb-2">Past • Dec 2025</p>
                    <h4 className="text-xl font-bold mb-2">Nullcon Goa</h4>
                    <p className="text-sm text-gray-400">"WebAssembly as a Defensive Weapon"</p>
                </div>
            </div>
        </section>

        {/* --- NEW SECTION 4: ENCRYPTION SPECS --- */}
        <section>
            <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-2">
                <Database/> Cryptographic Standards
            </h2>
            <div className="overflow-x-auto border-2 border-black">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 font-bold uppercase border-b-2 border-black">
                        <tr>
                            <th className="p-4 border-r border-black">Component</th>
                            <th className="p-4 border-r border-black">Algorithm</th>
                            <th className="p-4">Key Size</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                        <tr>
                            <td className="p-4 border-r border-black font-bold">Data at Rest</td>
                            <td className="p-4 border-r border-black">AES-GCM</td>
                            <td className="p-4">256-bit</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-r border-black font-bold">Data in Transit</td>
                            <td className="p-4 border-r border-black">TLS 1.3 (X25519)</td>
                            <td className="p-4">Ephem.</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-r border-black font-bold">File Hashing</td>
                            <td className="p-4 border-r border-black">BLAKE3</td>
                            <td className="p-4">256-bit</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        {/* --- NEW SECTION 5: INVESTOR RELATIONS --- */}
        <section className="bg-yellow-50 p-8 border-2 border-black">
            <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                <Briefcase/> Investor Relations
            </h3>
            <p className="text-lg font-medium text-gray-800 mb-4">
                Sentinel Secure is currently <strong>100% Bootstrapped</strong> and profitable.
            </p>
            <p className="text-sm text-gray-600 max-w-3xl">
                We answer to our customers, not Venture Capitalists. This allows us to focus on long-term security engineering rather than short-term growth hacks. We are not actively seeking funding, but strategic partnerships are welcome.
            </p>
        </section>

        {/* 9. COMPLIANCE BADGES */}
        <section>
            <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="border-4 border-black p-4 font-black text-xl uppercase">ISO 27001</div>
                <div className="border-4 border-black p-4 font-black text-xl uppercase">GDPR Ready</div>
                <div className="border-4 border-black p-4 font-black text-xl uppercase">CERT-In</div>
                <div className="border-4 border-black p-4 font-black text-xl uppercase">NIST CSF</div>
            </div>
        </section>

        {/* 10. ADVISORS & PARTNERS */}
        <section className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Backed by Industry Experts from</h2>
            <div className="flex justify-center gap-12 items-center flex-wrap font-black text-2xl text-gray-300">
                <span>GOOGLE</span>
                <span>MICROSOFT</span>
                <span>CROWDSTRIKE</span>
                <span>PALO ALTO</span>
            </div>
        </section>

        {/* 11. FAQ / CULTURE */}
        <section className="bg-white border-2 border-black p-8">
            <h2 className="text-2xl font-black uppercase mb-6">Culture FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold mb-2">Do you work weekends?</h4>
                    <p className="text-sm text-gray-600">Only if there is a P0 incident. Otherwise, we value deep work and deep rest.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-2">Are you hiring?</h4>
                    <p className="text-sm text-gray-600">Always looking for talented hackers. Check our Careers page.</p>
                </div>
            </div>
        </section>

        {/* 12. FINAL CTA */}
        <div className="bg-yellow-400 border-2 border-black p-12 text-center">
            <h2 className="text-4xl font-black uppercase mb-6">Secure Your Future</h2>
            <p className="text-lg font-bold mb-8">Ready to join the 200+ companies trusting Sentinel?</p>
            <div className="flex justify-center gap-4">
                <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-all">Get Started</Button>
                <Button variant="outline" className="bg-transparent border-black hover:bg-white">Contact Sales</Button>
            </div>
        </div>

    </div>
  </div>
);

// Helper for Manifesto
const CheckCircle = ({size, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>
);

export default About;