import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Siren, Shield, HeartPulse, PhoneCall, History, User, MapPin } from 'lucide-react';
import SOSButton from '../components/sos/SOSButton';
import { sosService } from '../services/sosService';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await sosService.getSOSRequests();
        if (res.success) {
          setHistory(res.sosRequests || []);
        }
      } catch (err) {
        console.warn('[Citizen Dashboard History]', err.message);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-gray-800">
        <div>
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            Verified Citizen Account
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Registered Phone: {user?.phone} | Blood Type: <b className="text-red-400">{user?.bloodGroup || 'O+'}</b>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/contacts"
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" /> Manage Contacts
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SOSButton />
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
          <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" /> Recent Emergency Requests
          </h3>

          <div className="space-y-3">
            {history.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No past emergency dispatches logged.</p>
            ) : (
              history.slice(0, 5).map((item) => (
                <div key={item._id} className="p-3 rounded-2xl bg-gray-900/80 border border-gray-800 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-gray-200">
                    <span>{item.emergencyType} Emergency</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 text-[10px]">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" /> {item.location?.address || 'Location Shared'}
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
