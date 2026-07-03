"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        alert("Message sent successfully!");
        form.current?.reset();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send message.");
      });
  };

  return (
    <section
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

        <div className="grid grid-cols-2 gap-10 mt-12">

          {/* Contact Details */}
          <div className="bg-slate-800 p-8 rounded-xl">

            <h3 className="text-2xl font-bold mb-6">
              Contact Information
            </h3>

            <p className="mb-4">
              📍 Room No. 9, Ground Floor, Social Nagar,
              <br />
              Mahatma Gandhi Road,
              <br />
              Mumbai - 400017
            </p>

            <p className="mb-4">
              📞 +91 9052620763
            </p>

            <p className="mb-4">
              📧 amrtechvision@gmail.com
            </p>

            <p>
              🕒 Mon - Sat : 9:00 AM - 7:00 PM
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

              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                required
                className="w-full p-3 rounded bg-slate-700 outline-none"
              />

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-bold"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

        {/* Google Map */}
        <div className="mt-12">
          <iframe
            src="https://www.google.com/maps?q=Room%20No.%209%20Ground%20Floor%20Social%20Nagar%20Mahatma%20Gandhi%20Road%20Mumbai%20400017&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
}