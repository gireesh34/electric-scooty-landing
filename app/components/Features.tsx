"use client";

import { motion } from "framer-motion";
import { Battery, Zap, Gauge } from "lucide-react";

const features = [
  {
    icon: <Battery className="w-8 h-8" />,
    title: "Long Battery Life",
    description: "Up to 50km range on a single charge"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Quick Charging",
    description: "Full charge in just 4 hours"
  },
  {
    icon: <Gauge className="w-8 h-8" />,
    title: "Top Speed",
    description: "Reach speeds up to 25km/h"
  }
];

export default function Features() {
  return (
    <section className="h-screen mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Specifications
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-900 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
}