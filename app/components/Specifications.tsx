"use client";

import { motion } from "framer-motion";
import { Gauge, Battery, Clock, Weight, Zap, Route } from "lucide-react";
import { useState, useEffect } from "react";

const specifications = [
  { label: "Range", value: "50 kilometers", icon: <Route className="w-6 h-6" /> },
  { label: "Max Speed", value: "25 km/h", icon: <Gauge className="w-6 h-6" /> },
  { label: "Battery", value: "48V 15Ah Lithium", icon: <Battery className="w-6 h-6" /> },
  { label: "Motor", value: "500W Brushless", icon: <Zap className="w-6 h-6" /> },
  { label: "Charging Time", value: "4-6 hours", icon: <Clock className="w-6 h-6" /> },
  { label: "Max Load", value: "120 kg", icon: <Weight className="w-6 h-6" /> }
];

export default function Specifications() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize window width and handle resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation cycle effect - loop through specs every second
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % specifications.length);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate positions for each specification around the circle
  const calculatePosition = (index: number, total: number, radius: number) => {
    // Start from the top (270 degrees) and go clockwise
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    
    // Responsive radius adjustment based on screen size
    let adjustedRadius = radius * 0.85; // Reduced from 1.0 to bring icons closer to center on desktop
    if (windowWidth < 640) {
      adjustedRadius = radius * 0.35; // Mobile stays the same
    } else if (windowWidth < 768) {
      adjustedRadius = radius * 0.55; // Increased from 0.45 for small tablets
    } else if (windowWidth < 1024) {
      adjustedRadius = radius * 0.7; // Increased from 0.6 for tablets
    }
    
    const x = Math.cos(angle) * adjustedRadius;
    const y = Math.sin(angle) * adjustedRadius;
    return { x, y };
  };

  // Function to determine if we should use mobile layout
  const isMobileView = windowWidth < 640;
  
  return (
    <section className="min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex items-center justify-center py-8 sm:py-10 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Technical Specifications
        </motion.h2>
        
        {isMobileView ? (
          // Mobile layout: vertical list
          <div className="grid grid-cols-1 gap-4 mt-8">
            {specifications.map((spec, index) => (
              <motion.div 
                key={index}
                className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-lg p-4 flex items-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mr-4 text-primary">{spec.icon}</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-400">{spec.label}</h3>
                  <p className="text-base font-bold">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Desktop/Tablet layout: circular arrangement
          <div className="relative flex justify-center items-center h-[400px] sm:h-[450px] md:h-[500px]">
            <motion.div 
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 flex items-center justify-center shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">REZERO</h3>
                <div className="w-26 h-0.5 bg-gradient-to-r from-gray-500 to-gray-700 my-2 rounded-full" />
                <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-400">Electric Scooter</p>
              </div>

              {specifications.map((spec, index) => {
                const position = calculatePosition(index, specifications.length, 250);
                const isRightSide = position.x > 0;
                const isActive = index === activeIndex;
                
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
                    <div className="p-2 sm:p-3 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-full shadow-lg flex items-center justify-center z-10 relative">
                      <div className="text-primary">
                        {spec.icon}
                      </div>
                    </div>

                    <motion.div 
                      className="absolute bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-2 sm:p-3 rounded-lg shadow-lg min-w-[100px] sm:min-w-[120px] md:min-w-[140px]"
                      data-position={isRightSide ? 'right' : 'left'}
                      style={{
                        [isRightSide ? 'left' : 'right']: windowWidth >= 640 && windowWidth < 1024 ? '140%' : '120%',
                        top: '-10px',
                        transform: 'translateY(0)',
                        marginLeft: isRightSide ? (windowWidth >= 640 && windowWidth < 1024 ? '20px' : '10px') : '0',
                        marginRight: isRightSide ? '0' : (windowWidth >= 640 && windowWidth < 1024 ? '20px' : '10px')
                      }}
                      animate={{
                        scale: isActive ? [1, 1.15, 1] : 1,
                        boxShadow: isActive ? "0px 0px 15px rgba(255,255,255,0.5)" : "0px 0px 8px rgba(0,0,0,0.1)"
                      }}
                      transition={{
                        duration: isActive ? 1 : 0.3,
                        ease: "easeInOut"
                      }}
                    >
                      <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400">
                        {spec.label}
                      </h3>
                      <p className="text-sm sm:text-base font-bold">{spec.value}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}