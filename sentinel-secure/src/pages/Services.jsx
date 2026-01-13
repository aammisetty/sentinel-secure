import React from 'react';
import ServiceCard from '../components/ServiceCard';
import { Shield, Lock, Activity, Server, Code, Wifi } from 'lucide-react';

const Services = () => (
  <div className="pt-28 min-h-screen max-w-6xl mx-auto p-8">
    <h1 className="text-5xl font-black uppercase mb-12 text-center">Full Service Catalog</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        <ServiceCard icon={Activity} title="Ransomware Monitor" desc="Real-time file entropy analysis." price="₹2,000" />
        <ServiceCard icon={Lock} title="Incident Response" desc="24/7 WhatsApp Hotline & Remote Patching." price="₹5,000" />
        <ServiceCard icon={Server} title="Server Hardening" desc="Linux/Windows Server security config." price="₹10,000" />
        <ServiceCard icon={Code} title="Source Audit" desc="Review of proprietary business code." price="Custom" />
        <ServiceCard icon={Wifi} title="Network Sec" desc="Firewall & Router configuration." price="₹3,000" />
        <ServiceCard icon={Shield} title="Compliance" desc="ISO 27001 & GDPR Consulting." price="Custom" />
    </div>
  </div>
);
export default Services;