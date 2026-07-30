import React from 'react';
import { Siren, Heart, PhoneCall, ShieldAlert, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#060911] border-t border-gray-800/80 text-gray-400 py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <Siren className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold font-heading text-white">RESQUE AI</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Next-generation Smart Emergency Response System integrating real-time geolocation, hospital bed dispatching, and AI-driven triage.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">Emergency Lines</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2 text-red-400 font-semibold">
              <PhoneCall className="w-3.5 h-3.5" /> Medical Ambulance: 911 / 108
            </li>
            <li className="flex items-center gap-2 text-amber-400 font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" /> Fire Brigade: 101
            </li>
            <li className="flex items-center gap-2 text-blue-400 font-semibold">
              <Globe className="w-3.5 h-3.5" /> Central Dispatch: +1 800-555-EMERGENCY
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">System Access</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="/login" className="hover:text-white transition">Citizen Portal</a></li>
            <li><a href="/login" className="hover:text-white transition">Ambulance Dispatch Console</a></li>
            <li><a href="/login" className="hover:text-white transition">Hospital Bed Management</a></li>
            <li><a href="/login" className="hover:text-white transition">System Administrator</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">Status</h4>
          <div className="glass-panel p-3 rounded-lg border border-emerald-500/20 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
            <div>
              <p className="text-xs font-semibold text-emerald-400">All Networks Operational</p>
              <p className="text-[10px] text-gray-400">Avg. Response Time: 4.8 mins</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-800/60 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2026 Smart Emergency Response System. Production Ready Architecture.</p>
        <p className="flex items-center gap-1 mt-2 md:mt-0">
          Engineered for mission-critical life saving <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
