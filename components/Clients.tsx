"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface Client {
  id: string;
  name: string;
  company: string;
  logo?: string;
  website?: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "clients"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Client, "id">),
      }));

      setClients(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-20 text-center">
        Loading Clients...
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-white py-14 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
          Our Clients
        </h2>

        <p className="text-center text-gray-500 text-sm sm:text-base mt-3">
          We proudly serve clients across multiple industries.
        </p>

        {clients.length === 0 ? (

          <div className="text-center text-gray-500 mt-12">
            No Clients Available
          </div>

        ) : (

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">

            {clients.map((client, index) => (

              <motion.div
                key={client.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                }}
                className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 text-center shadow-md hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
              >

                {client.logo ? (

                  <Image
  src={client.logo}
  alt={client.company || client.name || "Client Logo"}
  width={100}
  height={100}
  unoptimized
  className="w-20 h-20 object-contain mx-auto mb-4"
/>

                ) : (

                  <div className="text-5xl mb-4">
                    🏢
                  </div>

                )}

                <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
  {client.company}
</h3>
<p className="text-sm text-gray-500 mt-2">
  {client.name}
</p>
{client.website && (
  <a
    href={client.website}
    target="_blank"
    rel="noopener noreferrer"
    className="text-cyan-500 text-sm mt-2 block"
  >
    Visit Website
  </a>
)}

              </motion.div>

            ))}

          </div>

        )}

      </div>
    </motion.section>
  );
}