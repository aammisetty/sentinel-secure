import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AdminLogin from './pages/Auth/AdminLogin'; // NEW
import AdminVerify from './pages/AdminVerify';   // NEW

// Auth
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Tools
import PasswordGen from './pages/Tools/PasswordGen';
import BrowserCheck from './pages/Tools/BrowserCheck';
import SecureNotes from './pages/Tools/SecureNotes';
import SpeedTest from './pages/Tools/SpeedTest';
import IncidentLog from './pages/Tools/IncidentLog';
import IpLookup from './pages/Tools/IpLookup';
import PhishingDetector from './pages/Tools/PhishingDetector';
import FileEncrypt from './pages/Tools/FileEncrypt';
import WebRTCLeak from './pages/Tools/WebRTCLeak';

// Legal
import Privacy from './pages/Legal/Privacy';
import Terms from './pages/Legal/Terms';
import Disclaimer from './pages/Legal/Disclaimer';
import Refund from './pages/Legal/Refund';
import AcceptableUse from './pages/Legal/AcceptableUse';
import CookiePolicy from './pages/Legal/CookiePolicy';

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children, requiredLevel = 1 }) => {
  const userPlan = localStorage.getItem('sentinel_plan') || 'free';
  const isBlocked = localStorage.getItem('sentinel_blocked') === 'true';
  const levels = { 'free': 0, 'starter': 1, 'pro': 2, 'business': 3 };
  const currentLevel = levels[userPlan.toLowerCase()] || 0;

  if (isBlocked) {
    return <Navigate to="/" replace />;
  }

  if (currentLevel < requiredLevel) {
    return <Navigate to="/pricing" replace />;
  }
  return children;
};

// --- ADMIN GUARD (Founder Only) ---
const AdminGuard = ({ children }) => {
  const adminEmail = localStorage.getItem('sentinel_admin_email');
  const isVerified2FA = localStorage.getItem('sentinel_admin_2fa') === 'true';

  if (adminEmail !== 'gchk@duck.com' || !isVerified2FA) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
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

            {/* Gated Tools */}
            <Route path="/tools/incident-log" element={
              <ProtectedRoute requiredLevel={1}>
                <IncidentLog />
              </ProtectedRoute>
            } />
            <Route path="/tools/phishing-check" element={
              <ProtectedRoute requiredLevel={2}>
                <PhishingDetector />
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
    </Router>
  );
}

export default App;