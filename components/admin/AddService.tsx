"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
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

      setIcon(result.secure_url);
    } catch (error) {
      console.error(error);
      alert("Image Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const saveService = async () => {
    if (!title || !description || !icon) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "services"), {
        title,
        description,
        icon,
        createdAt: new Date(),
      });

      alert("Service Added Successfully!");

      setTitle("");
      setDescription("");
      setIcon("");
    } catch (error) {
      console.error(error);
      alert("Failed to save service.");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Add Service
      </h2>

      <input
        type="text"
        placeholder="Service Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-slate-800 p-3 rounded-lg mb-4"
      />

      <textarea
        rows={4}
        placeholder="Service Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-slate-800 p-3 rounded-lg mb-4"
      />

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="w-full bg-slate-800 p-3 rounded-lg mb-4"
      />

      {loading && (
        <p className="text-cyan-400 mb-4">
          Uploading...
        </p>
      )}

      {icon && (
        <img
          src={icon}
          alt="Preview"
          className="w-40 rounded-lg border border-slate-700 mb-4"
        />
      )}

      <button
        onClick={saveService}
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
      >
        Save Service
      </button>

    </div>
  );
}