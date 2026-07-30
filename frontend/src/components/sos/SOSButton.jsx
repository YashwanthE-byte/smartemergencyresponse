import React, { useState } from 'react';
import { Siren, MapPin, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { sosService } from '../../services/sosService';

const SOSButton = ({ onSosSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [emergencyType, setEmergencyType] = useState('Medical');
  const [activeAlert, setActiveAlert] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const triggerEmergency = async () => {
    setLoading(true);
    setErrorMsg('');

    // Fetch user geolocation
    let lat = 12.9716;
    let lng = 77.5946;

    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      } catch (err) {
        console.warn('[Geolocation] Using fallback coordinates:', err.message);
      }
    }

    try {
      const res = await sosService.triggerSOS({
        emergencyType,
        latitude: lat,
        longitude: lng,
        severity: 'High',
        additionalNotes: 'One-tap emergency SOS triggered via User Interface'
      });

      if (res.success) {
        setActiveAlert(res.sos);
        if (onSosSuccess) onSosSuccess(res.sos);
      } else {
        setErrorMsg(res.message || 'Failed to dispatch SOS alert');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Network error triggering SOS');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 glass-panel rounded-3xl border border-red-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="space-y-2 z-10">
        <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold tracking-widest uppercase border border-red-500/30 inline-flex items-center gap-1.5">
          <Siren className="w-3.5 h-3.5 animate-pulse" /> 24/7 Rapid Emergency Dispatch
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
          Press Button to Request Immediate Aid
        </h2>
        <p className="text-xs sm:text-sm text-gray-400">
          Sends your real-time GPS location to nearby Ambulances & Central Dispatch Hospitals instantly.
        </p>
      </div>

      {/* Emergency Category Selector */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-md z-10">
        {['Medical', 'Cardiac', 'Accident', 'Fire', 'Pregnancy', 'General'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setEmergencyType(type)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
              emergencyType === type
                ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/40 scale-105'
                : 'bg-gray-800/80 text-gray-400 border-gray-700 hover:border-gray-600'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Big Pulsing SOS Button */}
      <div className="py-4 z-10">
        <button
          onClick={triggerEmergency}
          disabled={loading}
          className="w-44 h-44 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-red-500 text-white flex flex-col items-center justify-center font-heading font-black text-3xl tracking-widest shadow-2xl shadow-red-600/60 hover:shadow-red-600/90 active:scale-95 transition-all cursor-pointer sos-pulse-button border-4 border-red-400/40 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Siren className="w-10 h-10 mb-1 animate-bounce" />
              <span>SOS</span>
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <div className="w-full p-3 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {activeAlert && (
        <div className="w-full p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs space-y-2 text-left z-10">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>EMERGENCY DISPATCHED (ID: {activeAlert._id})</span>
          </div>
          <p className="text-gray-300">
            Emergency Type: <b>{activeAlert.emergencyType}</b> | Status: <b>{activeAlert.status}</b>
          </p>
          <div className="flex items-center gap-1.5 text-gray-400 font-mono">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>GPS Coords: {activeAlert.location?.coordinates?.join(', ')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSButton;
