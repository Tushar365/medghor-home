// app/dashboard/components/ContactFooter.tsx
import React from 'react';

const ContactFooter = () => {
  return (
    <div className="bg-amber-100 border-2 sm:border-4 border-amber-800 rounded-lg shadow-lg mt-4 sm:mt-8 p-3 sm:p-6 text-center">
      <p className="text-amber-800 font-serif text-sm sm:text-lg font-bold mb-2 sm:mb-4">
        FOR INQUIRIES CONTACT MEDGHOR DISTRIBUTORS MANAGEMENT
      </p>
      <div className="space-y-1 sm:space-y-2 text-amber-800 font-serif text-xs sm:text-base">
        <p className="break-words">
          <span className="font-bold">Phone:</span> +1 (123) 456-7890, +1 (987) 654-3210
        </p>
        <p className="break-words">
          <span className="font-bold">WhatsApp:</span>{' '}
          <a 
            href="https://wa.me/11234567890" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-700 hover:underline break-words"
          >
            +1 (123) 456-7890
          </a>
        </p>
        <p className="break-words">
          <span className="font-bold">Email:</span>{' '}
          <a 
            href="mailto:info@medghordistributors.com" 
            className="text-blue-700 hover:underline break-words"
          >
            info@medghordistributors.com
          </a>
        </p>
        <p className="break-words">
          <span className="font-bold">Address:</span> 123 Distribution Lane, Business City, BC 12345
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center mt-2 sm:mt-4 gap-1 sm:gap-4 text-amber-700 font-serif text-xs sm:text-base">
        <span>★</span>
        <span>ESTABLISHED DISTRIBUTOR</span>
        <span>★</span>
        <span className="hidden sm:inline">RELIABLE SERVICE</span>
        <span className="sm:hidden">RELIABLE</span>
        <span>★</span>
      </div>
    </div>
  );
};

export default ContactFooter;