"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Sparkles, Smartphone } from "lucide-react";

const designFeatures = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Durable Build",
    description: "Aircraft-grade aluminum frame for maximum durability"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Premium Finish",
    description: "Sleek design with premium paint finish"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Smart Integration",
    description: "Connect with our mobile app for enhanced features"
  }
];

export default function Design() {
  return (
    <section className="h-screen  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Designed for Excellence</h2>
          <p className="text-gray-900 dark:text-gray-400 max-w-2xl mx-auto">
            Every detail of the REZERO scooter is crafted with precision and care,
            ensuring both aesthetic appeal and functional excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {designFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-900 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}