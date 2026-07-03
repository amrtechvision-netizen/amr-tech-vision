"use client";

import ProjectsList from "@/components/admin/ProjectsList";
import AddProject from "@/components/admin/AddProject";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

export default function Dashboard() {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);

    alert("Logged Out");

    router.push("/admin/login");
  };

  return (
  <ProtectedRoute>
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 px-8 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-cyan-400">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* Cards */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 p-8">

        <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-cyan-400">
            Projects
          </h2>

          <p className="mt-4 text-gray-400">
            Add / Edit / Delete Projects
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-cyan-400">
            Gallery
          </h2>

          <p className="mt-4 text-gray-400">
            Upload Gallery Images
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-cyan-400">
            Messages
          </h2>

          <p className="mt-4 text-gray-400">
            View Contact Form Messages
          </p>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-8 pb-8">
  <AddProject />
  <ProjectsList />
</div>
    </div>
    </ProtectedRoute>
  );
}