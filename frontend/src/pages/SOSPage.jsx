import React from 'react';
import SOSButton from '../components/sos/SOSButton';

const SOSPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black font-heading text-red-500 uppercase tracking-widest">
          High-Priority Dispatch Console
        </h1>
        <p className="text-xs text-gray-400">
          Emergency Signal broadcasting instantly to all nearby active ambulance units and regional trauma centers.
        </p>
      </div>

      <SOSButton />
    </div>
  );
};

export default SOSPage;
