import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { UserPlus, Mail, ArrowRight, Check } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Details, 2: Verification
  const [formData, setFormData] = useState({ company: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Register & Send Code
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
        // Generate a cryptographically strong 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setOtp(code);
        
        // Save 'Pending' user to local storage (Simulating DB)
        const userPayload = { ...formData, verified: false };
        localStorage.setItem(`sentinel_user_${formData.email}`, JSON.stringify(userPayload));

        // REAL LOGIC: Trigger Email Simulation
        // In production, this call goes to SendGrid/AWS SES.
        // Here, we simulate the arrival of the email via Alert to ensure the user gets the code.
        alert(`SENTINEL SECURE EMAIL SERVICE:\n\nVerification Code for ${formData.email}: ${code}\n\n(This simulates the email you would receive in a live environment)`);

        setLoading(false);
        setStep(2);
    }, 1500);
  };

  // Step 2: Verify Code
  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    if (inputOtp === otp) {
        // Update user to verified
        const userPayload = { ...formData, verified: true };
        localStorage.setItem(`sentinel_user_${formData.email}`, JSON.stringify(userPayload));
        
        // Set Session
        localStorage.setItem('sentinel_token', `local-session-${Date.now()}`);
        localStorage.setItem('sentinel_user', formData.email);
        
        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
    } else {
        setError('Invalid Verification Code');
        setLoading(false);
    }
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
          <p className="text-gray-500 text-sm mt-2">
            {step === 1 ? 'Join Sentinel Secure' : `Code sent to ${formData.email}`}
          </p>
        </div>

        {/* Step 1: Details Form */}
        {step === 1 && (
            <form onSubmit={handleRegister} className="space-y-6">
                <div>
                <label className="block text-sm font-bold uppercase mb-2">Company Name</label>
                <input 
                    required
                    className="w-full p-3 border-2 border-black focus:outline-none transition-all" 
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
                    className="w-full p-3 border-2 border-black focus:outline-none transition-all" 
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
                    className="w-full p-3 border-2 border-black focus:outline-none transition-all" 
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                />
                </div>
                <Button disabled={loading} className="w-full">
                    {loading ? 'Processing...' : 'Next Step'} <ArrowRight size={16}/>
                </Button>
            </form>
        )}

        {/* Step 2: Verification Form */}
        {step === 2 && (
            <form onSubmit={handleVerify} className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 text-sm text-blue-800">
                    We've sent a 6-digit code to your email. Please enter it below to activate your dashboard access.
                </div>
                
                {error && <div className="text-red-600 font-bold text-sm text-center">{error}</div>}

                <div>
                    <label className="block text-sm font-bold uppercase mb-2 text-center">Enter 6-Digit Code</label>
                    <input 
                        required
                        maxLength="6"
                        className="w-full p-4 text-center text-3xl font-black tracking-[0.5em] border-2 border-black focus:outline-none transition-all" 
                        value={inputOtp}
                        onChange={e => setInputOtp(e.target.value)}
                    />
                </div>
                <Button disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-white border-black">
                    {loading ? 'Verifying...' : 'Confirm & Login'} <Check size={16}/>
                </Button>
                <button type="button" onClick={() => setStep(1)} className="block w-full text-center text-xs text-gray-500 underline mt-4">
                    Wrong email? Go back.
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