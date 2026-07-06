"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddClient() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("");

  const [loading, setLoading] = useState(false);

  const uploadLogo = async (
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

      setLogo(result.secure_url);
    } catch (error) {
      console.error(error);
      alert("Logo Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const saveClient = async () => {
    if (!name || !company || !logo) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "clients"), {
        name,
        company,
        website,
        logo,
        createdAt: new Date(),
      });

      alert("Client Added Successfully!");

      setName("");
      setCompany("");
      setWebsite("");
      setLogo("");
    } catch (error) {
      console.error(error);
      alert("Failed to save client.");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Add Client
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

      <input
        type="url"
        placeholder="Website (Optional)"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full bg-slate-800 p-3 rounded-lg mb-4"
      />

      <input
        type="file"
        accept="image/*"
        onChange={uploadLogo}
        className="w-full bg-slate-800 p-3 rounded-lg mb-4"
      />

      {loading && (
        <p className="text-cyan-400 mb-4">
          Uploading Logo...
        </p>
      )}

      {logo && (
        <img
          src={logo}
          alt="Logo Preview"
          className="w-40 h-40 object-contain rounded-lg border border-slate-700 mb-4 bg-white p-2"
        />
      )}

      <button
        onClick={saveClient}
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
      >
        Save Client
      </button>

    </div>
  );
}