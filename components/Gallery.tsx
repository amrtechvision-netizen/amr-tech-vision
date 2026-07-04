"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface GalleryImage {
  id: string;
  image: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "projects"),
    (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          image: doc.data().image || "",
        }))
        .filter((item) => item.image !== "");

      setImages(data);
    }
  );

  return () => unsubscribe();
}, []);

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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10">

            {images.length === 0 ? (
              <p className="col-span-full text-center text-gray-400">
                No images uploaded yet.
              </p>
            ) : (
              images.map((img) => (
                <PhotoView key={img.id} src={img.image}>
                  <div className="overflow-hidden rounded-xl cursor-pointer border border-slate-700 hover:border-cyan-400 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                    <Image
                      src={img.image}
                      alt="Project"
                      width={500}
                      height={350}
                      className="w-full h-48 md:h-64 object-cover hover:scale-110 transition duration-500"
                    />
                  </div>
                </PhotoView>
              ))
            )}

          </div>
        </PhotoProvider>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Request a Free Site Survey
          </a>
        </div>

      </div>
    </motion.section>
  );
}