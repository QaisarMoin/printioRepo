import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Redirect to original destination or home
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login({ email, password });
      if (res.success) {
        // If it's an admin, they might want to go to /admin
        if (res.user.role === 'admin') {
           navigate('/admin');
        } else {
           navigate(from, { replace: true });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-white px-4 pt-10">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl shadow-xl mb-6">
             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-3 font-medium text-lg">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl font-bold flex items-center gap-3">
            <span className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-[10px]">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all font-semibold text-gray-900 placeholder-gray-300 shadow-sm"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
              <a href="#" className="text-[10px] font-black text-gray-900 uppercase tracking-widest hover:underline">Forgot?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all font-semibold text-gray-900 placeholder-gray-300 shadow-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black text-lg hover:bg-black transform active:scale-[0.98] transition-all shadow-2xl shadow-gray-200 mt-4 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Continue'}
          </button>
        </form>

        <div className="mt-10 text-center space-y-4">
          <p className="text-gray-500 font-bold text-sm">
            Don't have an account? {' '}
            <Link to="/register" className="text-gray-900 hover:underline">Sign Up</Link>
          </p>
          
          <div className="pt-6 border-t border-gray-100">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Quick Access for Testing</p>
            <div className="flex flex-col gap-2">
              <div className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-500 flex justify-between items-center group/hint hover:bg-gray-100 transition-colors">
                <span className="uppercase tracking-widest text-gray-400">Admin</span>
                <span className="text-gray-900">admin@printhub.com / admin123</span>
              </div>
              <div className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-500 flex justify-between items-center group/hint hover:bg-gray-100 transition-colors">
                <span className="uppercase tracking-widest text-gray-400">User</span>
                <span className="text-gray-900">user@printhub.com / user123</span>
              </div>
            </div>
          </div>

          <div className="pt-6 text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] leading-relaxed">
            By signing in, you agree to our <br/>
            <a href="#" className="text-gray-900 underline underline-offset-4">Terms of Service</a> & <a href="#" className="text-gray-900 underline underline-offset-4">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
