import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      if (res.success) {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl shadow-xl mb-6">
             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Join PrintHub</h1>
          <p className="text-gray-500 mt-3 font-medium text-lg">Create your account to start printing</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl font-bold flex items-center gap-3">
            <span className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-[10px]">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all font-semibold text-gray-900 placeholder-gray-300 shadow-sm"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all font-semibold text-gray-900 placeholder-gray-300 shadow-sm"
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all font-semibold text-gray-900 placeholder-gray-300 shadow-sm"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm</label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all font-semibold text-gray-900 placeholder-gray-300 shadow-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black text-lg hover:bg-black transform active:scale-[0.98] transition-all shadow-2xl shadow-gray-200 mt-6 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <div className="mt-10 text-center space-y-6">
          <p className="text-gray-500 font-bold text-sm">
            Already have an account? {' '}
            <Link to="/login" className="text-gray-900 hover:underline">Sign In</Link>
          </p>
          <div className="pt-6 border-t border-gray-100 text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] leading-relaxed">
            By joining, you agree to our <br/>
            <a href="#" className="text-gray-900 underline underline-offset-4">Terms of Service</a> & <a href="#" className="text-gray-900 underline underline-offset-4">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
