import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Shield, Terminal, Globe, Lock, FileText, 
  Users, HelpCircle, Scale, Server, Briefcase, Database
} from 'lucide-react';

const Sitemap = () => {
  const sitemapData = [
    {
      icon: <Home size={20}/>,
      title: "Core Platform",
      links: [
        { name: "Home Page", path: "/" },
        { name: "Dashboard Portal", path: "/dashboard" },
        { name: "User Settings", path: "/settings" },
        { name: "Audit Report", path: "/audit" }
      ]
    },
    {
      icon: <Users size={20}/>,
      title: "Authentication",
      links: [
        { name: "Login", path: "/login" },
        { name: "Create Account", path: "/signup" },
        { name: "Forgot Password", path: "/login" } 
      ]
    },
    {
      icon: <Terminal size={20}/>,
      title: "Forensic Tools",
      links: [
        { name: "AES File Encrypt", path: "/tools/file-encrypt" },
        { name: "Incident Logger", path: "/tools/incident-log" },
        { name: "WebRTC Leak Test", path: "/tools/webrtc-leak" }
      ]
    },
    {
      icon: <Globe size={20}/>,
      title: "Network Utilities",
      links: [
        { name: "IP Address Lookup", path: "/tools/ip-lookup" },
        { name: "Speed Test", path: "/tools/speed-test" },
        { name: "Browser Fingerprint", path: "/tools/browser-check" }
      ]
    },
    {
      icon: <Lock size={20}/>,
      title: "Identity Security",
      links: [
        { name: "Password Generator", path: "/tools/password-gen" },
        { name: "Phishing Detector", path: "/tools/phishing-check" },
        { name: "Secure Notes", path: "/tools/secure-notes" }
      ]
    },
    {
      icon: <Briefcase size={20}/>,
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press & Media", path: "/press" },
        { name: "Contact Us", path: "/contact" }
      ]
    },
    {
      icon: <Database size={20}/>,
      title: "Business Solutions",
      links: [
        { name: "Our Services", path: "/services" },
        { name: "Partner Program", path: "/partners" },
        { name: "Enterprise Plans", path: "/contact" }
      ]
    },
    {
      icon: <HelpCircle size={20}/>,
      title: "Knowledge Hub",
      links: [
        { name: "Resources & Guides", path: "/resources" },
        { name: "FAQ", path: "/faq" },
        { name: "Sitemap", path: "/sitemap" }
      ]
    },
    {
      icon: <Server size={20}/>,
      title: "Trust Center",
      links: [
        { name: "System Status", path: "/status" },
        { name: "Security Whitepaper", path: "/security" },
        { name: "Compliance", path: "/security" }
      ]
    },
    {
      icon: <Scale size={20}/>,
      title: "Legal & Privacy",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookie-policy" },
        { name: "GDPR Rights", path: "/privacy" }
      ]
    },
    {
      icon: <FileText size={20}/>,
      title: "Policies",
      links: [
        { name: "Disclaimer", path: "/disclaimer" },
        { name: "Refund Policy", path: "/refund-policy" },
        { name: "Acceptable Use", path: "/acceptable-use" }
      ]
    },
    {
      icon: <Shield size={20}/>,
      title: "Emergency",
      links: [
        { name: "Ransomware Help", path: "/contact" },
        { name: "Report Abuse", path: "/contact" },
        { name: "Bug Bounty", path: "/contact" }
      ]
    }
  ];

  return (
    <div className="pt-36 min-h-screen bg-gray-50 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b-2 border-black pb-8 mt-8">
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 text-black break-words">
                Global Sitemap
            </h1>
            <p className="text-xl text-gray-600 font-medium">
                Directory of all tools, resources, and legal documents.
            </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {sitemapData.map((section, i) => (
                <div key={i} className="group">
                    <div className="flex items-center gap-2 mb-4 text-blue-600">
                        {section.icon}
                        <h2 className="font-black uppercase text-xl tracking-wide group-hover:text-black transition-colors">
                            {section.title}
                        </h2>
                    </div>
                    <ul className="space-y-3">
                        {section.links.map((link, k) => (
                            <li key={k}>
                                <Link 
                                    to={link.path} 
                                    className="text-gray-600 font-bold hover:text-black hover:underline hover:pl-2 transition-all block text-sm"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t-2 border-black text-center">
            <p className="text-xs font-mono text-gray-500 uppercase">
                &copy; 2026 Sentinel Secure. All routes mapped.
            </p>
        </div>

      </div>
    </div>
  );
};

export default Sitemap;