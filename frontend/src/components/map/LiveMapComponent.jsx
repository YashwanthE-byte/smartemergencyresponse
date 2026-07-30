import React, { useEffect, useRef } from 'react';

const LiveMapComponent = ({
  center = [12.9716, 77.5946],
  zoom = 13,
  hospitals = [],
  ambulances = [],
  sosRequests = []
}) => {
  const mapRef = useRef(null);
  const leafletInstance = useRef(null);

  useEffect(() => {
    // Dynamically load Leaflet JS script if window.L is not available
    if (window.L && mapRef.current && !leafletInstance.current) {
      try {
        const map = window.L.map(mapRef.current).setView(center, zoom);

        // Dark matter map tiles for sleek high-tech emergency visual aesthetics
        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);

        leafletInstance.current = map;
      } catch (err) {
        console.warn('[Map Component] Leaflet initialization:', err.message);
      }
    }
  }, [center, zoom]);

  useEffect(() => {
    if (leafletInstance.current && window.L) {
      const map = leafletInstance.current;

      // Add Hospital markers
      hospitals.forEach((h) => {
        if (h.location?.coordinates) {
          const [lng, lat] = h.location.coordinates;
          window.L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<b>🏥 ${h.name}</b><br/>Available Beds: ${h.availableBeds}/${h.totalBeds}`);
        }
      });

      // Add Ambulance markers
      ambulances.forEach((a) => {
        if (a.location?.coordinates) {
          const [lng, lat] = a.location.coordinates;
          window.L.marker([lat, lng])
            .addTo(map)
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
