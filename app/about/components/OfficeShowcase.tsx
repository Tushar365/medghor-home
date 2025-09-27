// components/OfficeShowcase.tsx
import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface OfficeImage {
  src: string;
  title: string;
  description: string;
  gradient: string;
}

export const OfficeShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const officeImages: OfficeImage[] = [
    {
      src: "/images/office.jpg",
      title: "Reception & Office Space",
      description: "Professional reception area and modern office facilities for seamless operations",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      src: "/images/Retailstore.jpg", 
      title: "Pratima Medicare",
      description: "Our flagship retail pharmacy store offering personalized service and expert care",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      src: "/images/wholesale.jpg",
      title: "Wholesale Distribution Center",
      description: "Our state-of-the-art warehouse facility ensuring reliable supply chain and inventory management",
      gradient: "from-emerald-500 to-teal-400"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % officeImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [officeImages.length]);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    const newIndex = currentIndex + newDirection;
    if (newIndex < 0) {
      setCurrentIndex(officeImages.length - 1);
    } else if (newIndex >= officeImages.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="mb-24 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Our <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Spaces</span>
        </h3>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Take a look inside our modern facilities designed for your comfort and care
        </p>
      </motion.div>

      {/* Main Slider Container */}
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Image Slider */}
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[85vh] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-white/10">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="relative w-full h-full">
                <Image
                  src={officeImages[currentIndex].src}
                  alt={officeImages[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback') as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                
                {/* Fallback for missing images */}
                <div className={`image-fallback hidden absolute inset-0 bg-gradient-to-br ${officeImages[currentIndex].gradient} items-center justify-center`}>
                  <div className="text-center text-white">
                    <svg className="w-24 h-24 mx-auto mb-6 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-2xl font-bold">{officeImages[currentIndex].title}</p>
                  </div>
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Content overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 lg:p-16">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="max-w-3xl"
                  >
                    <h4 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r ${officeImages[currentIndex].gradient} bg-clip-text text-transparent`}>
                      {officeImages[currentIndex].title}
                    </h4>
                    <p className="text-gray-200 text-lg md:text-xl lg:text-2xl leading-relaxed">
                      {officeImages[currentIndex].description}
                    </p>
                    
                    {/* Animated underline */}
                    <motion.div 
                      className={`w-24 h-1 bg-gradient-to-r ${officeImages[currentIndex].gradient} mt-6 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: 96 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    />
                  </motion.div>
                </div>

                {/* Floating elements */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 bg-gradient-to-r ${officeImages[currentIndex].gradient} rounded-full opacity-40`}
                    style={{
                      top: `${15 + i * 15}%`,
                      right: `${5 + i * 8}%`,
                    }}
                    animate={{
                      y: [-5, 5, -5],
                      opacity: [0.2, 0.6, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {officeImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative"
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? `bg-gradient-to-r ${officeImages[index].gradient} scale-125` 
                  : 'bg-white/30 hover:bg-white/50'
              }`} />
              {index === currentIndex && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r ${officeImages[index].gradient} blur-sm opacity-50`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Thumbnail Strip */}
        <div className="flex justify-center mt-8 space-x-4 px-4 overflow-x-auto">
          {officeImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? 'border-white/60 scale-105' 
                  : 'border-white/20 hover:border-white/40 hover:scale-102'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.thumb-fallback') as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div className={`thumb-fallback hidden absolute inset-0 bg-gradient-to-br ${image.gradient} items-center justify-center`}>
                <svg className="w-6 h-6 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {index !== currentIndex && (
                <div className="absolute inset-0 bg-black/40" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default OfficeShowcase;