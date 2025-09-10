'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SlidingEffectProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
}

const SlidingEffect: React.FC<SlidingEffectProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}) => {
  const getVariants = (): Variants => {
    const baseVariants: Variants = {
      hidden: { 
        opacity: 0,
        x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
        y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: delay / 1000, // convert ms to seconds
        }
      }
    };
    return baseVariants;
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true,  // Only animate once
        amount: 0.1  // Trigger when 10% of element is visible
      }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlidingEffect;