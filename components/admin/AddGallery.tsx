"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddGallery() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("CCTV");
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

      if (!result.secure_url) {
        throw new Error("Image upload failed");
      }

      setImage(result.secure_url);
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const saveGallery = async () => {
    if (!title || !category || !image) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "gallery"), {
        title,
        category,
        image,
        createdAt: new Date(),
      });

      alert("Gallery Image Added Successfully!");

      setTitle("");
      setCategory("CCTV");
      setImage("");
    } catch (error) {
      console.error(error);
      alert("Failed to save gallery image.");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Add Gallery Image
      </h2>

      <input
        type="text"
        placeholder="Gallery Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4"
      >
        <option>CCTV</option>
        <option>Fire Alarm</option>
        <option>Networking</option>
        <option>Access Control</option>
        <option>BMS</option>
        <option>PA System</option>
        <option>Other</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4"
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
          className="w-60 rounded-lg border border-slate-700 mb-4"
        />
      )}

      <button
        onClick={saveGallery}
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-bold"
      >
        Save Gallery
      </button>

    </div>
  );
}