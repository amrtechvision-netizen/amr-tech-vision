"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
}

export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "gallery"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<GalleryImage, "id">),
      }));

      setImages(data);
setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  if (loading) {
  return (
    <section className="bg-slate-950 py-20 text-center text-white">
      Loading Gallery...
    </section>
  );
}

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      id="gallery"
      className="py-14 md:py-20 bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-cyan-400">
          Project Gallery
        </h2>

        <p className="text-center text-gray-400 text-sm sm:text-base mt-3">
          Our Recent Installations
        </p>

        <PhotoProvider>

          {images.length === 0 ? (

            <div className="text-center text-gray-400 mt-12">
              No Gallery Images Found
            </div>

          ) : (

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">

              {images.map((img) => (

                <PhotoView
                  key={img.id}
                  src={img.image}
                >
                  <div className="relative overflow-hidden rounded-xl border border-slate-700 hover:border-cyan-400 cursor-pointer group">

                    <Image
  src={img.image}
  alt={img.title}
  width={600}
  height={450}
  unoptimized
  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
/>

                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 opacity-0 group-hover:opacity-100 transition">

  <h3 className="text-white font-semibold">
    {img.title}
  </h3>

  <p className="text-gray-300 text-sm">
    {img.category}
  </p>

</div>
</div>
                </PhotoView>

              ))}

            </div>

          )}

        </PhotoProvider>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-semibold"
          >
            Request Free Site Survey
          </a>
        </div>

      </div>
    </motion.section>
  );
}