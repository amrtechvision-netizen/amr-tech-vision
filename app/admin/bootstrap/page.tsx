"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function BootstrapPage() {
  const [loading, setLoading] = useState(false);

  const createSuperAdmin = async () => {
    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const ref = doc(db, "adminUsers", user.uid);

      const snap = await getDoc(ref);

      if (snap.exists()) {
        alert("Super Admin already exists.");
        return;
      }

      await setDoc(ref, {
        uid: user.uid,
        name: user.displayName || "Super Admin",
        email: user.email,
        role: "Super Admin",
        status: "active",
        createdAt: serverTimestamp(),
      });

      alert("Super Admin created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create Super Admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="bg-slate-900 rounded-xl p-8 w-full max-w-md border border-slate-700">

        <h1 className="text-3xl font-bold text-cyan-400 mb-4">
          Bootstrap Super Admin
        </h1>

        <p className="text-gray-400 mb-6">
          Click the button once to register your current logged-in account as the Super Admin.
        </p>

        <button
          onClick={createSuperAdmin}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-bold disabled:bg-gray-600"
        >
          {loading ? "Creating..." : "Create Super Admin"}
        </button>

      </div>
    </div>
  );
}