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
      className="bg-slate-950 text-white py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-cyan-400">
          Our Services
        </h2>

        <p className="text-center text-gray-400 mt-3">
          Complete ELV & Security Solutions
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {services.map((service, index) => (
            <motion.div
  key={index}
  whileHover={{
    scale: 1.05,
    y: -10,
  }}
  transition={{ duration: 0.3 }}
  className="bg-slate-900 rounded-xl p-8 border border-slate-700 hover:border-cyan-400 transition-all duration-300"
>
            
              <div className="text-5xl">{service.icon}</div>

              <h3 className="text-2xl font-bold mt-5 text-cyan-400">
                {service.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-7">
                {service.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}