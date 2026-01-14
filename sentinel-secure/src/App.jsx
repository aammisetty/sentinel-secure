import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Resources from './pages/Resources';
import Careers from './pages/Careers';
import Settings from './pages/Settings';
import AuditReport from './pages/AuditReport';

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
import CookiePolicy from './pages/Legal/CookiePolicy'; // NEW

function App() {
  return (
    <Router>
      <div className="font-sans antialiased text-black bg-white flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/audit" element={<AuditReport />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/careers" element={<Careers />} />

            <Route path="/tools/password-gen" element={<PasswordGen />} />
            <Route path="/tools/browser-check" element={<BrowserCheck />} />
            <Route path="/tools/secure-notes" element={<SecureNotes />} />
            <Route path="/tools/speed-test" element={<SpeedTest />} />
            <Route path="/tools/incident-log" element={<IncidentLog />} />
            <Route path="/tools/ip-lookup" element={<IpLookup />} />
            <Route path="/tools/phishing-check" element={<PhishingDetector />} />
            <Route path="/tools/file-encrypt" element={<FileEncrypt />} />
            <Route path="/tools/webrtc-leak" element={<WebRTCLeak />} />

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