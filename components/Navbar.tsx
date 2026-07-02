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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo2.jpeg"
            alt="AMR TECH VISION"
            width={50}
            height={40}
          />

          <div>
            <h1 className="text-xl font-bold text-cyan-400">
              AMR TECH VISION
            </h1>
            <p className="text-xs text-gray-400">
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
            className="bg-cyan-500 px-5 py-2 rounded-lg hover:bg-cyan-600"
          >
            Call Now
          </a>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900 text-white flex flex-col px-6 py-4 gap-4">
          <Link href="/">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#contact">Contact</Link>
        </div>
      )}
    </nav>
  );
}