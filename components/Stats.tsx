"use client";

import { motion } from "framer-motion";
const stats = [
  {
    number: "50+",
    title: "Projects Completed",
  },
  {
    number: "25+",
    title: "Happy Clients",
  },
  {
    number: "5+",
    title: "Years Experience",
  },
  {
    number: "24/7",
    title: "Support",
  },
];

export default function Stats() {
  return (
    <motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: .6 }} className="bg-cyan-500 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">

          {stats.map((item, index) => (
            <div
  key={index}
  className="bg-cyan-600/20 rounded-xl py-5 px-3 hover:bg-cyan-600/30 transition"
>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {item.number}
              </h2>

              <p className="mt-2 text-sm sm:text-base md:text-lg font-medium">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </motion.section>
  );
}