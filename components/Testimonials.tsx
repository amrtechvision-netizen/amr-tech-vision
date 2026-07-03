"use client";

import { motion } from "framer-motion";
const testimonials = [
  {
    name: "ABC Builders",
    review:
      "Excellent CCTV and Fire Alarm installation. Professional team and timely delivery.",
  },
  {
    name: "XYZ Industries",
    review:
      "Highly recommended for ELV and Security solutions. Great support.",
  },
  {
    name: "Sunrise Hospital",
    review:
      "Quality work and reliable AMC services. Very satisfied.",
  },
];

export default function Testimonials() {
  return (
    <motion.section
initial={{opacity:0,y:60}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:.7}} className="bg-slate-950 text-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-cyan-400">
          Client Testimonials
        </h2>
        <p className="text-center text-gray-400 text-sm sm:text-base mt-3">
  What our clients say about our ELV & Security services
</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {testimonials.map((item, index) => (
            <motion.div
  key={index}
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
  className="..."
>
  <div className="text-4xl text-cyan-400 mb-3">
  ❝
</div>
              <p className="text-yellow-400 text-xl">
  ⭐⭐⭐⭐⭐
</p>
              <p className="mt-4 text-gray-300 text-xs md:text-base leading-7 italic">
  "{item.review}"
</p>
              <h3 className="mt-6 text-lg font-bold text-cyan-400">
  {item.name}
</h3>
<p className="text-gray-500 text-sm mt-1">
  Verified Client
</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}