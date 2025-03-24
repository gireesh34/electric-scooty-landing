"use client";

import { motion } from "framer-motion";
import { Battery, Zap, Gauge } from "lucide-react";

const features = [
  {
    icon: <Battery className="w-8 h-8" />,
    title: "Long Battery Life",
    metric: "50km",
    description: "Up to 50km range on a single charge"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Quick Charging",
    metric: "4h",
    description: "Full charge in just 4 hours"
  },
  {
    icon: <Gauge className="w-8 h-8" />,
    title: "Top Speed",
    metric: "25km/h",
    description: "Reach speeds\nup to 25km/h"
  }
];

export default function Features() {
  const calculatePosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    // Adjust radius based on screen size
    const adjustedRadius = typeof window !== 'undefined' ? 
      window.innerWidth < 640 ? radius * 0.2 : 
      window.innerWidth < 768 ? radius * 0.2 : 
      radius : radius;
    const x = Math.cos(angle) * adjustedRadius;
    const y = Math.sin(angle) * adjustedRadius;
    return { x, y };
  };

  return (
    <section className="min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex items-center justify-center py-8 sm:py-10 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
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
        
        <div className="relative flex justify-center items-center h-[400px] sm:h-[450px] md:h-[500px]">
          <motion.div 
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-gray dark:bg-gray-800 flex items-center justify-center shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">REZERO</h3>
              <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-400">Features</p>
            </div>

            {features.map((feature, index) => {
              const position = calculatePosition(index, features.length, 250);
              
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
                  <div className="p-2 sm:p-3 bg-white dark:bg-gray-900 rounded-full shadow-md flex items-center justify-center z-10 relative">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>

                  <div 
                    className="absolute bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-lg shadow-lg min-w-[100px] sm:min-w-[120px] md:min-w-[150px] -translate-x-[calc(100%+10px)] sm:-translate-x-[calc(100%+15px)] -top-[15px] data-[position=right]:translate-x-[calc(100%+10px)] sm:data-[position=right]:translate-x-[calc(100%+15px)] data-[position=right]:right-0"
                    data-position={position.x > 0 ? 'right' : 'left'}
                  >
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400">
                      {feature.title}
                    </h3>
                    <p className="text-base sm:text-lg font-bold">{feature.metric}</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-500">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}