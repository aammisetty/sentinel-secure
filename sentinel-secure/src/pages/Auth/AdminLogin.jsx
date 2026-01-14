import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Key, Mail, ArrowRight, Lock } from 'lucide-react';
import Button from '../../components/Button';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: 2FA
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email === 'gchk@duck.com') {
      setStep(2);
      setError('');
      // Simulation: Log code to console for the founder
      console.log("SENTINEL ADMIN 2FA CODE: 884422");
    } else {
      setError('Access Denied: Restricted to Founder Only.');
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code === '884422') {
      localStorage.setItem('sentinel_admin_email', 'gchk@duck.com');
      localStorage.setItem('sentinel_admin_2fa', 'true');
      navigate('/admin/verify');
    } else {
      setError('Invalid 2FA code. System lockdown imminent.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white border-4 border-blue-600 p-8 shadow-[12px_12px_0px_0px_#2563eb]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Founder Access</h1>
          <p className="text-xs font-bold text-gray-500 uppercase mt-1">Sentinel Secure Systems v1.0</p>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-3 text-xs font-bold mb-6 flex items-center gap-2 uppercase">
            <Lock size={14}/> {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase mb-1">Founder Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 border-2 border-black outline-none focus:bg-blue-50 font-bold"
                  placeholder="admin@sentinel.com"
                />
              </div>
            </div>
            <Button className="w-full py-4 bg-black text-white hover:bg-blue-600 flex items-center justify-center gap-2">
              Next Stage <ArrowRight size={18}/>
            </Button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div className="bg-blue-50 p-3 border-2 border-blue-200 mb-4">
              <p className="text-[10px] font-bold text-blue-700 uppercase">Verification code sent to duck.com alias</p>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase mb-1">2FA Secure Token</label>
              <div className="relative">
                <Key className="absolute left-3 top-3 text-gray-400" size={18}/>
                <input 
                  type="text" 
                  required
                  maxLength="6"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full p-3 pl-10 border-2 border-black outline-none focus:bg-blue-50 font-mono text-xl tracking-[1em] font-bold"
                  placeholder="000000"
                />
              </div>
            </div>
            <Button className="w-full py-4 bg-blue-600 text-white hover:bg-black flex items-center justify-center gap-2">
              Authorize Entry <ShieldCheck size={18}/>
            </Button>
          </form>
        )}

        <button 
          onClick={() => navigate('/')}
          className="w-full mt-6 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-colors"
        >
          Exit to Public Site
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;