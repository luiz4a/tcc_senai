import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* Animated gradient blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div 
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        style={{ animationDelay: '2s' }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        style={{ animationDelay: '4s' }}
      ></div>
      
      {/* Additional floating elements */}
      <div 
        className="absolute top-1/3 right-1/4 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"
        style={{ animationDelay: '1s' }}
      ></div>
      <div 
        className="absolute bottom-1/3 left-1/3 w-60 h-60 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: '3s' }}
      ></div>
      
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
