import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // STRATEGY 1: Try Public API (ReqRes)
      // This works for demo users like 'eve.holt@reqres.in'
      const res = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('sentinel_token', data.token);
        localStorage.setItem('sentinel_user', email);
        navigate('/dashboard');
        return;
      }

      // STRATEGY 2: Check Local Encrypted Storage (For Custom Signups)
      // Since ReqRes API rejects unknown emails, we fallback to our local logic
      const storedUser = localStorage.getItem(`sentinel_user_${email}`);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.password === password) { // In a real app, verify hash here
          if (!parsed.verified) {
             setError('Account exists but email is not verified.');
             setLoading(false);
             return;
          }
          localStorage.setItem('sentinel_token', 'local-session-' + Date.now());
          localStorage.setItem('sentinel_user', email);
          navigate('/dashboard');
          return;
        }
      }

      throw new Error('Invalid credentials');
    } catch (err) {
      setError('Login failed. Please check your email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black p-8 max-w-md w-full neo-shadow">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-black text-white mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black uppercase">Portal Login</h1>
          <p className="text-gray-500 text-sm mt-2">Secure Gateway Access</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-700 flex items-center gap-2 font-bold text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
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
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm font-bold">
          <span className="text-gray-500">Don't have an account? </span>
          <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;