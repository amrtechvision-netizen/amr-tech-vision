"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      onClick={scrollToTop}
      className="
        fixed
        right-5
        bottom-32
        md:bottom-38
        z-50
        w-12
        h-12
        rounded-full
        bg-cyan-500
        hover:bg-cyan-600
        text-white
        shadow-xl
        flex
        items-center
        justify-center
        transition-all
        duration-300
        hover:scale-110
      "
    >
      <FaArrowUp size={18} />
    </motion.button>
  );
}