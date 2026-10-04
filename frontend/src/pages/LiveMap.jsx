import React, { useEffect, useState } from 'react';
import LiveMapComponent from '../components/map/LiveMapComponent';
import { hospitalService } from '../services/hospitalService';
import api from '../services/api';
import { useSocket } from '../context/SocketContext';

const LiveMap = () => {
  const [hospitals, setHospitals] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const res = await hospitalService.getHospitals();
        if (res.success) {
          setHospitals(res.hospitals || []);
        }
      } catch (err) {
        console.warn('[LiveMap Hospitals]', err.message);
      }
    };
    loadHospitals();
    api.get('/ambulances')
      .then(({ data }) => setAmbulances(data.ambulances || []))
      .catch((err) => console.warn('[LiveMap Ambulances]', err.message));
  }, []);

  useEffect(() => {
    if (!socket) return undefined;

    const handleLocationChange = (location) => {
      if (!location?.vehicleNumber) return;
      setAmbulances((current) => {
        const existing = current.find((ambulance) => ambulance.vehicleNumber === location.vehicleNumber);
        const updatedAmbulance = {
          ...(existing || { vehicleNumber: location.vehicleNumber, driverName: location.driverName || 'Responder' }),
          location: { type: 'Point', coordinates: [location.longitude, location.latitude] },
          lastLocationAt: location.updatedAt || location.timestamp
        };
        return existing
          ? current.map((ambulance) => ambulance.vehicleNumber === location.vehicleNumber ? updatedAmbulance : ambulance)
          : [...current, updatedAmbulance];
      });
    };

    socket.on('location_changed', handleLocationChange);
    return () => socket.off('location_changed', handleLocationChange);
  }, [socket]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
          Real-Time Responder & Hospital Grid Map
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Interactive map displaying active ambulances, hospitals, and emergency dispatch locations.
        </p>
      </div>

      <div className="w-full h-[600px]">
        <LiveMapComponent hospitals={hospitals} ambulances={ambulances} />
      </div>
    </div>
  );
};

export default LiveMap;
