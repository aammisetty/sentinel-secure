import React from 'react';
import { 
  Download, Image, PenTool, FileText, User, 
  Video, Award, Globe, MessageSquare, Shield, 
  Type, Layers, ExternalLink, Mail, Camera
} from 'lucide-react';
import Button from '../components/Button';

const Press = () => {
  return (
    <div className="pt-48 min-h-screen bg-gray-50 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. HERO HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 border-b-2 border-black pb-12 gap-10 mt-8">
            <div className="max-w-3xl">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-8 text-black leading-[0.8] break-words">
                    Media Kit
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl">
                    Official brand assets, product screenshots, executive bios, and press resources for Sentinel Secure.
                </p>
            </div>
            <Button className="w-full lg:w-auto py-5 px-10 text-lg bg-black text-white hover:bg-blue-600 border-2 border-black whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                <Download className="mr-3" size={24}/> Download Full Kit (ZIP)
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* LEFT COLUMN (Main Assets) */}
            <div className="lg:col-span-2 space-y-24">
                
                {/* 2. BOILERPLATE (About) */}
                <section>
                    <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3 border-l-8 border-blue-600 pl-4">
                        <FileText className="text-blue-600"/> Boilerplate
                    </h2>
                    <div className="bg-white p-8 md:p-10 border-2 border-black shadow-[8px_8px_0px_0px_#000]">
                        <p className="text-lg leading-relaxed text-gray-800 mb-6">
                            <strong>Sentinel Secure</strong> is India's leading "Local-First" cyber security platform tailored specifically for Small and Medium Enterprises (SMEs). Founded in 2026, Sentinel democratizes enterprise-grade forensics, offering ransomware protection, file analysis, and network auditing tools directly within the browser using WebAssembly technology.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-800 mb-8">
                            Headquartered in Pune, Maharashtra, Sentinel serves over 200+ partners and protects critical digital infrastructure through a zero-knowledge privacy architecture.
                        </p>
                        <div className="flex flex-wrap gap-6 border-t border-gray-200 pt-6">
                            <button className="text-sm font-bold uppercase text-blue-600 hover:text-black transition-colors flex items-center gap-2 group">
                                <span className="group-hover:underline">Copy Text</span> <Download size={16}/> 
                            </button>
                            <button className="text-sm font-bold uppercase text-blue-600 hover:text-black transition-colors flex items-center gap-2 group">
                                <span className="group-hover:underline">Download PDF</span> <Download size={16}/>
                            </button>
                        </div>
                    </div>
                </section>

                {/* 3. LOGOS */}
                <section>
                    <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3 border-l-8 border-blue-600 pl-4">
                        <Image className="text-blue-600"/> Brand Logos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border-2 border-dashed border-gray-400 bg-gray-50 flex flex-col items-center justify-center min-h-[240px] group hover:bg-white transition-colors">
                            <h3 className="text-5xl font-black uppercase mb-6 tracking-tighter">Sentinel</h3>
                            <Button variant="outline" className="text-xs bg-white hover:bg-black hover:text-white transition-colors"><Download size={14} className="mr-2"/> Download SVG (Black)</Button>
                        </div>
                        <div className="p-8 bg-black border-2 border-black flex flex-col items-center justify-center min-h-[240px] group">
                            <h3 className="text-5xl font-black uppercase text-white mb-6 tracking-tighter">Sentinel</h3>
                            <Button variant="secondary" className="text-xs hover:bg-blue-600 hover:text-white transition-colors"><Download size={14} className="mr-2"/> Download SVG (White)</Button>
                        </div>
                    </div>
                </section>

                {/* 4. PRODUCT SCREENSHOTS */}
                <section>
                    <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3 border-l-8 border-blue-600 pl-4">
                        <Layers className="text-blue-600"/> Product Shots
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="aspect-video bg-gray-100 border-2 border-black flex items-center justify-center group cursor-pointer overflow-hidden relative shadow-sm hover:shadow-[4px_4px_0px_0px_#000] transition-shadow">
                            <div className="text-gray-400 font-black uppercase text-xl z-10 group-hover:opacity-0 transition-opacity">Dashboard UI</div>
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button className="text-white border-white hover:bg-white hover:text-black"><Download className="mr-2"/> Download Hi-Res</Button>
                            </div>
                        </div>
                        <div className="aspect-video bg-gray-100 border-2 border-black flex items-center justify-center group cursor-pointer overflow-hidden relative shadow-sm hover:shadow-[4px_4px_0px_0px_#000] transition-shadow">
                            <div className="text-gray-400 font-black uppercase text-xl z-10 group-hover:opacity-0 transition-opacity">File Scanner</div>
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button className="text-white border-white hover:bg-white hover:text-black"><Download className="mr-2"/> Download Hi-Res</Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. TYPOGRAPHY */}
                <section>
                    <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3 border-l-8 border-blue-600 pl-4">
                        <Type className="text-blue-600"/> Typography
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 border-2 border-black h-full flex flex-col justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">Primary Font</p>
                                <h3 className="text-6xl font-sans font-black mb-4">Inter</h3>
                            </div>
                            <p className="text-sm text-gray-600 font-medium border-t border-gray-200 pt-4">Used for headlines, body text, and UI elements. Clean, modern, and legible.</p>
                        </div>
                        <div className="bg-white p-8 border-2 border-black h-full flex flex-col justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">Monospace / Code</p>
                                <h3 className="text-5xl font-mono font-bold mb-4 tracking-tighter">JetBrains Mono</h3>
                            </div>
                            <p className="text-sm text-gray-600 font-medium border-t border-gray-200 pt-4">Used for code snippets, logs, terminal outputs, and technical data.</p>
                        </div>
                    </div>
                </section>

                {/* 6. FOUNDER BIOS */}
                <section>
                    <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3 border-l-8 border-blue-600 pl-4">
                        <User className="text-blue-600"/> Leadership
                    </h2>
                    <div className="bg-white border-2 border-black p-8 flex flex-col md:flex-row gap-8 items-start shadow-[8px_8px_0px_0px_#000]">
                        <div className="w-32 h-32 bg-gray-200 border-2 border-black shrink-0 flex items-center justify-center text-gray-400">
                            <Camera size={32}/>
                        </div> 
                        <div>
                            <h3 className="text-3xl font-black uppercase mb-1">Arun Ammisetty</h3>
                            <p className="text-sm font-bold text-blue-600 uppercase mb-4 tracking-wider">Founder & Lead Engineer</p>
                            <p className="text-base text-gray-700 leading-relaxed mb-6 font-medium">
                                Arun is a cyber security researcher and full-stack engineer with a focus on offensive security and cryptography. He founded Sentinel Secure to bridge the gap between enterprise-grade tools and SME accessibility in the Indian market.
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <a href="https://linkedin.com/in/arun-ammisetty" className="text-xs font-bold uppercase hover:text-blue-600 flex items-center gap-2 border-b-2 border-transparent hover:border-blue-600 transition-all"><ExternalLink size={14}/> LinkedIn</a>
                                <a href="#" className="text-xs font-bold uppercase hover:text-blue-600 flex items-center gap-2 border-b-2 border-transparent hover:border-blue-600 transition-all"><ExternalLink size={14}/> Twitter</a>
                                <a href="#" className="text-xs font-bold uppercase hover:text-blue-600 flex items-center gap-2 border-b-2 border-transparent hover:border-blue-600 transition-all"><Download size={14}/> Bio (PDF)</a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* RIGHT COLUMN (Sidebar Info) */}
            <div className="space-y-16">
                
                {/* 7. COLORS */}
                <section>
                    <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-3 border-l-8 border-black pl-4">
                        <PenTool className="text-black"/> Palette
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-20 h-20 bg-black border-2 border-black shadow-sm group-hover:scale-105 transition-transform"></div>
                            <div>
                                <p className="font-bold text-lg">Void Black</p>
                                <p className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-1 inline-block mt-1">#000000</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-20 h-20 bg-blue-600 border-2 border-black shadow-sm group-hover:scale-105 transition-transform"></div>
                            <div>
                                <p className="font-bold text-lg">Cyber Blue</p>
                                <p className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-1 inline-block mt-1">#2563EB</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-20 h-20 bg-green-500 border-2 border-black shadow-sm group-hover:scale-105 transition-transform"></div>
                            <div>
                                <p className="font-bold text-lg">Terminal Green</p>
                                <p className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-1 inline-block mt-1">#22C55E</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group cursor-pointer">
                            <div className="w-20 h-20 bg-red-600 border-2 border-black shadow-sm group-hover:scale-105 transition-transform"></div>
                            <div>
                                <p className="font-bold text-lg">Alert Red</p>
                                <p className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-1 inline-block mt-1">#DC2626</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. PRESS CONTACT */}
                <div className="bg-black text-white p-8 border-2 border-black relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Mail size={120}/>
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2 relative z-10">
                        Press Contact
                    </h3>
                    <p className="text-sm text-gray-400 mb-8 relative z-10 font-medium">
                        For interviews, comments, or speaking inquiries.
                    </p>
                    <div className="space-y-4 text-sm font-mono relative z-10">
                        <div>
                            <p className="font-bold text-white uppercase text-xs mb-1">Media Relations</p>
                            <a href="mailto:press.sentinel@tuta.io" className="block text-blue-400 hover:text-white transition-colors text-lg">press.sentinel@tuta.io</a>
                        </div>
                        <div className="pt-4 border-t border-gray-800">
                            <p className="font-bold text-white uppercase text-xs mb-1">Emergency Hotline</p>
                            <p className="text-green-400 text-lg">+91 83290 04424</p>
                        </div>
                    </div>
                </div>

                {/* 9. AWARDS */}
                <section>
                    <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-3 border-l-8 border-black pl-4">
                        <Award className="text-black"/> Recognition
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-white border-2 border-black p-5 flex items-start gap-4 hover:bg-yellow-50 transition-colors cursor-default">
                            <div className="bg-yellow-400 p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000]"><Award size={20}/></div>
                            <div>
                                <p className="font-black text-base uppercase">Top 10 Security Startups</p>
                                <p className="text-xs text-gray-600 font-mono mt-1">Pune Tech Summit 2025</p>
                            </div>
                        </div>
                        <div className="bg-white border-2 border-black p-5 flex items-start gap-4 hover:bg-blue-50 transition-colors cursor-default">
                            <div className="bg-blue-600 text-white p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000]"><Shield size={20}/></div>
                            <div>
                                <p className="font-black text-base uppercase">Best Forensic Tool</p>
                                <p className="text-xs text-gray-600 font-mono mt-1">Cyber Defense Awards</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 10. SOCIAL ASSETS */}
                <section>
                    <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-3 border-l-8 border-black pl-4">
                        <Globe className="text-black"/> Social Media
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white h-32 border-2 border-black flex flex-col items-center justify-center cursor-pointer hover:bg-blue-600 hover:text-white transition-all group">
                            <p className="text-xs font-black uppercase mb-2">LinkedIn</p>
                            <Download size={20} className="group-hover:scale-110 transition-transform"/>
                        </div>
                        <div className="bg-white h-32 border-2 border-black flex flex-col items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all group">
                            <p className="text-xs font-black uppercase mb-2">Twitter / X</p>
                            <Download size={20} className="group-hover:scale-110 transition-transform"/>
                        </div>
                    </div>
                </section>

            </div>
        </div>

        {/* 11. IN THE NEWS */}
        <div className="mt-24 pt-16 border-t-4 border-black">
            <h2 className="text-4xl lg:text-5xl font-black uppercase mb-12 text-center flex flex-col md:flex-row items-center justify-center gap-4">
                <MessageSquare size={48} className="text-blue-600"/> In The News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border-2 border-black p-8 hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all cursor-pointer group">
                        <p className="text-xs font-bold text-blue-600 uppercase mb-4 tracking-widest border-b border-gray-200 pb-2">TechCrunch • Jan 2026</p>
                        <h3 className="text-xl font-bold mb-6 leading-tight group-hover:text-blue-600 transition-colors">"Sentinel Secure is changing how Indian SMEs fight ransomware."</h3>
                        <span className="text-sm font-black uppercase flex items-center gap-2 group-hover:underline">
                            Read Article <ExternalLink size={14}/>
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* 12. B-ROLL FOOTER */}
        <div className="mt-24 bg-gray-900 text-white p-16 text-center border-2 border-black relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="relative z-10 flex flex-col items-center justify-center">
                <Video size={64} className="mx-auto mb-6 text-green-400"/>
                <h2 className="text-4xl lg:text-5xl font-black uppercase mb-6 tracking-tight">Need Video B-Roll?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
                    Download 4K footage of our dashboard in action, office shots, and server room visuals for your broadcast coverage.
                </p>
                <div className="flex justify-center w-full">
                    <Button className="bg-white text-black hover:bg-green-400 border-white text-lg py-4 px-12 inline-flex items-center justify-center">
                        <Video className="mr-2" size={20}/> Access Video Library
                    </Button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Press;