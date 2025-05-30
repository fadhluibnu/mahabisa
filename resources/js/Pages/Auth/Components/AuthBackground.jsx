import React from 'react';

const AuthBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Gradient Blobs */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full -top-24 -right-72 opacity-10 blur-[70px] animate-float-slow"></div>
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-amber-500 to-pink-500 rounded-full -bottom-48 -left-60 opacity-10 blur-[70px] animate-float"></div>
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] opacity-[0.015] pointer-events-none"></div>
    </div>
  );
};

export default AuthBackground;
