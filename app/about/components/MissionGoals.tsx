// components/MissionGoals.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface Goal {
  title: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
}

export const MissionGoals: React.FC = () => {
  const [activeGoal, setActiveGoal] = useState(0);

  const goals: Goal[] = [
    {
      title: "Accessible Healthcare",
      description: "Revolutionary approach to making premium medicines affordable for everyone, breaking barriers to quality healthcare.",
      icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
      color: "text-blue-400",
      bgGradient: "from-blue-600/20 to-cyan-600/20"
    },
    {
      title: "Quality Excellence", 
      description: "Uncompromising standards in pharmaceutical products, exceeding international quality benchmarks consistently.",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "text-emerald-400",
      bgGradient: "from-emerald-600/20 to-green-600/20"
    },
    {
      title: "Customer Obsession",
      description: "Every decision, every innovation, every solution designed around creating exceptional customer experiences.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      color: "text-pink-400",
      bgGradient: "from-pink-600/20 to-rose-600/20"
    },
    {
      title: "Future Innovation",
      description: "Pioneering next-generation healthcare delivery through cutting-edge technology and forward-thinking solutions.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "text-violet-400",
      bgGradient: "from-violet-600/20 to-purple-600/20"
    }
  ];

  // Auto-cycle through goals
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGoal((prev) => (prev + 1) % goals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [goals.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const goalVariants : Variants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      rotateY: -20
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="mb-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div 
        className="text-center mb-16"
        variants={goalVariants}
      >
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Our <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Mission</span>
        </h3>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Four pillars that define our commitment to revolutionary healthcare
        </p>
      </motion.div>
      
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <motion.div 
              key={index}
              className={`group cursor-pointer transition-all duration-500 ${
                activeGoal === index 
                  ? 'scale-105' 
                  : 'hover:scale-102'
              }`}
              variants={goalVariants}
              onClick={() => setActiveGoal(index)}
              whileHover={{ x: 10 }}
            >
              <div className={`relative bg-gradient-to-r ${goal.bgGradient} backdrop-blur-xl border rounded-2xl p-6 transition-all duration-500 ${
                activeGoal === index 
                  ? 'border-white/40 shadow-2xl' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.bgGradient} flex items-center justify-center transition-transform duration-300 ${
                    activeGoal === index ? 'scale-110 rotate-12' : 'group-hover:scale-105'
                  }`}>
                    <svg className={`w-8 h-8 ${goal.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={goal.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-2xl font-bold transition-colors duration-300 ${
                      activeGoal === index ? 'text-white' : 'text-gray-200 group-hover:text-white'
                    }`}>
                      {goal.title}
                    </h4>
                    <div className={`w-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded transition-all duration-500 ${
                      activeGoal === index ? 'w-full' : ''
                    }`} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Goal Display */}
        <motion.div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGoal}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 h-full"
              initial={{ opacity: 0, x: 50, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${goals[activeGoal].bgGradient} flex items-center justify-center mb-6`}>
                <svg className={`w-10 h-10 ${goals[activeGoal].color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={goals[activeGoal].icon} />
                </svg>
              </div>
              <h4 className="text-3xl font-bold text-white mb-4">
                {goals[activeGoal].title}
              </h4>
              <p className="text-gray-300 text-lg leading-relaxed">
                {goals[activeGoal].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MissionGoals;
