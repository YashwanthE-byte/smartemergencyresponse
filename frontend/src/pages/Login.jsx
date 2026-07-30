import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Siren, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both your email address and password');
      return;
    }

    setLoading(true);

    const result = await login(formData);
    setLoading(false);

    if (result.success) {
      setSuccessMessage(`Login successful! Redirecting to ${result.role} dashboard...`);
      setTimeout(() => {
        const from = location.state?.from?.pathname || result.targetPath;
        navigate(from, { replace: true });
      }, 1000);
    } else {
      setErrorMessage(result.message || 'Invalid login credentials. Please try again.');
    }
  };

  const fillDemoAccount = (email, role) => {
    setFormData({
      email,
      password: 'demo123'
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 glass-panel p-8 sm:p-10 rounded-3xl border border-gray-800 shadow-2xl relative z-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 shadow-lg shadow-red-600/30">
            <Siren className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
            Account Sign In
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Access your Smart Emergency Response portal with role authorization
          </p>
        </div>

        {/* Quick Demo Login Preset Buttons */}
        <div className="p-3 bg-gray-900/80 rounded-2xl border border-gray-800 text-xs space-y-2">
          <p className="font-bold text-gray-300 uppercase tracking-wider text-[11px] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" /> One-Click Demo Logins:
          </p>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
            <button
              onClick={() => fillDemoAccount('citizen@emergency.com', 'Citizen')}
              type="button"
              className="py-1 px-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-emerald-400 text-left truncate"
            >
              👤 Citizen
            </button>
            <button
              onClick={() => fillDemoAccount('driver@emergency.com', 'Ambulance Driver')}
              type="button"
              className="py-1 px-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-amber-400 text-left truncate"
            >
              🚑 Driver
            </button>
            <button
              onClick={() => fillDemoAccount('hospital@emergency.com', 'Hospital')}
              type="button"
              className="py-1 px-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-blue-400 text-left truncate"
            >
              🏥 Hospital
            </button>
            <button
              onClick={() => fillDemoAccount('admin@emergency.com', 'Admin')}
              type="button"
              className="py-1 px-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-purple-400 text-left truncate"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@emergency.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900/90 border border-gray-700/80 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>
          </div>

          {/* Password Input with Visibility Toggle */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Password
              </label>
              <span className="text-[11px] text-gray-500 font-mono">Demo: demo123</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-gray-900/90 border border-gray-700/80 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>SIGN IN TO DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-400 hover:text-red-300 font-semibold underline underline-offset-4">
            Register new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
