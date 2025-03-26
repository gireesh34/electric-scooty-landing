"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, Timer, Battery, ShieldCheck, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const performanceMetrics = [
  {
    icon: <Zap className="w-8 h-8" />,
    metric: "500W",
    label: "Motor Power",
    description: "Powerful motor for smooth acceleration"
  },
  {
    icon: <Timer className="w-8 h-8" />,
    metric: "3.2s",
    label: "0-15 km/h",
    description: "Quick acceleration for urban mobility"
  },
  {
    icon: <Battery className="w-8 h-8" />,
    metric: "50km",
    label: "Range",
    description: "Long-range battery life"
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    metric: "IP65",
    label: "Protection",
    description: "Weather-resistant design"
  }
];

export default function Performance() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Toggle description visibility
  const toggleDescription = (index: number) => {
    // Clear any existing timeout when manually toggling
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  // Auto-cycle through descriptions
  useEffect(() => {
    const cycleThroughMetrics = () => {
      setExpandedIndex(current => {
        // If nothing is expanded, start with the first item
        if (current === null) return 0;
        
        // If the last item is expanded, go back to null state
        if (current === performanceMetrics.length - 1) return null;
        
        // Otherwise, advance to the next item
        return current + 1;
      });
      
      // Set timeout for the next cycle
      timeoutRef.current = setTimeout(cycleThroughMetrics, 2000);
    };
    
    // Start the cycle
    timeoutRef.current = setTimeout(cycleThroughMetrics, 2000);
    
    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
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

  // Calculate positions for each metric around the circle
  const calculatePosition = (index: number, total: number, radius: number) => {
    // Start from the top (270 degrees) and go clockwise
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    
    // Responsive radius adjustment based on screen size
    let adjustedRadius = radius;
    if (windowWidth < 640) {
      adjustedRadius = radius * 0.35;
    } else if (windowWidth < 768) {
      adjustedRadius = radius * 0.45;
    } else if (windowWidth < 1024) {
      adjustedRadius = radius * 0.7;
    }
    
    const x = Math.cos(angle) * adjustedRadius;
    const y = Math.sin(angle) * adjustedRadius;
    return { x, y };
  };

  // Function to determine if we should use mobile layout
  const isMobileView = windowWidth < 640;

  return (
    <section className="min-h-[700px] sm:min-h-[800px] md:min-h-[900px] flex items-center justify-center py-8 sm:py-10 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Exceptional Performance</h2>
          <p className="text-gray-900 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Experience unmatched performance with cutting-edge technology and
            powerful features designed for the modern urban commuter.
          </p>
        </motion.div>

        {isMobileView ? (
          // Mobile layout: vertical cards
          <div className="grid grid-cols-1 gap-4 mt-8">
            {performanceMetrics.map((item, index) => (
              <motion.div 
                key={index}
                className={`bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm border ${expandedIndex === index ? 'border-primary/50' : 'border-white/20 dark:border-gray-700/20'} rounded-lg p-4 flex flex-col shadow-lg cursor-pointer transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => toggleDescription(index)}
              >
                <div className="flex items-start">
                  <div className="mr-4 text-primary p-2 bg-white/10 dark:bg-gray-800/10 rounded-full flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <div>
                        <span className="text-xl font-bold">{item.metric}</span>
                        <span className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-400">{item.label}</span>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} 
                      />
                    </div>
                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.p 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm text-gray-900 dark:text-gray-500 overflow-hidden"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Desktop/Tablet layout: circular arrangement
          <div className="relative flex justify-center items-center h-[500px] sm:h-[550px] md:h-[600px]">
            <motion.div 
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-white/10 dark:bg-gray-800/10 backdrop-blur-md flex items-center justify-center border border-white/20 dark:border-gray-700/20 shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">REZERO</h3>
                <div className="w-26 h-0.5 bg-gradient-to-r from-gray-500 to-gray-700 my-2 rounded-full" />
                <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-400">Performance</p>
              </div>
           
              {performanceMetrics.map((item, index) => {
                const position = calculatePosition(index, performanceMetrics.length, 250);
                const isRightSide = position.x > 0;
                
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
                    <div 
                      className={`p-2 sm:p-3 ${expandedIndex === index ? 'bg-primary/20' : 'bg-white/20 dark:bg-gray-900/20'} backdrop-blur-sm rounded-full shadow-lg border ${expandedIndex === index ? 'border-primary/50' : 'border-white/20 dark:border-gray-700/20'} flex items-center justify-center z-10 relative cursor-pointer transition-all duration-300`}
                      onClick={() => toggleDescription(index)}
                    >
                      <div className="text-primary">
                        {item.icon}
                      </div>
                    </div>

                    <div 
                      className={`absolute bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg border ${expandedIndex === index ? 'border-primary/50' : 'border-white/20 dark:border-gray-700/20'} min-w-[100px] sm:min-w-[120px] md:min-w-[150px] transition-all duration-300 hover:scale-105 cursor-pointer ${isRightSide 
                        ? 'translate-x-[10px] sm:translate-x-[15px] left-full'
                        : '-translate-x-[calc(100%+10px)] sm:-translate-x-[calc(100%+15px)]'
                      } top-0`}
                      onClick={() => toggleDescription(index)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400">
                          {item.label}
                        </h3>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} 
                        />
                      </div>
                      <p className="text-base sm:text-lg font-bold">{item.metric}</p>
                      <AnimatePresence>
                        {expandedIndex === index && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs sm:text-sm text-gray-900 dark:text-gray-500 overflow-hidden"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
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