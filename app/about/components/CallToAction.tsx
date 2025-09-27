// components/CallToAction.tsx
import React from 'react';
import { motion , Variants } from 'framer-motion';

export const CallToAction: React.FC = () => {
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
      className="text-center"
      variants={heroVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div 
        className="relative bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 md:p-16 overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
              'linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(6, 182, 212, 0.2))',
              'linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))'
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative z-10">
          <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Healthcare?
          </h4>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join our mission to revolutionize healthcare delivery and create a healthier world for everyone.
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-bold py-4 px-12 rounded-2xl shadow-2xl text-lg md:text-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 10px 20px rgba(59, 130, 246, 0.1)",
                "0 10px 20px rgba(147, 51, 234, 0.1)",
                "0 10px 20px rgba(6, 182, 212, 0.1)",
                "0 10px 20px rgba(59, 130, 246, 0.1)"
              ]
            }}
            transition={{
              boxShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            Connect With Us Today
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

