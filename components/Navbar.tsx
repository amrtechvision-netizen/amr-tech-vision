"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    scrolled
      ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg"
      : "bg-transparent"
  }`}
>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 flex-1">
          <Image
  src="/images/logo2.jpeg"
  alt="AMR TECH VISION"
  width={42}
  height={42}
  className="rounded-md object-contain"
/>
          <div className="min-w-0">
  <h1 className="text-base sm:text-lg md:text-3xl font-bold text-cyan-400 whitespace-nowrap">
    AMR TECH VISION
  </h1>

  <p className="hidden sm:block text-xs text-gray-300">
    ELV • CCTV • Fire Alarm
  </p>
</div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
  Home
</Link>
          <Link href="#about" className="hover:text-cyan-400 transition-colors">
  About
</Link>
          <Link href="#services" className="hover:text-cyan-400 transition-colors">
  Services
</Link>
          <Link href="#contact" className="hover:text-cyan-400 transition-colors">
  Contact
</Link>

          <a
  href="tel:+919052620763"
  className="bg-cyan-500 text-center py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
>
  📞 Call Now
</a>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-3xl p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 text-white flex flex-col px-5 py-5 gap-5">
          <Link
  href="Home"
  onClick={() => setMenuOpen(false)}
  className="hover:text-cyan-400 transition"
>
  Home
</Link>
          <Link
  href="About"
  onClick={() => setMenuOpen(false)}
  className="hover:text-cyan-400 transition"
>
  About
</Link>
          <Link
  href="Services"
  onClick={() => setMenuOpen(false)}
  className="hover:text-cyan-400 transition"
>
  Services
</Link>
          <Link
  href="Projects"
  onClick={() => setMenuOpen(false)}
  className="hover:text-cyan-400 transition"
>
  Projects
</Link>
          <Link
  href="Contact"
  onClick={() => setMenuOpen(false)}
  className="hover:text-cyan-400 transition"
>
  Contact
</Link>
        </div>
      )}
    </nav>
  );
}