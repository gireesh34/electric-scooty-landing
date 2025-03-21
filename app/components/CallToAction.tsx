"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Commute?</h2>
          <p className="text-xl text-gray-900 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied riders who have chosen REZERO for their urban mobility needs.
          </p>
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold shadow-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reserve Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}