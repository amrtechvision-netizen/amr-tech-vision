"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

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
    setLoading(false);
  };

  const saveProject = async () => {
    if (!title || !description || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        image,
        createdAt: new Date(),
      });

      alert("Project Added Successfully!");

      setTitle("");
      setDescription("");
      setImage("");

    } catch (error) {
      console.error(error);
      alert("Error adding project.");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Add Project
      </h2>

      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4"
      />

      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4"
        rows={4}
      />

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4"
      />

      {loading && (
        <p className="text-cyan-400 mb-4">Uploading image...</p>
      )}

      {image && (
        <img
          src={image}
          alt="Preview"
          className="w-48 rounded-lg mb-4 border border-slate-700"
        />
      )}

      <button
        onClick={saveProject}
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-bold"
      >
        Save Project
      </button>

    </div>
  );
}