"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface WebsiteSettings {
  companyName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  copyright: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<WebsiteSettings>({
    companyName: "AMR TECH VISION",
    tagline: "Complete ELV & Security Solution Provider",
    address:
      "Room No. 9, Ground Floor, Social Nagar, Mahatma Gandhi Road, Mumbai - 400017",
    phone: "+91 9052620763",
    email: "amrtechvision@gmail.com",
    instagram: "https://www.instagram.com/amrtechvision",
    facebook: "https://www.facebook.com/share/1DP5G5mkiD/",
    youtube: "https://www.youtube.com/channel/UCrW9v2jVQdem92ur3GMKJqg",
    linkedin: "",
    copyright: "© 2026 AMR TECH VISION. All Rights Reserved.",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "company"),
      (docSnap) => {
        if (docSnap.exists()) {
          setSettings((prev) => ({
            ...prev,
            ...(docSnap.data() as Partial<WebsiteSettings>),
          }));
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">
          {settings.companyName}
        </h2>

        <p className="mt-3 text-gray-400 text-sm sm:text-base">
          {settings.tagline}
        </p>

        <div className="mt-6 space-y-3 text-sm sm:text-base text-gray-300">

          <p>📍 {settings.address}</p>

          <p>
            📞{" "}
            <a href={`tel:${settings.phone}`} className="hover:text-cyan-400">
              {settings.phone}
            </a>
          </p>

          <p>
            📧{" "}
            <a
              href={`mailto:${settings.email}`}
              className="hover:text-cyan-400"
            >
              {settings.email}
            </a>
          </p>

        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-8">

          {settings.instagram && (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:border-cyan-500 transition"
            >
              Instagram
            </a>
          )}

          {settings.facebook && (
            <a
              href={settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:border-cyan-500 transition"
            >
              Facebook
            </a>
          )}

          {settings.youtube && (
            <a
              href={settings.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:border-cyan-500 transition"
            >
              YouTube
            </a>
          )}

          {settings.linkedin && (
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:border-cyan-500 transition"
            >
              LinkedIn
            </a>
          )}

        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-gray-500 text-center text-sm">
          {settings.copyright}
        </p>

      </div>
    </footer>
  );
}