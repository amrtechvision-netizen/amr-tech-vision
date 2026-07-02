"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingButtons() {
  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/919769038785"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl z-50"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Call */}
      <a
        href="tel:+919769038785"
        className="fixed bottom-24 right-6 bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-full shadow-xl z-50"
      >
        <FaPhoneAlt size={22} />
      </a>
    </>
  );
}