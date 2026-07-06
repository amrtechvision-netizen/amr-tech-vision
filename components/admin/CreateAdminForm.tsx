"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";

export default function CreateAdminForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [loading, setLoading] = useState(false);

  const createAdmin = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;

if (!user) {
  alert("Please login again.");
  return;
}

const idToken = await user.getIdToken(true);

      const res = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          idToken,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create admin");
      }

      alert("Admin Created Successfully");

      setName("");
      setEmail("");
      setPassword("");
      setRole("Admin");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Create Admin
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-lg"
        >
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Editor</option>
        </select>

        <button
          onClick={createAdmin}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-bold disabled:bg-gray-600"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>

      </div>

    </div>
  );
}