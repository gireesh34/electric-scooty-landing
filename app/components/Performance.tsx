"use client";

import { motion } from "framer-motion";
import { Zap, Timer, Battery, ShieldCheck } from "lucide-react";

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
  // Calculate positions for each metric around the circle
  const calculatePosition = (index: number, total: number, radius: number) => {
    // Start from the top (270 degrees) and go clockwise
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <section className="min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex items-center justify-center py-8 sm:py-10 md:py-12">
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
              <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-400">Performance</p>
            </div>
         
          {performanceMetrics.map((item, index) => {
            const position = calculatePosition(index, performanceMetrics.length, 250);
            
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
                    {item.icon}
                  </div>
                </div>

                <div 
                  className="absolute bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-lg shadow-lg min-w-[120px] sm:min-w-[150px] -translate-x-[calc(100%+15px)] -top-[15px] data-[position=right]:translate-x-[calc(100%+15px)] data-[position=right]:right-0"
                  data-position={position.x > 0 ? 'right' : 'left'}
                >
                  <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400">
                    {item.label}
                  </h3>
                  <p className="text-base sm:text-lg font-bold">{item.metric}</p>
                  <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-500">{item.description}</p>
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