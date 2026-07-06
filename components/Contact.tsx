"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
  address: "",
  phone: "",
  email: "",
  workingHours: "",
});
useEffect(() => {
  const unsubscribe = onSnapshot(
  doc(db, "settings", "company"),
  (docSnap) => {
    if (docSnap.exists()) {
      setSettings((prev) => ({
        ...prev,
        ...(docSnap.data() as Partial<typeof prev>),
      }));
    }
  }
);

  return () => unsubscribe();
}, []);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setLoading(true);

    const formData = new FormData(form.current);

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const subject = formData.get("subject");
    const service = formData.get("service");
    const message = formData.get("message");

    try {
      // Save to Firestore
      await addDoc(collection(db, "messages"), {
        name,
        email,
        phone,
        subject,
        service,
        message,
        isRead: false,
        createdAt: new Date(),
      });
      

      // Send Email using EmailJS
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      alert("Message sent successfully!");

      form.current.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      id="contact"
      className="bg-slate-900 text-white py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-cyan-400">
          Contact Us
        </h2>

        <p className="text-center text-gray-400 mt-3">
          Get in touch with AMR TECH VISION
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-12">

          {/* Contact Details */}

          <div className="bg-slate-800 p-8 rounded-xl">

            <h3 className="text-2xl font-bold mb-6">
              Contact Information
            </h3>

            <p className="mb-4">
  📍 {settings.address}
</p>

            <p className="mb-4">
  📞{" "}
  <a
    href={`tel:${settings.phone}`}
    className="hover:text-cyan-400"
  >
    {settings.phone}
  </a>
</p>

            <p className="mb-4">
  📧{" "}
  <a
    href={`mailto:${settings.email}`}
    className="hover:text-cyan-400"
  >
    {settings.email}
  </a>
</p>

            <p>
              🕒 {settings.workingHours}
            </p>

          </div>

          {/* Contact Form */}

          <div className="bg-slate-800 p-8 rounded-xl">

            <h3 className="text-2xl font-bold mb-6">
              Send Inquiry
            </h3>

            <form
              ref={form}
              onSubmit={sendEmail}
              className="space-y-4"
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full p-3 rounded bg-slate-700 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-3 rounded bg-slate-700 outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full p-3 rounded bg-slate-700 outline-none"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full p-3 rounded bg-slate-700 outline-none"
              />

              <select
                name="service"
                required
                className="w-full p-3 rounded bg-slate-700 outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Service
                </option>

                <option value="CCTV Installation">
                  CCTV Installation
                </option>

                <option value="Fire Alarm System">
                  Fire Alarm System
                </option>

                <option value="Access Control">
                  Access Control
                </option>

                <option value="Networking">
                  Networking
                </option>

                <option value="Building Management System">
                  Building Management System
                </option>

                <option value="PA System">
                  PA System
                </option>

                <option value="AMC Services">
                  AMC Services
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                required
                className="w-full p-3 rounded bg-slate-700 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 px-8 py-3 rounded-lg font-bold transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>

        {/* Google Map */}

        <div className="mt-12">

          <iframe
  src={`https://www.google.com/maps?q=${encodeURIComponent(
    settings.address
  )}&output=embed`}
  width="100%"
  height="400"
  className="w-full rounded-xl"
  style={{ border: 0 }}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

        </div>

      </div>
    </motion.section>
  );
}