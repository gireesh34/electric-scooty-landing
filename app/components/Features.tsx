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
    <section className="h-screen mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          <p className="text-gray-900 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the perfect blend of power, efficiency, and innovation
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="p-4 bg-primary/10 rounded-full mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-900 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}