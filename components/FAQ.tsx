"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Do you provide CCTV installation?",
    answer:
      "Yes. We provide complete CCTV installation, configuration, and AMC services for homes, offices, industries, hospitals, and commercial buildings.",
  },
  {
    question: "Do you install Fire Alarm Systems?",
    answer:
      "Yes. We install both Conventional and Addressable Fire Alarm Systems with testing and commissioning.",
  },
  {
    question: "Do you provide Access Control Systems?",
    answer:
      "Yes. We install Biometric, Face Recognition, RFID, and Door Access Control Systems.",
  },
  {
    question: "Which cities do you serve?",
    answer:
      "We provide ELV and Security Solutions across Mumbai, Navi Mumbai, Thane, and other locations across India.",
  },
  {
    question: "Do you provide Annual Maintenance (AMC)?",
    answer:
      "Yes. We offer Annual Maintenance Contracts (AMC) for CCTV, Fire Alarm, Networking, PA System, and complete ELV systems.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
          Frequently Asked Questions
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Find answers to the most common questions.
        </p>

        <div className="mt-10 space-y-4">

          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              className="border rounded-xl overflow-hidden shadow-sm"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex justify-between items-center p-5 text-left bg-gray-50 hover:bg-cyan-50 transition"
              >
                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                <span className="text-2xl font-bold text-cyan-500">
                  {open === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-5 text-gray-600 leading-7 bg-white">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}