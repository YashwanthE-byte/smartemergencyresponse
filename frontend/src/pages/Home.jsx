import React from 'react';
import { Link } from 'react-router-dom';
import { Siren, MapPin, Building2, Bot, ShieldCheck, Zap, Activity, Radio, PhoneCall } from 'lucide-react';
import SOSButton from '../components/sos/SOSButton';

const Home = () => {
  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-wider uppercase">
          <Radio className="w-4 h-4 text-red-500 animate-pulse" /> Live Dispatch Grid Active
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight max-w-4xl mx-auto">
          AI-Powered Smart Emergency <br />
          <span className="bg-gradient-to-r from-red-500 via-amber-400 to-red-600 bg-clip-text text-transparent">
            Response & Dispatch Network
          </span>
        </h1>

        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Zero-delay One-Tap SOS, real-time GPS ambulance tracking, automated hospital bed triage, and AI first-aid emergency guidance.
        </p>
      </section>

      {/* Main Interactive SOS Dispatch Widget */}
      <section className="py-4">
        <SOSButton />
      </section>

      {/* Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-3 hover:border-red-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 flex items-center justify-center text-red-500">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white">One-Tap Geolocation Dispatch</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Instantly transmits high-precision coordinates to nearby emergency responders and nearest Level 1 trauma centers.
          </p>
          <Link to="/map" className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300">
            View Live Grid Map →
          </Link>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-3 hover:border-blue-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white">Hospital ICU & Bed Tracker</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Real-time synchronization with area hospitals to check available general beds, emergency room capacity, and ICU units.
          </p>
          <Link to="/hospitals" className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300">
            Check Nearby Hospitals →
          </Link>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-3 hover:border-emerald-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-400">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-heading text-white">AI First Aid Assistant</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Instant step-by-step CPR, stroke, burn, and cardiac arrest instructions powered by AI emergency triage protocol.
          </p>
          <Link to="/first-aid" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300">
            Open AI First Aid →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
