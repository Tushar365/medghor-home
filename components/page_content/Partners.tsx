// src/components/Partners.tsx
import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

interface PartnerLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const Partners: React.FC = () => {
  const partnerLogos: PartnerLogo[] = [
    {
      src: "/brands/sun.png",
      alt: "Sun Pharma",
      width: 128,
      height: 128
    },
    {
      src: "/brands/alkem.png",
      alt: "Alkem Laboratories",
      width: 128,
      height: 128
    },
    {
      src: "/brands/man.png",
      alt: "Mankind Pharma",
      width: 128,
      height: 128
    },
    {
      src: "/brands/hima.png",
      alt: "Himalaya Drug Company",
      width: 128,
      height: 128
    },
    {
      src: "/brands/abott.png",
      alt: "Abbott Laboratories",
      width: 128,
      height: 128
    }
  ];

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

  const titleVariants : Variants = {
    hidden: { 
      opacity: 0, 
      y: -30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.8,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <section className="relative py-20 px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"
        variants={backgroundVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      
      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200/40 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={titleVariants as Variants}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Trusted Brands
          </h2>
          <p className="text-lg md:text-xl text-white mb-16 max-w-2xl mx-auto">
            Collaborating with industry leaders to deliver exceptional pharmaceutical solutions
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12"
          variants={containerVariants}
        >
          {partnerLogos.map((logo, index) => (
            <motion.div 
              key={`partner-${index}`}
              className="group cursor-pointer"
              variants={logoVariants as Variants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative p-6 bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100 h-32 md:h-36 lg:h-40">
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-500" />
                
                <div className="relative h-full flex items-center justify-center">
                  {/* Fixed container for consistent sizing */}
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="max-w-full max-h-full w-auto h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                      quality={90}
                      onError={() => {
                        console.warn(`Failed to load image: ${logo.src}`);
                        // You could set a fallback image here if needed
                      }}
                    />
                  </div>
                  
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                </div>
              </div>
              
              {/* Partner name tooltip */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                {logo.alt}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.8, duration: 0.6 }
            }
          }}
        >
          
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Partners;