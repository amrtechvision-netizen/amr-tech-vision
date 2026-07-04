"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AddProject from "@/components/admin/AddProject";
import ProjectsList from "@/components/admin/ProjectsList";
import MessagesList from "@/components/admin/MessagesList";

export default function Dashboard() {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged Out Successfully");
      router.replace("/admin/login");
    } catch (error) {
      console.error(error);
      alert("Logout Failed");
    }
  };

  return (
    <ProtectedRoute>

      <div className="min-h-screen bg-slate-950 text-white">

        {/* Header */}

        <div className="bg-slate-900 border-b border-slate-700 px-6 md:px-8 py-5 flex items-center justify-between">

          <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">
            Admin Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

        {/* Dashboard Cards */}

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-cyan-400 transition">
            <h2 className="text-2xl font-bold text-cyan-400">
              Projects
            </h2>

            <p className="mt-3 text-gray-400">
              Add, Edit & Delete Projects
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-cyan-400 transition">
            <h2 className="text-2xl font-bold text-cyan-400">
              Gallery
            </h2>

            <p className="mt-3 text-gray-400">
              Cloudinary Image Upload
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-cyan-400 transition">
            <h2 className="text-2xl font-bold text-cyan-400">
              Messages
            </h2>

            <p className="mt-3 text-gray-400">
              View Contact Form Messages
            </p>
          </div>

        </div>

        {/* Add Project */}

        <div className="max-w-7xl mx-auto px-6 pb-8">
          <AddProject />
        </div>

        {/* Projects */}

        <div className="max-w-7xl mx-auto px-6 pb-8">
          <ProjectsList />
        </div>

        {/* Messages */}

        <div className="max-w-7xl mx-auto px-6 pb-10">
          <MessagesList />
        </div>

      </div>

    </ProtectedRoute>
  );
}