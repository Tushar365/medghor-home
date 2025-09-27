// components/BackgroundEffects.tsx
import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface BackgroundEffectsProps {
  y: MotionValue<number>;
  rotate: MotionValue<number>;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ y, rotate }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Animated mesh gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y, rotate }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-500/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </motion.div>
      
      {/* Dynamic particles */}
      <ParticleField />
    </div>
  );
};

const ParticleField: React.FC = () => {
  return (
    <>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </>
  );
};

export default BackgroundEffects;
