// components/HeroSection.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';


export const HeroSection: React.FC = () => {
  const heroVariants : Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 100
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1.2
      }
    }
  };

  return (
    <motion.div 
      className="text-center mb-20"
      variants={heroVariants}
    >
      <motion.div
        className="relative inline-block mb-8"
        whileHover={{ scale: 1.05 }}
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            About
          </span>
        </h1>
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <motion.p 
        className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Where healthcare innovation meets compassionate care, creating a healthier tomorrow for everyone.
      </motion.p>
    </motion.div>
  );
};

