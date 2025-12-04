import React from 'react';

const AnimatedAuthBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0">
        {/* Blob 1 - Violet */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-600/30 to-purple-500/30 rounded-full blur-3xl"
          style={{
            top: '10%',
            left: '5%',
            animation: 'float 8s ease-in-out infinite',
          }}
        ></div>

        {/* Blob 2 - Purple */}
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-600/30 to-purple-300/30 rounded-full blur-3xl"
          style={{
            top: '40%',
            right: '10%',
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '2s',
          }}
        ></div>

        {/* Blob 3 - Blue */}
        <div 
          className="absolute w-72 h-72 bg-gradient-to-r from-purple-700/30 to-purple-600/30 rounded-full blur-3xl"
          style={{
            bottom: '10%',
            left: '10%',
            animation: 'float 12s ease-in-out infinite',
            animationDelay: '4s',
          }}
        ></div>

        {/* Blob 4 - Pink */}
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-400/30 to-purple-300/30 rounded-full blur-3xl"
          style={{
            bottom: '20%',
            right: '5%',
            animation: 'float 9s ease-in-out infinite',
            animationDelay: '1s',
          }}
        ></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Overlay gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-transparent to-purple-900/70"></div>

      {/* Animated background pattern */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          25% {
            transform: translate(30px, -30px) scale(1.05);
            opacity: 0.7;
          }
          50% {
            transform: translate(-30px, 30px) scale(0.95);
            opacity: 0.5;
          }
          75% {
            transform: translate(30px, 30px) scale(1.05);
            opacity: 0.7;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedAuthBackground;
