"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Daily Commuter",
    content: "The REZERO has transformed my daily commute. It's reliable, comfortable, and the battery life is exceptional.",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Tech Enthusiast",
    content: "Impressive build quality and smart features. The app integration makes it a truly modern mobility solution.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Urban Explorer",
    content: "Perfect for city exploration. The range and speed are ideal for getting around town efficiently.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What Our Riders Say</h2>
          <p className="text-gray-900 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Hear from our community of riders who have made REZERO their choice for urban mobility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-4 sm:p-5 md:p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-900 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}