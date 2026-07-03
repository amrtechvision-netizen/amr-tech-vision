"use client";

import { motion } from "framer-motion";
const services = [
  {
    title: "CCTV Surveillance",
    desc: "HD/IP Camera Installation & Monitoring",
    icon: "📹",
  },
  {
    title: "Fire Alarm System",
    desc: "Addressable & Conventional Fire Alarm",
    icon: "🔥",
  },
  {
    title: "Access Control",
    desc: "Biometric, Face Recognition & RFID",
    icon: "🔐",
  },
  {
    title: "Networking",
    desc: "LAN, WiFi & Structured Cabling",
    icon: "🌐",
  },
  {
    title: "PA System",
    desc: "Public Address & Voice Evacuation",
    icon: "🎤",
  },
  {
    title: "Building Management",
    desc: "Complete BMS & ELV Integration",
    icon: "🏢",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-slate-950 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-cyan-400">
          Our Services
        </h2>

        <p className="text-center text-gray-400 mt-3 text-sm sm:text-base">
          Complete ELV & Security Solutions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">

          {services.map((service, index) => (
            <motion.div
  key={index}
  whileHover={{
    scale: 1.05,
    y: -10,
  }}
  whileTap={{
    scale: 0.98,
  }}
  transition={{
    duration: 0.3,
    ease: "easeInOut",
  }}
  className="bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-700 hover:border-cyan-400 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
>
  <div className="text-4xl sm:text-5xl">
    {service.icon}
  </div>

  <h3 className="text-xl sm:text-2xl font-bold mt-4 text-cyan-400">
    {service.title}
  </h3>

  <p className="text-gray-400 mt-3 text-sm sm:text-base leading-6 sm:leading-7">
    {service.desc}
  </p>
</motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}