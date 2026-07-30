import React, { useEffect, useState } from 'react';
import { hospitalService } from '../services/hospitalService';
import { Building2, PhoneCall, Bed, HeartPulse, ShieldCheck, MapPin } from 'lucide-react';

const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await hospitalService.getHospitals();
        if (res.success) {
          setHospitals(res.hospitals || []);
        }
      } catch (err) {
        console.warn('[NearbyHospitals Error]', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
          Nearby Emergency Hospitals & Bed Availability
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Live bed metrics, trauma level, emergency phone lines, and distance tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hosp) => (
          <div
            key={hosp._id}
            className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4 hover:border-gray-700 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  {hosp.traumaCenterLevel || 'Level 1 Trauma'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white font-heading">{hosp.name}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" /> {hosp.address}
                </p>
              </div>

              {/* Bed Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2.5 bg-gray-900/80 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-[10px] text-gray-400 block font-mono">AVAILABLE BEDS</span>
                  <span className="text-sm font-black text-emerald-400">
                    {hosp.availableBeds} / {hosp.totalBeds}
                  </span>
                </div>
                <div className="p-2.5 bg-gray-900/80 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-[10px] text-gray-400 block font-mono">ICU BEDS</span>
                  <span className="text-sm font-black text-amber-400">
                    {hosp.icuBedsAvailable} / {hosp.icuBedsTotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
              <a
                href={`tel:${hosp.emergencyContact}`}
                className="w-full py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-bold text-center flex items-center justify-center gap-2 transition"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Call Emergency Room: {hosp.emergencyContact}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyHospitals;
