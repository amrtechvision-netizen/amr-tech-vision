"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-slate-900 text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400">
          About AMR TECH VISION
        </h2>

        <p className="mt-6 text-gray-300 text-base sm:text-lg leading-8 max-w-4xl mx-auto">
          AMR TECH VISION is a trusted provider of ELV and Security
          Solutions across India. We specialize in CCTV Surveillance,
          Fire Alarm Systems, Access Control, Public Address Systems,
          Networking, Structured Cabling, Building Management Systems
          (BMS), and Smart Building Technologies.

          <br /><br />

          Our mission is to deliver reliable, innovative, and
          cost-effective security solutions with high-quality
          installation, professional support, and complete customer
          satisfaction.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-3xl md:text-4xl font-bold text-cyan-400">
              50+
            </h3>
            <p className="mt-3 text-gray-300">
              Projects Completed
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-3xl md:text-4xl font-bold text-cyan-400">
              100%
            </h3>
            <p className="mt-3 text-gray-300">
              Client Satisfaction
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-3xl md:text-4xl font-bold text-cyan-400">
              24×7
            </h3>
            <p className="mt-3 text-gray-300">
              Technical Support
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-3xl md:text-4xl font-bold text-cyan-400">
              PAN
            </h3>
            <p className="mt-3 text-gray-300">
              India Service
            </p>
          </div>

        </div>

      </div>
    </motion.section>
  );
}