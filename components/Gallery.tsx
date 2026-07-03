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
    <section
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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10">

            {images.map((img, index) => (
              <PhotoView key={index} src={img}>
                <div className="overflow-hidden rounded-xl cursor-pointer border border-slate-700 hover:border-cyan-400 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
                  <Image
  src={img}
  alt="Project"
  width={500}
  height={350}
  className="w-full h-40 sm:h-52 lg:h-60 object-cover hover:scale-110 transition-transform duration-500"
/>
                </div>
              </PhotoView>
            ))}

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
    </section>
  );
}