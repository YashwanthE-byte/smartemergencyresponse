import React from 'react';

const LoadingSpinner = ({ text = 'Loading System...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-red-500/20 animate-ping"></div>
        <div className="w-12 h-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
