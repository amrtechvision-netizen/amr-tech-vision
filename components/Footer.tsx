"use client";

import { motion } from "framer-motion";
export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">
          AMR TECH VISION
        </h2>

        <p className="mt-3 text-gray-400 text-sm sm:text-base">
          Complete ELV & Security Solution Provider
        </p>

        <div className="mt-6 space-y-3 text-sm sm:text-base text-gray-300">
          <p>📍 Room No. 9, Ground Floor, Social Nagar, Mahatma Gandhi Road, Mumbai - 400017</p>

          <p>📞 +91 9052620763</p>

          <p>📧 amrtechvision@gmail.com</p>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-8">

          <a
            href="https://www.instagram.com/amrtechvision"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:border-cyan-500 transition"
          >
            Instagram
          </a>

          <a
            href="https://www.facebook.com/share/1DP5G5mkiD/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:border-cyan-500 transition"
          >
            Facebook
          </a>

          <a
            href="https://www.youtube.com/channel/UCrW9v2jVQdem92ur3GMKJqg"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:border-cyan-500 transition"
          >
            YouTube
          </a>

        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-gray-500 text-center text-sm">
          © 2026 AMR TECH VISION. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}