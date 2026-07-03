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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">

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
  className="bg-slate-900 rounded-xl p-4 md:p-8 border border-slate-700 hover:border-cyan-400 transition-all duration-300"
>
  <div className="text-3xl md:text-5xl">
    {service.icon}
  </div>

  <h3 className="text-base md:text-2xl font-bold">
    {service.title}
  </h3>

  <p className="text-xs md:text-base">
    {service.desc}
  </p>
</motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}