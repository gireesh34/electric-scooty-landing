"use client";

import { motion } from "framer-motion";
import { Battery, Zap, Gauge } from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: <Battery className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    title: "Long Battery Life",
    metric: "50km",
    description: "Up to 50km range on a single charge"
  },
  {
    icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    title: "Quick Charging",
    metric: "4h",
    description: "Full charge in just 4 hours"
  },
  {
    icon: <Gauge className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    title: "Top Speed",
    metric: "25km/h",
    description: "Reach speeds\nup to 25km/h"
  }
];

export default function Features() {
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Effect to handle window resize and initial size
  useEffect(() => {
    // Set initial size
    setWindowWidth(window.innerWidth);
    
    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const calculatePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    
    // Increased radius for mobile to add more space
    let radius = 220; // Default XL size
    
    if (windowWidth < 360) radius = 45;      // Very small mobile - more space
    else if (windowWidth < 480) radius = 55; // Mobile - more space
    else if (windowWidth < 640) radius = 75; // Small screens - more space
    else if (windowWidth < 768) radius = 120; // Tablets - more space
    else if (windowWidth < 1024) radius = 180; // Desktop
    
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return { x, y };
  };

  return (
    <section className="min-h-[400px] xs:min-h-[450px] sm:min-h-[550px] md:min-h-[650px] flex items-center justify-center py-6 sm:py-8 md:py-12 relative w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-4 sm:mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          <p className="text-gray-900 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Experience the perfect blend of power, efficiency, and innovation
          </p>
        </motion.div>
        
        <div className="relative flex justify-center items-center h-[240px] xs:h-[270px] sm:h-[380px] md:h-[450px] w-full">
          <motion.div 
            className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-white/40 via-white/30 to-white/20 dark:from-gray-800/40 dark:via-gray-800/30 dark:to-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/40 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-1 xs:p-1.5 sm:p-2.5 md:p-3.5  rounded-full">
                <h3 className="text-xs xs:text-sm sm:text-lg font-bold mb-0.5 xs:mb-1 sm:mb-1.5">REZERO</h3>
                <div className="w-12 xs:w-16 sm:w-24 h-0.5 bg-gradient-to-r from-gray-500 to-gray-700 my-0.5 xs:my-1 sm:my-1.5 rounded-full" />
                <p className="text-[8px] xs:text-[9px] sm:text-xs text-gray-900 dark:text-gray-400">Features</p>
            </div>
          </motion.div>

          {features.map((feature, index) => {
            const position = calculatePosition(index, features.length);
            
            return (
              <motion.div 
                key={index} 
                className="absolute"
                style={{ 
                  left: '50%', 
                  top: '50%',
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))` 
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-1 xs:p-1.5 sm:p-2.5 md:p-3.5 bg-gradient-to-br from-white/50 via-white/30 to-white/10 dark:from-gray-800/50 dark:via-gray-800/30 dark:to-gray-800/10 backdrop-blur-lg rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_3px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.08),0_3px_6px_rgba(0,0,0,0.2)] border border-white/50 dark:border-gray-700/60 flex items-center justify-center z-10 relative">
                  <div 
                    className="drop-shadow-md scale-75 xs:scale-80 sm:scale-90 md:scale-100"
                    style={{
                      color: index === 0 ? '#658246' :
                             index === 1 ? '#ac942a' :
                             index === 2 ? '#652c31' :
                             'currentColor'
                    }}
                  >
                    {feature.icon}
                  </div>
                </div>

                <div 
                  className={`absolute bg-gradient-to-br from-white/50 via-white/30 to-white/10 dark:from-gray-800/50 dark:via-gray-800/30 dark:to-gray-800/10 backdrop-blur-lg p-1 xs:p-1.5 sm:p-2 md:p-3 rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_3px_6px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.08),0_3px_6px_rgba(0,0,0,0.2)] min-w-[60px] xs:min-w-[70px] sm:min-w-[90px] md:min-w-[120px] border border-white/50 dark:border-gray-700/60 ${position.x > 0 ? 'translate-x-[6px] xs:translate-x-[8px] sm:translate-x-[12px] md:translate-x-[16px] left-full' : '-translate-x-[calc(100%+6px)] xs:-translate-x-[calc(100%+8px)] sm:-translate-x-[calc(100%+12px)] md:-translate-x-[calc(100%+16px)]'} -top-[6px] xs:-top-[8px] sm:-top-[10px]`}
                >
                  <h3 className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-medium text-gray-900 dark:text-gray-200 mb-0.5 drop-shadow-sm">
                    {feature.title}
                  </h3>
                  <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-base font-bold mb-0.5 drop-shadow-sm">{feature.metric}</p>
                  <p className="text-[6px] xs:text-[7px] sm:text-[9px] md:text-xs text-gray-900 dark:text-gray-300 drop-shadow-sm">{feature.description.replace('\n', ' ')}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
