import React, { useEffect, useRef, useState } from 'react';
import { Ambulance, MapPin, Navigation, Phone, CheckCircle, Radio } from 'lucide-react';
import { useSocket } from '../context/SocketContext';

const AmbulanceDashboard = () => {
  const [unitStatus, setUnitStatus] = useState('Available');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const latestLocation = useRef(null);
  const { socket } = useSocket();
  const [currentDispatch, setCurrentDispatch] = useState({
    id: 'SOS-9821',
    patientName: 'Jane Doe',
    patientPhone: '+1 555-0192',
    emergencyType: 'Cardiac Arrest',
    address: '450 Oakridge Drive, Sector 4',
    coordinates: [12.9716, 77.5946],
    severity: 'Critical'
  });

  const toggleStatus = (status) => {
    setUnitStatus(status);
  };

  useEffect(() => {
    if (!socket || unitStatus === 'Offline') return undefined;
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return undefined;
    }

    const publishLocation = (location) => {
      if (socket.connected && location) {
        socket.emit('location-update', {
          vehicleNumber: 'AMB-101',
          driverName: 'Alex Miller',
          latitude: location.latitude,
          longitude: location.longitude,
          speed: location.speed,
          heading: location.heading,
          timestamp: location.timestamp
        });
      }
    };

    const handleConnect = () => {
      setSocketConnected(true);
      publishLocation(latestLocation.current);
    };
    const handleDisconnect = () => setSocketConnected(false);
    setSocketConnected(socket.connected);
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed,
          heading: position.coords.heading,
          timestamp: position.timestamp
        };
        latestLocation.current = location;
        setCurrentLocation(location);
        setLocationError('');
        publishLocation(location);
      },
      (error) => setLocationError(error.message || 'Unable to read your location.'),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [socket, unitStatus]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 glass-panel p-6 rounded-3xl border border-gray-800">
        <div className="space-y-1">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Ambulance className="w-4 h-4" /> Driver Dispatch Terminal (AMB-101)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Vehicle AMB-101 • Advanced Life Support
          </h1>
        </div>

        {/* Status Toggle Buttons */}
        <div className="flex items-center gap-2">
          {['Available', 'Dispatched', 'Busy', 'Offline'].map((st) => (
            <button
              key={st}
              onClick={() => toggleStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                unitStatus === st
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                  : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Dispatch Card */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-red-500/30 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
              <h3 className="text-lg font-bold font-heading text-white">CURRENT DISPATCH ASSIGNMENT</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 font-mono text-xs font-bold">
              {currentDispatch.severity} SEVERITY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-gray-900/80 rounded-2xl border border-gray-800 space-y-2">
              <span className="text-[10px] text-gray-400 font-mono">PATIENT INFORMATION</span>
              <p className="font-bold text-base text-white">{currentDispatch.patientName}</p>
              <p className="text-gray-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> {currentDispatch.patientPhone}
              </p>
              <p className="text-red-400 font-bold">Type: {currentDispatch.emergencyType}</p>
            </div>

            <div className="p-4 bg-gray-900/80 rounded-2xl border border-gray-800 space-y-2">
              <span className="text-[10px] text-gray-400 font-mono">DESTINATION GPS LOCATION</span>
              <p className="font-bold text-sm text-gray-200 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-red-500" /> {currentDispatch.address}
              </p>
              <p className="text-gray-400 font-mono">
                Coordinates: {currentDispatch.coordinates.join(', ')}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider transition flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" /> START GPS NAVIGATION
            </button>
            <button className="flex-1 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs tracking-wider transition flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> MARK RESOLVED
            </button>
          </div>
        </div>

        {/* Live GPS Beacon Feed */}
        <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
          <h3 className="text-base font-bold font-heading text-white">Live Telemetry</h3>
          <div className="p-4 bg-gray-900 rounded-2xl border border-gray-800 text-xs space-y-2">
            <div className="flex justify-between text-gray-400 font-mono">
              <span>Speed:</span> <b className="text-white">{currentLocation?.speed == null ? '--' : `${Math.round(currentLocation.speed * 3.6)} km/h`}</b>
            </div>
            <div className="flex justify-between text-gray-400 font-mono">
              <span>ETA to Scene:</span> <b className="text-amber-400">3 mins</b>
            </div>
            <div className="flex justify-between text-gray-400 font-mono">
              <span>GPS Status:</span>
              <b className={locationError ? 'text-red-400' : currentLocation && socketConnected ? 'text-emerald-400' : 'text-amber-400'}>
                {unitStatus === 'Offline' ? 'Offline' : locationError ? 'Unavailable' : currentLocation && socketConnected ? 'Broadcasting' : currentLocation ? 'Reconnecting' : 'Waiting'}
              </b>
            </div>
            {currentLocation && (
              <p className="text-gray-500 font-mono">
                {currentLocation.latitude.toFixed(5)}, {currentLocation.longitude.toFixed(5)}
              </p>
            )}
            {locationError && <p className="text-red-300">{locationError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceDashboard;
