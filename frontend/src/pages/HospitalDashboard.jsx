import React, { useState } from 'react';
import { Building2, Bed, HeartPulse, UserPlus, Save, AlertCircle } from 'lucide-react';

const HospitalDashboard = () => {
  const [beds, setBeds] = useState({
    totalBeds: 120,
    availableBeds: 34,
    icuTotal: 25,
    icuAvailable: 6
  });

  const [saved, setSaved] = useState(false);

  const handleSaveBeds = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="glass-panel p-6 rounded-3xl border border-gray-800 flex justify-between items-center">
        <div>
          <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4" /> Hospital Bed Management Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            St. Jude Memorial Hospital & Emergency Care
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bed Capacity Controls */}
        <form onSubmit={handleSaveBeds} className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
          <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
            <Bed className="w-5 h-5 text-blue-400" /> Update Live Bed Inventory
          </h3>

          {saved && (
            <div className="p-2.5 bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs rounded-xl">
              Bed capacity updated across regional emergency grid!
            </div>
          )}

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-gray-300 font-semibold uppercase">Available General Beds</label>
              <input
                type="number"
                value={beds.availableBeds}
                onChange={(e) => setBeds({ ...beds, availableBeds: parseInt(e.target.value) || 0 })}
                className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white font-bold"
              />
            </div>

            <div>
              <label className="text-gray-300 font-semibold uppercase">Available ICU Beds</label>
              <input
                type="number"
                value={beds.icuAvailable}
                onChange={(e) => setBeds({ ...beds, icuAvailable: parseInt(e.target.value) || 0 })}
                className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider transition flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> BROADCAST BED UPDATE
          </button>
        </form>

        {/* Incoming Patients Feed */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
          <h3 className="text-base font-bold font-heading text-white">Incoming Emergency Ambulances</h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-gray-900/90 rounded-2xl border border-red-500/30 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 text-[10px] font-bold">
                  ETA: 4 MINS • AMB-101
                </span>
                <p className="font-bold text-white text-sm mt-1">Patient: Cardiac Emergency</p>
                <p className="text-gray-400 text-[11px]">Triage status: ICU Pre-Assigned</p>
              </div>
              <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl">
                PRE-ACCEPT PATIENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
