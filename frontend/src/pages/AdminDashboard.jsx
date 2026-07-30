import React, { useEffect, useState } from 'react';
import { Shield, Activity, Users, Ambulance, Building2, AlertTriangle, Radio } from 'lucide-react';
import api from '../services/api';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    metrics: {
      totalEmergencyCallsToday: 42,
      activeSOSIncidents: 3,
      averageResponseTimeMinutes: 4.8,
      ambulancesAvailable: 14,
      ambulancesDispatched: 5,
      hospitalBedsAvailable: 114,
      icuBedsAvailable: 19
    },
    recentIncidents: [
      { id: 'SOS-901', type: 'Cardiac Emergency', status: 'En Route', time: '10 mins ago', location: '7th Avenue Main St' },
      { id: 'SOS-902', type: 'Motor Accident', status: 'Dispatched', time: '22 mins ago', location: 'Highway 101 KM 14' }
    ]
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics');
        if (res.data?.success) {
          setAnalytics(res.data);
        }
      } catch (err) {
        console.warn('[Admin Dashboard Analytics]', err.message);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center justify-between glass-panel p-6 rounded-3xl border border-gray-800">
        <div>
          <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-4 h-4" /> System Administrator Control Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Emergency Network Oversight & Live Analytics
          </h1>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold font-mono">
          SYSTEM ACTIVE
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-mono">ACTIVE SOS INCIDENTS</span>
          <p className="text-2xl font-black text-red-500 flex items-center gap-2">
            {analytics.metrics.activeSOSIncidents} <Radio className="w-4 h-4 animate-ping" />
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-mono">AVAILABLE AMBULANCES</span>
          <p className="text-2xl font-black text-amber-400">
            {analytics.metrics.ambulancesAvailable} units
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-mono">TOTAL ICU BEDS</span>
          <p className="text-2xl font-black text-blue-400">
            {analytics.metrics.icuBedsAvailable} available
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-mono">AVG RESPONSE TIME</span>
          <p className="text-2xl font-black text-emerald-400">
            {analytics.metrics.averageResponseTimeMinutes} mins
          </p>
        </div>
      </div>

      {/* Live Incident Log Table */}
      <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold font-heading text-white">Live Central Dispatch Log</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-900/90 text-gray-400 font-mono text-[10px] uppercase border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Incident ID</th>
                <th className="py-3 px-4">Emergency Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {analytics.recentIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-gray-800/40">
                  <td className="py-3 px-4 font-mono font-bold text-white">{inc.id}</td>
                  <td className="py-3 px-4 text-red-400 font-semibold">{inc.type}</td>
                  <td className="py-3 px-4">{inc.location}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px]">
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{inc.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
