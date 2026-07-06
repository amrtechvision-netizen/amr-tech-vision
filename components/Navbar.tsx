"use client";

import { motion } from "framer-motion";

import { useState, useEffect } from "react";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState({
  companyName: "AMR TECH VISION",
  tagline: "ELV • CCTV • Fire Alarm • BMS",
  logo: "/images/logo2.jpeg",
  phone: "+919052620763",
});

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
useEffect(() => {
  const unsubscribe = onSnapshot(
    doc(db, "settings", "company"),
    (docSnap) => {
      if (docSnap.exists()) {
        setSettings((prev) => ({
          ...prev,
          ...docSnap.data(),
        }));
      }
    }
  );

  return () => unsubscribe();
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
  src={settings.logo || "/images/logo2.jpeg"}
  alt={settings.companyName}
  width={42}
  height={42}
  className="rounded-md object-contain"
/>
          <div className="min-w-0">
  <h1 className="text-base sm:text-lg md:text-3xl font-bold text-cyan-400 whitespace-nowrap">
    {settings.companyName}
  </h1>

  <p className="hidden sm:block text-xs text-gray-300">
    {settings.tagline}
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
  href={`tel:${settings.phone.replace(/\s/g, "")}`}
  className="bg-cyan-500 px-5 py-2 rounded-lg font-semibold hover:bg-cyan-600 transition"
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

    <a
      href="/"
      onClick={() => setMenuOpen(false)}
      className="hover:text-cyan-400 transition"
    >
      Home
    </a>

    <a
      href="#about"
      onClick={() => setMenuOpen(false)}
      className="hover:text-cyan-400 transition"
    >
      About
    </a>

    <a
      href="#services"
      onClick={() => setMenuOpen(false)}
      className="hover:text-cyan-400 transition"
    >
      Services
    </a>

    <a
      href="#projects"
      onClick={() => setMenuOpen(false)}
      className="hover:text-cyan-400 transition"
    >
      Projects
    </a>

    <a
      href="#gallery"
      onClick={() => setMenuOpen(false)}
      className="hover:text-cyan-400 transition"
    >
      Gallery
    </a>

    <a
      href="#clients"
      onClick={() => setMenuOpen(false)}
      className="hover:text-cyan-400 transition"
    >
      Clients
    </a>

    <a
      href="#testimonials"
      onClick={() => setMenuOpen(false)}
      className="hover:text-cyan-400 transition"
    >
      Testimonials
    </a>

    <a
      href="#contact"
      onClick={() => setMenuOpen(false)}
      className="hover:text-cyan-400 transition"
    >
      Contact
    </a>

    <a
      href={`tel:${settings.phone.replace(/\s/g, "")}`}
      onClick={() => setMenuOpen(false)}
      className="bg-cyan-500 hover:bg-cyan-600 rounded-lg py-3 text-center font-semibold"
    >
      📞 Call Now
    </a>

  </div>
)}
    </nav>
  );
}