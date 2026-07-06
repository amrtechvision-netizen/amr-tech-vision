"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-24 md:bottom-6 right-5 z-50 flex flex-col items-end"
    >
      {/* Need Help Bubble */}
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
        href="https://wa.me/919052620765"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl flex items-center justify-center transition-all duration-300"
      >
        <FaWhatsapp size={30} className="text-white" />
      </motion.a>
    </motion.div>
  );
}