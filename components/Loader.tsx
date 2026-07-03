"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[9999]">

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/images/logo2.jpeg"
          alt="AMR TECH VISION"
          width={120}
          height={120}
          className="rounded-xl"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .5 }}
        className="mt-6 text-2xl md:text-4xl font-bold text-cyan-400"
      >
        AMR TECH VISION
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-gray-300 mt-2"
      >
        Complete ELV & Security Solutions
      </motion.p>

    </div>
  );
}