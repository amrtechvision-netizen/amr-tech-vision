"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "CCTV Installation",
    image: "/images/projects/cctv.png",
  },
  {
    title: "Fire Alarm System",
    image: "/images/projects/fire-alarm.png",
  },
  {
    title: "Access Control",
    image: "/images/projects/access-control.png",
  },
  {
    title: "Networking",
    image: "/images/projects/networking.png",
  },
  {
    title: "Building Management System",
    image: "/images/projects/bms.png",
  },
  {
    title: "PA System",
    image: "/images/projects/pa-system.png",
  },
];

export default function Projects() {
  return (
    <motion.section
  initial={{ opacity:0,y:60 }}
  whileInView={{ opacity:1,y:0 }}
  viewport={{ once:true }}
  transition={{ duration:.7 }}
      id="projects"
      className="bg-slate-950 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-cyan-400 mb-4">
          Our Projects
        </h2>

        <p className="text-center text-gray-400 text-sm sm:text-base mb-10">
          Our Recent ELV & Security Installations
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
  key={index}
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{
    delay: index * 0.15,
    duration: 0.5,
  }}
  whileHover={{
    scale: 1.05,
    y: -10,
  }}
  className="bg-slate-900 rounded-xl p-4 md:p-8 border border-slate-700 hover:border-cyan-400 transition-all duration-300"
>
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-32 md:h-64 object-cover"
              />

              <div className="p-5 sm:p-6">
                <h3 className="text-xs md:text-base md:text-xl sm:text-xl font-semibold text-cyan-400">
                  {project.title}
                </h3>

                <p className="text-gray-400 mt-2 text-sm sm:text-base leading-6">
                  Professional installation completed by AMR TECH VISION.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}