import React from "react";

const Skeleton = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden md:flex animate-pulse">
        <div className="md:flex-shrink-0">
          <div className="w-full h-96 md:w-64 bg-gray-700"></div>
        </div>
        <div className="p-8 flex flex-col justify-center w-full">
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
