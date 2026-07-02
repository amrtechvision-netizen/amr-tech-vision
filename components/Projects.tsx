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
    <section
      id="projects"
      className="bg-slate-950 text-white py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-4">
          Our Projects
        </h2>

        <p className="text-center text-gray-400 mb-12">
          Our Recent ELV & Security Installations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
  key={index}
  whileHover={{
    scale: 1.05,
    y: -10,
  }}
  transition={{ duration: 0.3 }}
  className="bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 transition-all duration-300"
>
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover hover:scale-105 transition duration-500"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold text-cyan-400">
                  {project.title}
                </h3>

                <p className="text-gray-400 mt-2">
                  Professional installation completed by AMR TECH VISION.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}