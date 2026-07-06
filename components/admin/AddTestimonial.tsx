"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddTestimonial() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("5");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    try {
      const data = new FormData();

      data.append("file", file);

      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      setImage(result.secure_url);
    } catch (error) {
      console.error(error);
      alert("Image Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const saveTestimonial = async () => {
    if (!name || !company || !review) {
  alert("Please fill all required fields.");
  return;
}

    try {
      await addDoc(collection(db, "testimonials"), {
  name,
  company,
  review,
  rating: Number(rating),
  image: image || "",
  createdAt: new Date(),
});

      alert("Testimonial Added Successfully!");

      setName("");
      setCompany("");
      setReview("");
      setRating("5");
      setImage("");
    } catch (error) {
      console.error(error);
      alert("Failed to save testimonial.");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Add Testimonial
      </h2>

      <input
        type="text"
        placeholder="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-slate-800 p-3 rounded-lg mb-4"
      />

      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full bg-slate-800 p-3 rounded-lg mb-4"
      />

      <textarea
        rows={5}
        placeholder="Client Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full bg-slate-800 p-3 rounded-lg mb-4"
      />

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full bg-slate-800 p-3 rounded-lg mb-4"
      >
        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
        <option value="4">⭐⭐⭐⭐ (4)</option>
        <option value="3">⭐⭐⭐ (3)</option>
        <option value="2">⭐⭐ (2)</option>
        <option value="1">⭐ (1)</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="w-full bg-slate-800 p-3 rounded-lg mb-4"
      />

      {loading && (
        <p className="text-cyan-400 mb-4">
          Uploading Image...
        </p>
      )}

      {image && (
        <img
          src={image}
          alt="Preview"
          className="w-36 h-36 object-cover rounded-full border border-slate-700 mb-5"
        />
      )}

      <button
        onClick={saveTestimonial}
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
      >
        Save Testimonial
      </button>

    </div>
  );
}