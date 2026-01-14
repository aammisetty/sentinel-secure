import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="pt-28 min-h-screen bg-gray-50 p-6 lg:p-12 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-yellow-400 text-black p-8 border-2 border-black mb-8 neo-shadow">
          <AlertTriangle size={48} className="mb-4" />
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Legal Disclaimer</h1>
          <p className="font-mono text-sm font-bold">Please read this carefully before using our tools.</p>
        </div>

        <div className="bg-white border-2 border-black p-8 lg:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-black uppercase mb-4">1. Not an Antivirus Replacement</h2>
              <p>
                <strong>Sentinel Secure</strong> is designed as a lightweight forensic and educational tool for SMEs. It does not contain a real-time kernel-level driver to block execution of malicious files. It should be used <strong>alongside</strong>, not instead of, reputable Antivirus software (e.g., Windows Defender, QuickHeal, BitDefender).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-4">2. "As Is" Basis</h2>
              <p>
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We expressly disclaim all warranties of any kind, whether express or implied, including the warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-4">3. False Positives</h2>
              <p>
                Our "Entropy Calculation" and "Heuristic Analysis" engines may occasionally flag legitimate files (such as compressed archives or encrypted backups) as suspicious. Do not delete essential business data based solely on a Sentinel Secure alert without professional verification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-4">4. Educational Use</h2>
              <p>
                The "Honeyfile Generator" and "WebRTC Leak Test" features are provided for educational and defensive purposes only. Using these techniques to test networks you do not own or have permission to audit is illegal under the IT Act, 2000.
              </p>
            </section>

            <section className="bg-gray-100 p-6 border-l-4 border-black">
              <h3 className="font-bold uppercase mb-2">Emergency Situations</h3>
              <p>
                In the event of an active Ransomware attack, Sentinel Secure's "Panic Button" serves as a communication shortcut. We do not guarantee immediate physical response or data recovery.
              </p>
            </section>

        </div>
      </div>
    </div>
  );
};

export default Disclaimer;