import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LiveMapComponent = ({
  center = [12.9716, 77.5946],
  zoom = 13,
  hospitals = [],
  ambulances = [],
  sosRequests = []
}) => {
  const mapRef = useRef(null);
  const leafletInstance = useRef(null);
  const hospitalLayer = useRef(null);
  const ambulanceLayer = useRef(null);

  useEffect(() => {
    if (!mapRef.current || leafletInstance.current) return undefined;

    const map = L.map(mapRef.current).setView(center, zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    leafletInstance.current = map;
    hospitalLayer.current = L.layerGroup().addTo(map);
    ambulanceLayer.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      leafletInstance.current = null;
      hospitalLayer.current = null;
      ambulanceLayer.current = null;
    };
  }, []);

  useEffect(() => {
    leafletInstance.current?.setView(center, zoom);
  }, [center, zoom]);

  useEffect(() => {
    if (leafletInstance.current) {
      const map = leafletInstance.current;

      hospitalLayer.current?.clearLayers();
      ambulanceLayer.current?.clearLayers();

      hospitals.forEach((h) => {
        if (h.location?.coordinates) {
          const [lng, lat] = h.location.coordinates;
          L.marker([lat, lng])
            .addTo(hospitalLayer.current || map)
            .bindPopup(`<b>🏥 ${h.name}</b><br/>Available Beds: ${h.availableBeds}/${h.totalBeds}`);
        }
      });

      ambulances.forEach((a) => {
        if (a.location?.coordinates) {
          const [lng, lat] = a.location.coordinates;
          L.marker([lat, lng])
            .addTo(ambulanceLayer.current || map)
            .bindPopup(`<b>🚑 ${a.vehicleNumber}</b> (${a.driverName})<br/>Status: ${a.status}`);
        }
      });
    }
  }, [hospitals, ambulances, sosRequests]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
      <div ref={mapRef} className="w-full h-full min-h-[400px] z-10" />

      {/* Map Overlay Controls */}
      <div className="absolute top-4 right-4 z-20 glass-panel p-3 rounded-xl border border-gray-700/60 text-xs space-y-2">
        <p className="font-bold text-gray-200 uppercase tracking-wider mb-1">Live Map Legend</p>
        <div className="flex items-center gap-2 text-blue-400 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Hospitals & Trauma
        </div>
        <div className="flex items-center gap-2 text-amber-400 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Ambulances
        </div>
        <div className="flex items-center gap-2 text-red-500 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span> Active SOS Signals
        </div>
      </div>
    </div>
  );
};

export default LiveMapComponent;
