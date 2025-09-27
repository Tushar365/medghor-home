
"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { OfficeShowcase } from './components/OfficeShowcase';
import { MissionGoals } from './components/MissionGoals';
import { TeamSection } from './components/TeamSection';
import { CallToAction } from './components/CallToAction';
import { BackgroundEffects } from './components/BackgroundEffects';

const AboutSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      <BackgroundEffects y={y} rotate={rotate} />
      
      <motion.div 
        className="relative max-w-8xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <HeroSection />
        <OfficeShowcase />
        <MissionGoals />
        <TeamSection />
        <CallToAction />
      </motion.div>
    </section>
  );
};

export default AboutSection;