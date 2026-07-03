"use client";

import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-24 md:bottom-6 right-5 z-50"
    >
      {/* Help Bubble */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="bg-white text-slate-900 px-3 py-2 rounded-full shadow-lg mb-3 text-sm font-semibold"
      >
        💬 Need Help?
      </motion.div>

      {/* WhatsApp Button */}
      <motion.a
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.95,
        }}
        href="https://wa.me/919052620763"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 shadow-xl"
      >
        <span className="text-white text-3xl">💬</span>
      </motion.a>
    </motion.div>
  );
}