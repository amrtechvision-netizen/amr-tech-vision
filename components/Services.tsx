"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
const getServiceEmoji = (title: string) => {
  const text = title.toLowerCase();

  if (text.includes("cctv")) return "📹";
  if (text.includes("fire")) return "🔥";
  if (text.includes("access")) return "🔐";
  if (text.includes("network")) return "🌐";
  if (text.includes("wifi")) return "📶";
  if (text.includes("lan")) return "🌐";
  if (text.includes("pa")) return "🎤";
  if (text.includes("public address")) return "🎤";
  if (text.includes("building")) return "🏢";
  if (text.includes("bms")) return "🏢";
  if (text.includes("intercom")) return "☎️";
  if (text.includes("video door")) return "🚪";
  if (text.includes("attendance")) return "🕒";
  if (text.includes("biometric")) return "👆";
  if (text.includes("electric")) return "⚡";
  if (text.includes("solar")) return "☀️";
  if (text.includes("security")) return "🛡️";

  return "🛠️";
};

interface Service {
  id: string;
  title: string;
  description: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "services"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Service, "id">),
        }));

        setServices(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section
      id="services"
      className="bg-slate-950 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-cyan-400">
          Our Services
        </h2>

        <p className="text-center text-gray-400 mt-3 text-sm sm:text-base">
          Complete ELV & Security Solutions
        </p>

        {services.length === 0 ? (

          <div className="text-center py-20 text-gray-400">
            No Services Available
          </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">

            {services.map((service, index) => (

              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                }}
                className="bg-slate-900 rounded-xl p-4 md:p-8 border border-slate-700 hover:border-cyan-400 transition-all duration-300"
              >

                <div className="text-3xl md:text-5xl">
                  {getServiceEmoji(service.title)}
                </div>

                <h3 className="text-base md:text-2xl font-bold mt-4">
                  {service.title}
                </h3>

                <p className="text-xs md:text-base mt-2 text-gray-300">
                  {service.description}
                </p>

              </motion.div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}