// app/dashboard/components/DashboardHeader.tsx
import React from 'react';

const DashboardHeader = () => {
  return (
    <div className="bg-amber-100 border-4 sm:border-8 border-amber-800 rounded-lg shadow-lg mb-4 sm:mb-8 p-4 sm:p-8 text-center relative">
      <div className="absolute top-2 left-2 sm:left-4 w-2 sm:w-3 h-2 sm:h-3 bg-red-600 rounded-full shadow-md"></div>
      <div className="absolute top-2 right-2 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 bg-red-600 rounded-full shadow-md"></div>
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 sm:w-3 h-2 sm:h-3 bg-red-600 rounded-full shadow-md"></div>
      
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-amber-900 font-serif mb-2 tracking-wide leading-tight">
        MEDGHOR DISTRIBUTORS
      </h1>
      <div className="w-16 sm:w-32 h-0.5 sm:h-1 bg-amber-800 mx-auto mb-2 sm:mb-4"></div>
      <h2 className="text-sm sm:text-lg md:text-2xl text-amber-800 font-serif italic">
        ★ OFFICIAL PRODUCT BOARD ★
      </h2>
      <p className="text-amber-700 mt-2 sm:mt-4 font-serif text-xs sm:text-base md:text-lg">
        Current Date: {new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
    </div>
  );
};

export default DashboardHeader;