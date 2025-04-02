
import React from 'react';

const Logo = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
  const sizeClass = {
    small: 'text-xl md:text-2xl',
    default: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl'
  };

  return (
    <div className="flex items-center">
      <div className="relative mr-2">
        <div className="h-7 w-7 md:h-9 md:w-9 rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 rounded-lg animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="h-3 w-3 md:h-4 md:w-4 bg-white rounded-full relative z-10"></div>
        </div>
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
      </div>
      <h1 className={`font-bold tracking-tight ${sizeClass[size]}`}>
        <span className="text-gradient">Ultra</span>
        <span className="text-white">AI</span>
      </h1>
    </div>
  );
};

export default Logo;
