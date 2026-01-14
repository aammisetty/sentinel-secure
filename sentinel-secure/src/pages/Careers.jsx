import React from 'react';
import Button from '../components/Button';
import { 
  Briefcase, Code, Terminal, Cpu, Globe, Zap, Coffee, 
  GitBranch, Shield, Award, BookOpen, Users, HelpCircle, 
  Monitor, Lock, MousePointer, DollarSign, Heart, ClipboardList
} from 'lucide-react';

const Careers = () => {
  const openRoles = [
    // --- ENGINEERING & SECURITY ---
    {
      title: "Senior Security Analyst",
      dept: "Red Team Operations",
      loc: "Remote (Pune HQ)",
      stack: "Burp Suite, Python, Bash",
      desc: "Lead penetration testing engagements and vulnerability assessments for enterprise clients.",
      color: "bg-red-50"
    },
    {
      title: "React Frontend Engineer",
      dept: "Product Engineering",
      loc: "Remote (India)",
      stack: "React, Tailwind, WebAssembly",
      desc: "Build pixel-perfect, high-performance dashboards with client-side cryptographic functions.",
      color: "bg-blue-50"
    },
    {
      title: "Backend Developer (Go)",
      dept: "Infrastructure",
      loc: "Remote (Global)",
      stack: "Golang, Docker, gRPC",
      desc: "Architect low-latency threat detection APIs and manage high-throughput event streams.",
      color: "bg-green-50"
    },
    // --- NON-TECHNICAL ROLES ---
    {
      title: "People Operations Lead",
      dept: "Human Resources",
      loc: "Remote (India)",
      stack: "Notion, LinkedIn Recruiter",
      desc: "Manage talent acquisition, remote culture building, and compliance for a distributed team.",
      color: "bg-yellow-50"
    },
    {
      title: "Finance Controller",
      dept: "Finance & Legal",
      loc: "Remote (Pune HQ)",
      stack: "QuickBooks, Stripe, GST",
      desc: "Handle SaaS revenue recognition, tax compliance, investor reporting, and payroll.",
      color: "bg-purple-50"
    },
    {
      title: "Business Ops Manager",
      dept: "Operations",
      loc: "Remote (Virtual Office)",
      stack: "Jira, Zapier, Slack",
      desc: "Streamline internal workflows, vendor management, and help scale our virtual infrastructure.",
      color: "bg-orange-50"
    }
  ];

  const perks = [
    { icon: <Monitor/>, title: "Choose Your Rig", text: "M3 Max MacBook Pro or high-end ThinkPad Linux beast." },
    { icon: <BookOpen/>, title: "Learning Budget", text: "₹50,000/yr for courses, certifications (OSCP/CISSP), and books." },
    { icon: <Globe/>, title: "Remote-First", text: "Work from anywhere. We care about shipping code/results, not seat time." },
    { icon: <Award/>, title: "Profit Sharing", text: "Quarterly bonuses based on company performance." },
  ];

  const stack = ["React", "Vite", "Tailwind", "Node.js", "Python", "Rust", "Go", "PostgreSQL", "Redis", "Docker", "AWS"];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      
      {/* 1. HERO SECTION */}
      <div className="bg-black text-white p-16 lg:p-24 text-center border-b-2 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
        <div className="relative z-10">
            <Briefcase size={64} className="mx-auto mb-6 text-blue-500"/>
            <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter mb-6">
            Join the <span className="text-blue-500">Sentinel</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
            We are building the digital immune system for Indian SMEs. 
            We need builders, breakers, and defenders.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-x-2 border-black bg-white">

        {/* 2. OUR DNA / MISSION */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-black">
            <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black bg-yellow-50">
                <Terminal size={32} className="mb-4 text-black"/>
                <h3 className="font-black text-xl uppercase mb-2">Hacker First</h3>
                <p className="text-sm text-gray-700">We value GitHub streaks and CTF rankings over university degrees. Show us your code.</p>
            </div>
            <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black bg-blue-50">
                <Shield size={32} className="mb-4 text-black"/>
                <h3 className="font-black text-xl uppercase mb-2">Defense in Depth</h3>
                <p className="text-sm text-gray-700">We don't sell snake oil. We build actual cryptographic tools that protect real businesses.</p>
            </div>
            <div className="p-8 bg-red-50">
                <Coffee size={32} className="mb-4 text-black"/>
                <h3 className="font-black text-xl uppercase mb-2">Zero Burnout</h3>
                <p className="text-sm text-gray-700">No crunch time. No weekend deployments. We play the long game.</p>
            </div>
        </div>

        {/* 3. OPEN POSITIONS */}
        <div className="p-8 lg:p-12 border-b-2 border-black">
            <h2 className="text-4xl font-black uppercase mb-8 flex items-center gap-3">
                <Users size={32}/> Open Positions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {openRoles.map((role, i) => (
                    <div key={i} className={`p-6 border-2 border-black neo-shadow ${role.color} flex flex-col justify-between`}>
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-black text-2xl leading-tight">{role.title}</h3>
                                <div className="p-2 bg-white border-2 border-black rounded-full">
                                    <GitBranch size={16}/>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-4 text-xs font-bold uppercase">
                                <span className="bg-black text-white px-2 py-1">{role.loc}</span>
                                <span className="bg-white border border-black px-2 py-1">{role.dept}</span>
                            </div>
                            <p className="text-sm text-gray-800 mb-4 font-medium">{role.desc}</p>
                            <p className="text-xs font-mono text-gray-600 mb-6">Stack: {role.stack}</p>
                        </div>
                        <Button 
                            className="w-full text-sm" 
                            onClick={() => window.location.href = `mailto:careers.sentinel@tuta.io?subject=Application for ${role.title}`}
                        >
                            Apply via Email
                        </Button>
                    </div>
                ))}
            </div>
            {/* General Application */}
            <div className="mt-8 p-6 bg-gray-900 text-white border-2 border-black text-center">
                <h3 className="font-bold text-xl mb-2">Don't see your role?</h3>
                <p className="text-gray-400 text-sm mb-4">We are always looking for talented generalists. Send us your resume and tell us what you want to build.</p>
                <a href="mailto:careers.sentinel@tuta.io" className="text-blue-400 font-bold hover:underline">careers.sentinel@tuta.io</a>
            </div>
        </div>

        {/* 4. THE HIRING PIPELINE */}
        <div className="p-8 lg:p-12 border-b-2 border-black bg-gray-50">
            <h2 className="text-3xl font-black uppercase mb-8 text-center">How We Hire</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="relative">
                    <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center mx-auto mb-4 font-black text-xl">1</div>
                    <h4 className="font-bold uppercase">Application</h4>
                    <p className="text-xs text-gray-600 mt-2">Resume + GitHub/LinkedIn. No cover letters.</p>
                </div>
                <div className="relative">
                    <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center mx-auto mb-4 font-black text-xl">2</div>
                    <h4 className="font-bold uppercase">Assessment</h4>
                    <p className="text-xs text-gray-600 mt-2">CTF Challenge (Tech) or Case Study (Ops/Finance).</p>
                </div>
                <div className="relative">
                    <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center mx-auto mb-4 font-black text-xl">3</div>
                    <h4 className="font-bold uppercase">Culture Fit</h4>
                    <p className="text-xs text-gray-600 mt-2">1-hour discussion on values and remote work ethics.</p>
                </div>
                <div className="relative">
                    <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center mx-auto mb-4 font-black text-xl">4</div>
                    <h4 className="font-bold uppercase">The Offer</h4>
                    <p className="text-xs text-gray-600 mt-2">Competitive salary + ESOPs + Remote setup.</p>
                </div>
            </div>
        </div>

        {/* 5. TECH STACK MARQUEE */}
        <div className="border-b-2 border-black overflow-hidden bg-black text-white py-6">
            <div className="flex justify-center gap-8 items-center flex-wrap px-4">
                <span className="font-bold uppercase text-blue-500 mr-4">Our Stack:</span>
                {stack.map((tech, i) => (
                    <span key={i} className="font-mono text-sm opacity-70 hover:opacity-100 cursor-default">{tech}</span>
                ))}
            </div>
        </div>

        {/* 6. PERKS & BENEFITS */}
        <div className="p-8 lg:p-12 border-b-2 border-black">
             <h2 className="text-3xl font-black uppercase mb-8">Sentinel Perks</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {perks.map((p, i) => (
                    <div key={i} className="p-6 border-2 border-black hover:bg-gray-50 transition-colors">
                        <div className="mb-4 text-blue-600">{p.icon}</div>
                        <h4 className="font-bold uppercase mb-2">{p.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{p.text}</p>
                    </div>
                ))}
             </div>
        </div>

        {/* 7. INTERNSHIP PROGRAM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b-2 border-black">
            <div className="p-12 bg-indigo-900 text-white flex flex-col justify-center">
                <h2 className="text-4xl font-black uppercase mb-4">Sentinel Academy</h2>
                <h3 className="text-xl font-bold text-indigo-300 mb-6">Summer Internship Program 2026</h3>
                <p className="mb-8 opacity-80">
                    A 3-month intensive bootcamp for final-year students. You will work on production code, hunt bugs, and learn offensive security.
                </p>
                <div className="flex gap-4 font-bold text-sm">
                    <div className="px-4 py-2 border border-white">Paid Stipend (₹25k)</div>
                    <div className="px-4 py-2 border border-white">PPO Opportunity</div>
                </div>
            </div>
            <div className="p-12 bg-white flex items-center justify-center">
                <div className="text-center w-full max-w-sm">
                    <h4 className="font-bold uppercase mb-4">Requirements</h4>
                    <ul className="text-left text-sm space-y-2 mb-8 list-disc pl-6">
                        <li>Strong grasp of Data Structures (DSA).</li>
                        <li>Basic knowledge of Networking (TCP/IP).</li>
                        <li>At least one deployed project (Web/App).</li>
                        <li>Passion for Cyber Security.</li>
                    </ul>
                    <Button className="w-full">Apply for Internship</Button>
                </div>
            </div>
        </div>

        {/* 8. FAQ SECTION */}
        <div className="p-8 lg:p-12 border-b-2 border-black bg-gray-50">
            <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-2">
                <HelpCircle/> Applicant FAQ
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold flex justify-between">Do you offer visa sponsorship? <span className="group-open:rotate-180 transition-transform">▼</span></summary>
                    <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-100">Currently, we can only hire candidates authorized to work in India.</p>
                </details>
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold flex justify-between">Is the work completely remote? <span className="group-open:rotate-180 transition-transform">▼</span></summary>
                    <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-100">Yes. We are a "Virtual Office" company. While our registered HQ is in Pune, all roles are remote-first.</p>
                </details>
                <details className="bg-white border-2 border-black p-4 cursor-pointer group">
                    <summary className="font-bold flex justify-between">What is the interview language? <span className="group-open:rotate-180 transition-transform">▼</span></summary>
                    <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-100">JavaScript (React/Node) or Python. We don't ask you to invert binary trees on a whiteboard.</p>
                </details>
            </div>
        </div>

        {/* 9. CTO'S NOTE */}
        <div className="p-12 text-center bg-yellow-50">
            <div className="max-w-3xl mx-auto">
                <p className="text-2xl font-black italic mb-6">
                    "We don't hire employees; we hire owners. If you want to build security tools that actually make a difference and aren't just 'compliance checkboxes', you belong here."
                </p>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-full"></div> {/* Placeholder for Avatar */}
                    <div className="text-left">
                        <p className="font-bold uppercase">Arun Ammisetty</p>
                        <p className="text-xs font-mono text-gray-600">Founder & Lead Engineer</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 10. CALL TO ACTION */}
        <div className="p-12 bg-black text-white text-center">
            <h2 className="text-4xl font-black uppercase mb-6">Ready to Ship?</h2>
            <p className="mb-8 text-gray-400">Send your resume, GitHub/LinkedIn, and a meme (optional but encouraged).</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button className="bg-white text-black hover:bg-gray-200 border-white">
                    <MousePointer className="mr-2" size={18}/> Apply Now
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                    Read Engineering Blog
                </Button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Careers;