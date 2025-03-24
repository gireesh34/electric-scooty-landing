"use client";

import { motion } from "framer-motion";
import { Gauge, Battery, Clock, Weight, Zap, Route } from "lucide-react";

const specifications = [
  { label: "Range", value: "50 kilometers", icon: <Route className="w-6 h-6" /> },
  { label: "Max Speed", value: "25 km/h", icon: <Gauge className="w-6 h-6" /> },
  { label: "Battery", value: "48V 15Ah Lithium", icon: <Battery className="w-6 h-6" /> },
  { label: "Motor", value: "500W Brushless", icon: <Zap className="w-6 h-6" /> },
  { label: "Charging Time", value: "4-6 hours", icon: <Clock className="w-6 h-6" /> },
  { label: "Max Load", value: "120 kg", icon: <Weight className="w-6 h-6" /> }
];

export default function Specifications() {
  // Calculate positions for each specification around the circle
  const calculatePosition = (index: number, total: number, radius: number) => {
    // Start from the top (270 degrees) and go clockwise
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    // Adjust radius based on screen size
    const adjustedRadius = typeof window !== 'undefined' ? 
      window.innerWidth < 640 ? radius * 0.5 : 
      window.innerWidth < 768 ? radius * 0.5 : 
      radius : radius;
    const x = Math.cos(angle) * adjustedRadius;
    const y = Math.sin(angle) * adjustedRadius;
    return { x, y };
  };

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
              <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-400">Electric Scooter</p>
            </div>

            {specifications.map((spec, index) => {
              const position = calculatePosition(index, specifications.length, 250);
              
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
                      {spec.icon}
                    </div>
                  </div>

                  <div 
                    className="absolute bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-lg shadow-lg min-w-[100px] sm:min-w-[120px] md:min-w-[150px] -translate-x-[calc(100%+10px)] sm:-translate-x-[calc(100%+15px)] -top-[15px] data-[position=right]:translate-x-[calc(100%+10px)] sm:data-[position=right]:translate-x-[calc(100%+15px)] data-[position=right]:right-0"
                    data-position={position.x > 0 ? 'right' : 'left'}
                  >
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400">
                      {spec.label}
                    </h3>
                    <p className="text-base sm:text-lg font-bold">{spec.value}</p>
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