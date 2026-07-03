"use client";

import { motion } from "framer-motion";

const clients = [
  {
    icon: "🏢",
    title: "Corporate",
  },
  {
    icon: "🏨",
    title: "Hotels",
  },
  {
    icon: "🏥",
    title: "Hospitals",
  },
  {
    icon: "🏫",
    title: "Schools",
  },
];

export default function Clients() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-white py-14 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
          Our Clients
        </h2>

        <p className="text-center text-gray-500 text-sm sm:text-base mt-3">
          We proudly serve clients across multiple industries.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">

          {clients.map((client, index) => (
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
              className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 text-center shadow-md hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <div className="text-4xl sm:text-5xl mb-4">
                {client.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                {client.title}
              </h3>
            </motion.div>
          ))}

        </div>

      </div>
    </motion.section>
  );
}