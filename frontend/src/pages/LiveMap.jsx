import React, { useEffect, useState } from 'react';
import LiveMapComponent from '../components/map/LiveMapComponent';
import { hospitalService } from '../services/hospitalService';

const LiveMap = () => {
  const [hospitals, setHospitals] = useState([]);

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
  }, []);

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
        <LiveMapComponent hospitals={hospitals} />
      </div>
    </div>
  );
};

export default LiveMap;
