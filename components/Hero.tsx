// component/hero.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Earth background video */}
        <motion.div 
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5 }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Video failed to load:", e);
            }}
          >
            <source src="/123.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Overlay with content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl overflow-hidden">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 70, 
                delay: 0.2,
                duration: 1 
              }}
            >
              MedGhor Distributions
            </motion.h1>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 70, 
                delay: 0.4,
                duration: 1 
              }}
            >
              Trusted Medicine Seller
            </motion.h2>
            
            <motion.p 
              className="text-sm md:text-base lg:text-lg opacity-90 max-w-lg"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 70, 
                delay: 0.6,
                duration: 1 
              }}
            >
              We sell trusted medicines with reliability, timely delivery, and competitive rates for your healthcare needs.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;