"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Smartphone } from "lucide-react";

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
  const calculatePosition = (index: number, total: number, radius: number) => {
    // For triangle, we want to start from the top and space items 120 degrees apart
    const angle = (index * (2 * Math.PI / 3)) + (Math.PI / 2);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <section className="min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex items-center justify-center py-8 sm:py-10 md:py-12">
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

        <div className="relative flex justify-center items-center h-[400px] sm:h-[450px] md:h-[500px]">
          <motion.div 
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-gray dark:bg-gray-800 flex items-center justify-center shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >

            <div className="text-center p-3 sm:p-4 relative z-10 ">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">REZERO</h3>
              <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-400">Design</p>
            </div>

            {designFeatures.map((feature, index) => {
              const position = calculatePosition(index, designFeatures.length, 250);
              
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
                  <div className="p-6 sm:p-3 bg-white/80 dark:bg-gray-900/80 rounded-full shadow-lg flex items-center justify-center z-10 relative backdrop-blur-xl">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>

                  <div 
                    className="absolute bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-lg shadow-lg min-w-[180px] sm:min-w-[220px] -translate-x-[calc(100%+20px)] -top-[15px] data-[position=right]:translate-x-[calc(100%+20px)] data-[position=right]:right-0 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 transition-all duration-300 hover:scale-105"
                    data-position={position.x > 0 ? 'right' : 'left'}
                  >
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400">
                      {feature.title}
                    </h3>
                    <p className="text-base sm:text-lg font-bold">{feature.description}</p>
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