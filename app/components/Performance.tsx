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
  return (
    <section className="h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Exceptional Performance</h2>
          <p className="text-gray-900 dark:text-gray-400 max-w-2xl mx-auto">
            Experience unmatched performance with cutting-edge technology and
            powerful features designed for the modern urban commuter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {performanceMetrics.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                {item.icon}
              </div>
              <div className="text-3xl font-bold mb-2">{item.metric}</div>
              <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
              <p className="text-gray-900 dark:text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}