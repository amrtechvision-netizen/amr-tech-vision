"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "ABC Builders",
    review:
      "Excellent CCTV & Fire Alarm installation. Professional team and on-time delivery.",
  },
  {
    name: "XYZ Industries",
    review:
      "Reliable ELV solutions with excellent support. Highly recommended.",
  },
  {
    name: "Sunrise Hospital",
    review:
      "Very satisfied with the quality of work and maintenance services.",
  },
];

export default function GoogleReviews() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-slate-900 text-white py-14 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-cyan-400">
          Google Reviews
        </h2>

        <p className="text-center text-gray-400 mt-3">
          Trusted by our valuable clients across India
        </p>

        <div className="flex justify-center mt-5 text-3xl">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-center mt-2 text-lg font-semibold">
          5.0 Rating
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
              }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-400 transition-all duration-300"
            >
              <p className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</p>

              <p className="mt-4 text-gray-300 italic">
                "{item.review}"
              </p>

              <h3 className="mt-6 font-bold text-cyan-400">
                {item.name}
              </h3>
            </motion.div>
          ))}

        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.google.com/search?q=AMR+TECH+VISION"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-semibold transition"
          >
            View Google Reviews
          </a>
        </div>

      </div>
    </motion.section>
  );
}