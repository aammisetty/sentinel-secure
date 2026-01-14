import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import { Lock, AlertCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { generateOTP, sendOTPEmail, db } from '../../utils/authLogic';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Creds, 2: 2FA
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [inputOtp, setInputOtp] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Step 1: Validate Password & Initiate 2FA
  const handleLoginInit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Verify Password against Real DB
    const result = db.verifyCredentials(email, password);

    if (result.success) {
        // 2. Generate Real 2FA Code
        const code = generateOTP();
        setGeneratedOtp(code);

        // 3. Send Real Email via EmailJS
        const emailResult = await sendOTPEmail(email, code, "Login 2FA");
        
        if (emailResult.success) {
            setStep(2);
        } else {
            console.error("Email send failed. Check EmailJS keys.");
            setError('Could not send 2FA code. Check your connection.');
            // DEV BACKUP: Log code to console
            console.log(`[DEV MODE] 2FA for ${email}: ${code}`);
        }
    } else {
        setError(result.msg);
    }
    setLoading(false);
  };

  // Step 2: Validate 2FA & Set Session
  const handleVerify2FA = (e) => {
    e.preventDefault();
    setLoading(true);

    if (inputOtp === generatedOtp) {
        // Create Session Token
        localStorage.setItem('sentinel_token', `session-${Date.now()}-${Math.random()}`);
        localStorage.setItem('sentinel_user', email);
        
        setTimeout(() => navigate('/dashboard'), 500);
    } else {
        setError('Invalid Code. Authentication failed.');
    }
    setLoading(false);
  };

  return (
    <div className="pt-32 min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black p-8 max-w-md w-full neo-shadow">
        
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-black text-white mb-4">
            {step === 1 ? <Lock size={32} /> : <ShieldCheck size={32} className="text-green-400"/>}
          </div>
          <h1 className="text-3xl font-black uppercase">
            {step === 1 ? 'Portal Login' : '2FA Security'}
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-bold">
            {step === 1 ? 'Secure Gateway Access' : 'Enter the code sent to your email'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-700 flex items-center gap-2 font-bold text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Step 1: Email/Pass */}
        {step === 1 && (
            <form onSubmit={handleLoginInit} className="space-y-6">
            <div>
                <label className="block text-sm font-bold uppercase mb-2">Email</label>
                <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all" 
                placeholder="name@company.com"
                required 
                />
            </div>
            <div>
                <label className="block text-sm font-bold uppercase mb-2">Password</label>
                <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all" 
                required 
                />
            </div>
            <Button disabled={loading} className="w-full">
                {loading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin"/> Authenticating...</span> : 'Verify Credentials'}
            </Button>
            </form>
        )}

        {/* Step 2: 2FA Input */}
        {step === 2 && (
            <form onSubmit={handleVerify2FA} className="space-y-6">
                <div className="p-4 bg-yellow-50 border-2 border-yellow-200 text-sm text-yellow-800 font-bold">
                    For your security, we've sent a code to {email}.
                </div>

                <div>
                    <label className="block text-sm font-bold uppercase mb-2 text-center">2-Factor Auth Code</label>
                    <input 
                        required
                        maxLength="6"
                        className="w-full p-4 text-center text-3xl font-black tracking-[0.5em] border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all" 
                        value={inputOtp}
                        onChange={e => setInputOtp(e.target.value)}
                        placeholder="••••••"
                    />
                </div>
                <Button disabled={loading} className="w-full bg-black text-white hover:bg-gray-900 border-black">
                    {loading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin"/> Verifying...</span> : 'Access Dashboard'}
                </Button>
            </form>
        )}

        {step === 1 && (
            <div className="mt-6 text-center text-sm font-bold">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default Login;