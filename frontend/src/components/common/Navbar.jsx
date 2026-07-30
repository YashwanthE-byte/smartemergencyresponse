import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Siren,
  MapPin,
  Building2,
  PhoneCall,
  Bot,
  User,
  LogOut,
  Shield,
  Ambulance,
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-gray-800/80 bg-[#090d16]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              <Siren className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-bold font-heading text-white tracking-tight flex items-center gap-1.5">
                RESQUE<span className="text-red-500 font-black">AI</span>
              </span>
              <span className="text-[10px] block text-gray-400 font-mono tracking-wider uppercase">
                Smart Response Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition"
            >
              Home
            </Link>
            <Link
              to="/map"
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-red-400" />
              Live Map
            </Link>
            <Link
              to="/hospitals"
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-blue-400" />
              Hospitals
            </Link>
            <Link
              to="/first-aid"
              className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              AI First Aid
            </Link>
          </nav>

          {/* User Actions & Role Links */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/sos"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 sos-pulse-button"
            >
              <Siren className="w-4 h-4" />
              EMERGENCY SOS
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2 border-l border-gray-800 pl-3">
                <Link
                  to={getDashboardPath(user.role)}
                  className="px-3 py-1.5 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition"
                >
                  {user.role === 'Admin' && <Shield className="w-3.5 h-3.5 text-purple-400" />}
                  {user.role === 'Ambulance Driver' && <Ambulance className="w-3.5 h-3.5 text-amber-400" />}
                  {user.role === 'Hospital' && <Building2 className="w-3.5 h-3.5 text-blue-400" />}
                  {user.role === 'Citizen' && <User className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{user.name.split(' ')[0]} ({user.role})</span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800/80 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 text-sm font-medium transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 text-sm font-medium transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-[#0d1322] px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-white font-medium"
          >
            Home
          </Link>
          <Link
            to="/map"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-white font-medium"
          >
            Live Map
          </Link>
          <Link
            to="/hospitals"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-white font-medium"
          >
            Nearby Hospitals
          </Link>
          <Link
            to="/first-aid"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-white font-medium"
          >
            AI First Aid Assistant
          </Link>

          <Link
            to="/sos"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-2.5 rounded-xl bg-red-600 text-white font-bold tracking-wider"
          >
            🚨 TRIGGER SOS NOW
          </Link>

          {isAuthenticated ? (
            <div className="pt-3 border-t border-gray-800 space-y-2">
              <Link
                to={getDashboardPath(user.role)}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-red-400"
              >
                Dashboard ({user.role})
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left py-2 text-sm text-gray-400 hover:text-red-400"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-gray-800 flex gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-lg border border-gray-700 text-gray-300 text-sm font-medium"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-lg bg-red-600 text-white text-sm font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
