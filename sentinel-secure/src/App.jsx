import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ShieldAlert, Ban } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Pricing from './pages/Pricing';   
import Payment from './pages/Payment';   
import FAQ from './pages/FAQ';
import Resources from './pages/Resources';
import Careers from './pages/Careers';
import Settings from './pages/Settings';
import AuditReport from './pages/AuditReport';
import Status from './pages/Status';
import Security from './pages/Security';
import Partners from './pages/Partners';
import Press from './pages/Press';
import Sitemap from './pages/Sitemap';

// Admin Pages
import AdminLogin from './pages/Auth/AdminLogin'; 
import AdminVerify from './pages/AdminVerify';   

// Auth
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Tools (Existing)
import PasswordGen from './pages/Tools/PasswordGen';
import BrowserCheck from './pages/Tools/BrowserCheck';
import SecureNotes from './pages/Tools/SecureNotes';
import SpeedTest from './pages/Tools/SpeedTest';
import IncidentLog from './pages/Tools/IncidentLog';
import IpLookup from './pages/Tools/IpLookup';
import PhishingDetector from './pages/Tools/PhishingDetector';
import FileEncrypt from './pages/Tools/FileEncrypt';
import WebRTCLeak from './pages/Tools/WebRTCLeak';

// Tools (New Advanced Library)
import PwnedCheck from './pages/Tools/PwnedCheck';
import NetworkMapper from './pages/Tools/NetworkMapper';
import DNSValidator from './pages/Tools/DNSValidator';
// Note: Ensure the files below are created as we continue the expansion
// import PortScanner from './pages/Tools/PortScanner';
// import MetadataScrubber from './pages/Tools/MetadataScrubber';
// import RansomSim from './pages/Tools/RansomSim';

// Legal
import Privacy from './pages/Legal/Privacy';
import Terms from './pages/Legal/Terms';
import Disclaimer from './pages/Legal/Disclaimer';
import Refund from './pages/Legal/Refund';
import AcceptableUse from './pages/Legal/AcceptableUse';
import CookiePolicy from './pages/Legal/CookiePolicy';

// --- GLOBAL BLOCK GUARD ---
const GlobalBlockGuard = ({ children }) => {
  const isBlocked = localStorage.getItem('sentinel_blocked') === 'true';

  if (isBlocked) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6 text-white font-mono overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black opacity-50"></div>
        <div className="relative max-w-2xl w-full border-4 border-red-600 p-8 md:p-12 bg-black shadow-[0_0_50px_rgba(220,38,38,0.5)] text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Ban size={80} className="text-red-600 animate-pulse" />
              <ShieldAlert size={40} className="absolute inset-0 m-auto text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-red-600 mb-4">Access Denied</h1>
          <div className="h-1 w-full bg-red-600 mb-6"></div>
          <p className="text-xl font-bold uppercase mb-8 leading-tight">Security Blacklist Active: Your session and hardware identifier have been permanently restricted.</p>
          <div className="bg-red-600/10 border border-red-600/50 p-6 mb-8 text-left">
            <p className="text-xs uppercase font-black text-red-500 mb-2 tracking-widest">Incident Telemetry:</p>
            <p className="text-sm font-bold text-red-200">REASON: FRAUDULENT PAYMENT CLAIM DETECTED</p>
            <p className="text-xs opacity-60 mt-1">STATUS: NON-APPEALABLE TERMINATION</p>
          </div>
          <p className="text-[10px] uppercase opacity-40">Founder Override Required for Restoration (testcodecfg@gmail.com)</p>
        </div>
      </div>
    );
  }

  return children;
};

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children, requiredLevel = 1 }) => {
  const userPlan = localStorage.getItem('sentinel_plan') || 'free';
  const levels = { 'free': 0, 'starter': 1, 'pro': 2, 'business': 3 };
  const currentLevel = levels[userPlan.toLowerCase()] || 0;

  if (currentLevel < requiredLevel) {
    return <Navigate to="/pricing" replace />;
  }
  return children;
};

// --- ADMIN GUARD (Founder Only) ---
const AdminGuard = ({ children }) => {
  const adminEmail = localStorage.getItem('sentinel_admin_email');
  const isVerified2FA = localStorage.getItem('sentinel_admin_2fa') === 'true';

  if (adminEmail !== 'testcodecfg@gmail.com' || !isVerified2FA) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <GlobalBlockGuard>
        <div className="font-sans antialiased text-black bg-white flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Admin/Founder Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/verify" element={
                <AdminGuard>
                  <AdminVerify />
                </AdminGuard>
              } />

              {/* Protected Dashboard (Requires at least Starter) */}
              <Route path="/dashboard" element={
                <ProtectedRoute requiredLevel={1}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={<Settings />} />
              <Route path="/audit" element={<AuditReport />} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} /> 
              <Route path="/payment" element={<Payment />} /> 
              <Route path="/faq" element={<FAQ />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/careers" element={<Careers />} />

              <Route path="/status" element={<Status />} />
              <Route path="/security" element={<Security />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/press" element={<Press />} />
              <Route path="/sitemap" element={<Sitemap />} />

              {/* Public/Free Tools */}
              <Route path="/tools/password-gen" element={<PasswordGen />} />
              <Route path="/tools/browser-check" element={<BrowserCheck />} />
              <Route path="/tools/secure-notes" element={<SecureNotes />} />
              <Route path="/tools/speed-test" element={<SpeedTest />} />
              <Route path="/tools/ip-lookup" element={<IpLookup />} />
              <Route path="/tools/file-encrypt" element={<FileEncrypt />} />
              <Route path="/tools/webrtc-leak" element={<WebRTCLeak />} />

              {/* Gated Tools - Level 1 (Starter) */}
              <Route path="/tools/incident-log" element={
                <ProtectedRoute requiredLevel={1}>
                  <IncidentLog />
                </ProtectedRoute>
              } />

              {/* Gated Tools - Level 2 (Pro) */}
              <Route path="/tools/phishing-check" element={
                <ProtectedRoute requiredLevel={2}>
                  <PhishingDetector />
                </ProtectedRoute>
              } />
              <Route path="/tools/dns-validator" element={
                <ProtectedRoute requiredLevel={2}>
                  <DNSValidator />
                </ProtectedRoute>
              } />

              {/* Gated Tools - Level 3 (Business) */}
              <Route path="/tools/pwned-check" element={
                <ProtectedRoute requiredLevel={3}>
                  <PwnedCheck />
                </ProtectedRoute>
              } />
              <Route path="/tools/network-mapper" element={
                <ProtectedRoute requiredLevel={3}>
                  <NetworkMapper />
                </ProtectedRoute>
              } />

              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/refund-policy" element={<Refund />} />
              <Route path="/acceptable-use" element={<AcceptableUse />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </GlobalBlockGuard>
    </Router>
  );
}

export default App;