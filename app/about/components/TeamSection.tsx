// components/TeamSection.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface TeamMember {
  name: string;
  image: string;
  gradient: string;
  position: string;
}

export const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Sovondev Roy Choudhury",
      position: "",
      image: "/team/founder.jpg",
      gradient: "from-indigo-600 via-blue-600 to-cyan-500"
    },
    {
      name: "Tushar Thokdar",
      position: "", 
      image: "/team/operations.jpg",
      gradient: "from-purple-600 via-violet-600 to-pink-500"
    },
    {
      name: "Saymol Singh", 
      position: "",
      image: "/team/business.jpg",
      gradient: "from-emerald-600 via-green-600 to-teal-500"
    },
    {
      name: "Partha Sarathi",
      position: "",
      image: "/team/quality.jpg",
      gradient: "from-amber-600 via-orange-600 to-yellow-500"
    },
    {
      name: "Layek",
      position: "",
      image: "/team/it.jpg",
      gradient: "from-rose-600 via-pink-600 to-purple-500"
    },
    {
      name: "Debasish Das",
      position: "",
      image: "/team/it-support.jpg",
      gradient: "from-slate-600 via-gray-600 to-zinc-500"
    },
    {
      name: "Ankan",
      position: "",
      image: "/team/retail.jpg",
      gradient: "from-red-600 via-rose-600 to-orange-500"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const teamMemberVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -15
    },
    visible: (index: number) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: index * 0.15
      }
    })
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mb-24 px-4 md:px-8"
    >
      <motion.div 
        className="text-center mb-20"
        variants={teamMemberVariants}
      >
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight">
          Meet Our{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              Visionaries
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </span>
        </h3>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          The brilliant minds shaping the future of healthcare delivery with innovation and expertise
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <TeamMemberCard 
            key={index} 
            member={member} 
            index={index}
            variants={teamMemberVariants}
          />
        ))}
      </div>
    </motion.div>
  );
};

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  variants: Variants;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index, variants }) => {
  return (
    <motion.div 
      className="group cursor-pointer perspective-1000"
      custom={index}
      variants={variants}
      whileHover={{ 
        y: -25, 
        scale: 1.08,
        rotateY: 5,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        {/* Enhanced image container */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-60 lg:h-60 mx-auto mb-8">
          {/* Multi-layered animated background rings */}
          <motion.div 
            className={`absolute -inset-2 rounded-full bg-gradient-to-r ${member.gradient} opacity-30 blur-sm`}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <motion.div 
            className={`absolute -inset-1 rounded-full bg-gradient-to-l ${member.gradient} opacity-40`}
            animate={{ 
              rotate: [360, 0],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{ 
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Pulsing outer ring */}
          <motion.div 
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${member.gradient} opacity-20`}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Enhanced image wrapper */}
          <div className="absolute inset-3 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-white/10 group-hover:border-white/30 transition-all duration-700 shadow-2xl group-hover:shadow-3xl">
            <Image 
              src={member.image}
              alt={`${member.name} - ${member.position}`}
              width={250}
              height={250}
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-115 group-hover:brightness-110 group-hover:contrast-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const initials = member.name.split(' ').map(n => n[0]).join('');
                const fallbackDiv = e.currentTarget.parentElement?.querySelector('.initials-fallback') as HTMLElement;
                if (fallbackDiv) {
                  fallbackDiv.style.display = 'flex';
                  fallbackDiv.textContent = initials;
                }
              }}
            />
            
            {/* Enhanced initials fallback */}
            <div className={`initials-fallback absolute inset-0 bg-gradient-to-br ${member.gradient} text-white font-bold text-4xl md:text-6xl hidden items-center justify-center shadow-inner`}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            {/* Dynamic hover overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-25 transition-all duration-700`} />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Enhanced floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r ${member.gradient} rounded-full shadow-lg`}
              style={{
                top: `${15 + (i * 12)}%`,
                left: `${20 + (i * 10)}%`,
              }}
              animate={{
                y: [-8, 8, -8],
                x: [-5, 5, -5],
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2 + i * 0.4,
              }}
            />
          ))}
        </div>
        
        {/* Enhanced name styling */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 1 }}
        >
          <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight tracking-wide group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-700 transform group-hover:scale-105">
            {member.name}
          </h4>
          
          <p className="text-gray-400 text-base md:text-lg font-medium group-hover:text-gray-300 transition-all duration-500 transform group-hover:scale-105">
            {member.position}
          </p>
          
          {/* Enhanced underline animation */}
          <motion.div 
            className={`h-1 bg-gradient-to-r ${member.gradient} mx-auto rounded-full shadow-lg`}
            initial={{ width: 0 }}
            whileInView={{ width: '60%' }}
            whileHover={{ width: '100%' }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
          />
          
          {/* Subtle glow effect on hover */}
          <motion.div
            className={`absolute -inset-4 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-all duration-700 -z-10`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamSection;