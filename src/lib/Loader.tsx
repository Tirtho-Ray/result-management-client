// Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full"></div>
    </div>
  );
};

export default Loader;
