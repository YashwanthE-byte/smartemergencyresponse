import React from 'react';
import { Link } from 'react-router-dom';
import { Siren, AlertTriangle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/30">
        <AlertTriangle className="w-10 h-10 animate-bounce" />
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl font-black font-heading text-white">404</h1>
        <h2 className="text-xl font-bold text-gray-200">Page Not Found</h2>
        <p className="text-xs text-gray-400 max-w-sm mx-auto">
          The emergency page or resource you requested does not exist or has been relocated.
        </p>
      </div>

      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider transition inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> RETURN TO EMERGENCY HOME
      </Link>
    </div>
  );
};

export default NotFound;
