"use client";

import { useState } from "react";

export default function ImageUpload() {
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

  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-cyan-400 mb-5">
        Upload Image
      </h2>

      <input
        type="file"
        onChange={uploadImage}
      />

      {loading && (
        <p className="mt-4">
          Uploading...
        </p>
      )}

      {image && (
        <img
          src={image}
          className="mt-5 rounded-xl w-64"
        />
      )}

    </div>
  );
}