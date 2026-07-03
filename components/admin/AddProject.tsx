"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const saveProject = async () => {
    if (!title || !description) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        createdAt: new Date(),
      });

      alert("Project Added Successfully!");

      setTitle("");
      setDescription("");

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

      <button
        onClick={saveProject}
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-bold"
      >
        Save Project
      </button>
    </div>
  );
}