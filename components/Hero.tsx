"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(2,6,23,.75), rgba(2, 6, 23, 0.58)), url('/images/hero-bg.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 lg:gap-16 items-center py-24 md:py-32">

        <div>
          <span className="inline-block bg-cyan-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm">
            Welcome to AMR TECH VISION
          </span>

          <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
          >
            Complete ELV &
            <span className="text-cyan-400">
              {" "}Security Solutions
            </span>
          </motion.h1>

          <motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.8 }}
  className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl leading-8"
>
  AMR TECH VISION provides professional CCTV, Fire Alarm,
  Access Control, Networking, PA System, BMS, VESDA and
  complete ELV solutions across India.
</motion.p>

          <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.8 }}
  className="mt-10 flex flex-col sm:flex-row gap-4"
>
  <a
    href="#contact"
    className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-bold text-center transition"
  >
    Contact Us
  </a>

  <a
    href="#services"
    className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black text-center transition"
  >
    Our Services
  </a>
</motion.div>
        </div>

        <div className="flex justify-center mt-10 md:mt-0">
          <motion.div
  initial={{ opacity: 0, scale: 0.7 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
>
  <Image
  src="/images/logo2.jpeg"
  alt="AMR TECH VISION"
  width={450}
  height={450}
  className="w-64 sm:w-80 lg:w-[450px] h-auto rounded-xl shadow-2xl"
/>
</motion.div>
        </div>

      </div>
    </section>
  );
}
