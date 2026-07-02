"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const images = [
  "/images/projects/cctv.png",
  "/images/projects/fire-alarm.png",
  "/images/projects/access-control.png",
  "/images/projects/networking.png",
  "/images/projects/bms.png",
  "/images/projects/pa-system.png",
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-cyan-400">
          Project Gallery
        </h2>

        <p className="text-center text-gray-400 mt-3">
          Our Recent Installations
        </p>

        <PhotoProvider>
          <div className="grid md:grid-cols-3 gap-8 mt-12">

            {images.map((img, index) => (
              <PhotoView key={index} src={img}>
                <div className="overflow-hidden rounded-xl cursor-pointer border border-slate-700 hover:border-cyan-400">
                  <Image
                    src={img}
                    alt="Project"
                    width={500}
                    height={350}
                    className="hover:scale-110 duration-500"
                  />
                </div>
              </PhotoView>
            ))}

          </div>
        </PhotoProvider>

      </div>
    </section>
  );
}