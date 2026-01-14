import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { UserPlus, Mail, ArrowRight, Check, Loader2, AlertTriangle } from 'lucide-react';
import { generateOTP, sendOTPEmail, db } from '../../utils/authLogic';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Details, 2: Verification
  const [formData, setFormData] = useState({ company: '', email: '', password: '' });
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [inputOtp, setInputOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Init Registration & Send Real OTP
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Check if user already exists in our "Real" Local DB
    const existingUser = db.getUser(formData.email);
    if (existingUser) {
        setError('User already exists. Please login.');
        setLoading(false);
        return;
    }

    // 2. Generate Real OTP (Crypto API)
    const code = generateOTP();
    setGeneratedOtp(code);

    // 3. Send Real Email via EmailJS
    const result = await sendOTPEmail(formData.email, code, "Signup Verification");

    if (result.success) {
        setStep(2);
    } else {
        // Handle Email Failure (Likely invalid keys or network issue)
        console.error("Email send failed. Check EmailJS keys.");
        setError('Failed to send email. Ensure EmailJS is configured or check internet connection.');
        
        // DEV BACKUP: Log code to console so you can still test the flow if email fails
        console.log(`[DEV MODE] OTP for ${formData.email}: ${code}`); 
    }
    setLoading(false);
  };

  // Step 2: Verify OTP & Commit to DB
  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    if (inputOtp === generatedOtp) {
        // 4. Save User to Local Database
        const saveResult = db.saveUser({
            ...formData,
            verified: true,
            createdAt: new Date().toISOString()
        });

        if (saveResult.success) {
            // Auto Login / Create Session
            localStorage.setItem('sentinel_token', `session-${Date.now()}-${Math.random()}`);
            localStorage.setItem('sentinel_user', formData.email);
            
            // Add a slight delay for UX
            setTimeout(() => navigate('/dashboard'), 500);
        } else {
            setError(saveResult.msg);
        }
    } else {
        setError('Invalid Code. Please check your email and try again.');
    }
    setLoading(false);
  };

  return (
    <div className="pt-32 min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black p-8 max-w-md w-full neo-shadow">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-600 text-white border-2 border-black mb-4">
            {step === 1 ? <UserPlus size={32} /> : <Mail size={32} />}
          </div>
          <h1 className="text-3xl font-black uppercase">
            {step === 1 ? 'Create Account' : 'Verify Email'}
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-bold">
            {step === 1 ? 'Join Sentinel Secure' : `Code sent to ${formData.email}`}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-700 flex items-center gap-2 font-bold text-sm">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        {/* Step 1: Details Form */}
        {step === 1 && (
            <form onSubmit={handleRegister} className="space-y-6">
                <div>
                <label className="block text-sm font-bold uppercase mb-2">Company Name</label>
                <input 
                    required
                    className="w-full p-3 border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all" 
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                />
                </div>
                <div>
                <label className="block text-sm font-bold uppercase mb-2">Email</label>
                <input 
                    required
                    type="email" 
                    className="w-full p-3 border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all" 
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />
                </div>
                <div>
                <label className="block text-sm font-bold uppercase mb-2">Password</label>
                <input 
                    required
                    type="password" 
                    className="w-full p-3 border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                />
                </div>
                <Button disabled={loading} className="w-full">
                    {loading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin"/> Processing...</span> : <span className="flex items-center gap-2">Verify Email <ArrowRight size={16}/></span>}
                </Button>
            </form>
        )}

        {/* Step 2: Verification Form */}
        {step === 2 && (
            <form onSubmit={handleVerify} className="space-y-6">
                <div className="p-4 bg-blue-50 border-2 border-blue-200 text-sm text-blue-800 font-bold">
                    Check your inbox (and spam). We've sent a 6-digit confirmation code.
                </div>
                
                <div>
                    <label className="block text-sm font-bold uppercase mb-2 text-center">Enter 6-Digit Code</label>
                    <input 
                        required
                        maxLength="6"
                        className="w-full p-4 text-center text-3xl font-black tracking-[0.5em] border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all" 
                        value={inputOtp}
                        onChange={e => setInputOtp(e.target.value)}
                        placeholder="000000"
                    />
                </div>
                <Button disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-white border-black">
                    {loading ? <Loader2 className="animate-spin"/> : <span className="flex items-center gap-2">Confirm & Login <Check size={16}/></span>}
                </Button>
                <button type="button" onClick={() => setStep(1)} className="block w-full text-center text-xs text-gray-500 hover:text-black font-bold underline mt-4">
                    Change email address?
                </button>
            </form>
        )}

        {step === 1 && (
            <div className="mt-6 text-center text-sm font-bold">
                <span className="text-gray-500">Already a member? </span>
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default Signup;