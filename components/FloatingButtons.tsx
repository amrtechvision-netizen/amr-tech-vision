"use client";

import { motion } from "framer-motion";

export default function FloatingButtons() {
  return (
    <>
      {/* Mobile Sticky Call Button */}
      <motion.a
        href="tel:+919052620763"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-cyan-500 text-white text-center py-4 font-bold text-lg shadow-2xl"
      >
        📞 Call Now
      </motion.a>
    </>
  );
}