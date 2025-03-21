"use client";

import { motion } from "framer-motion";

const specifications = [
  { label: "Range", value: "50 kilometers" },
  { label: "Max Speed", value: "25 km/h" },
  { label: "Battery", value: "48V 15Ah Lithium" },
  { label: "Motor", value: "500W Brushless" },
  { label: "Charging Time", value: "4-6 hours" },
  { label: "Max Load", value: "120 kg" }
];

export default function Specifications() {
  return (
    <section className="h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Technical Specifications
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specifications.map((spec, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-400">
                {spec.label}
              </h3>
              <p className="text-2xl font-bold mt-2">{spec.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}