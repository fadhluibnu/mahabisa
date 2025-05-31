import React from 'react';

const BackgroundElements = () => {
  return (
    <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
      {/* Blob decorations - Responsive sizing using viewport units */}
      <div className='absolute top-[-5vh] left-[-10vw] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] min-w-[300px] min-h-[300px] rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-5 blur-[70px] animate-float-slow'></div>
      <div className='absolute bottom-[-10vh] right-[-5vw] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] min-w-[250px] min-h-[250px] rounded-full bg-gradient-to-r from-amber-500 to-pink-500 opacity-5 blur-[70px] animate-float-slow-reverse'></div>

      {/* Subtle grain texture */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] opacity-[0.015]"></div>

      {/* Responsive mesh gradient */}
      <div className='fixed top-0 right-0 w-full md:w-1/2 h-1/3 md:h-1/2 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),rgba(236,72,153,0.025),transparent_60%)]'></div>
    </div>
  );
};

export default BackgroundElements;
