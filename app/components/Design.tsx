"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";

const designFeatures = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Durable Build",
    description: "Aircraft-grade aluminum frame for maximum durability"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Premium Finish",
    description: "Sleek design with premium paint finish"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Smart Integration",
    description: "Connect with our mobile app for enhanced features"
  }
];

export default function Design() {
  const [windowWidth, setWindowWidth] = useState(0);
  
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
  
  const calculatePosition = (index: number, total: number, radius: number) => {
    // For triangle, we want to start from the top and space items 120 degrees apart
    const angle = (index * (2 * Math.PI / 3)) + (Math.PI / 2);
    
    // Responsive radius adjustment based on screen size
    let adjustedRadius = radius;
    if (windowWidth < 640) {
      adjustedRadius = radius * 0.35;
    } else if (windowWidth < 768) {
      adjustedRadius = radius * 0.5;
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
    <section className="min-h-[700px] sm:min-h-[800px] md:min-h-[950px] flex items-center justify-center py-8 sm:py-10 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Designed for Excellence</h2>
          <p className="text-gray-900 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Every detail of the REZERO scooter is crafted with precision and care,
            ensuring both aesthetic appeal and functional excellence.
          </p>
        </motion.div>

        {isMobileView ? (
          // Mobile layout: vertical list
          <div className="grid grid-cols-1 gap-4 mt-8">
            {designFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-lg p-4 flex items-start shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mr-4 text-primary p-2 bg-white/20 dark:bg-gray-800/20 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-400 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-bold">{feature.description}</p>
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
              <div className="text-center p-3 sm:p-4 relative z-10">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">REZERO</h3>
                <div className="w-26 h-0.5 bg-gradient-to-r from-gray-500 to-gray-700 my-2 rounded-full" />
                <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-400">Design</p>
              </div>

              {designFeatures.map((feature, index) => {
                const position = calculatePosition(index, designFeatures.length, 250);
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
                    <div className="p-2 sm:p-3 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-full shadow-lg flex items-center justify-center z-10 relative">
                      <div className="text-primary">
                        {feature.icon}
                      </div>
                    </div>

                    <div 
                      className={`absolute bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-2 sm:p-3 rounded-lg shadow-lg min-w-[120px] sm:min-w-[150px] md:min-w-[180px] transition-all duration-300 hover:scale-105 ${isRightSide 
                        ? 'translate-x-[10px] sm:translate-x-[15px] left-full'
                        : '-translate-x-[calc(100%+10px)] sm:-translate-x-[calc(100%+15px)]'
                      } top-0`}
                    >
                      <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold">{feature.description}</p>
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