"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful");

      router.push("/admin/dashboard");

    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="bg-slate-900 w-full max-w-md rounded-xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-center text-cyan-400">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mt-8 p-3 rounded-lg bg-slate-800 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 p-3 rounded-lg bg-slate-800 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-bold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>
  );
}