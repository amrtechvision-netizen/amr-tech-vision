"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login page par sidebar aur protected route mat dikhana
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-slate-950 text-white overflow-hidden">

        <AdminSidebar />

        <main className="flex-1 overflow-y-auto">

          <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-700 px-8 py-5">
            <h1 className="text-3xl font-bold text-cyan-400">
              AMR TECH VISION Admin Panel
            </h1>

            <p className="text-gray-400 mt-1">
              Welcome to the Admin Dashboard
            </p>
          </header>

          <div className="p-8 pb-20">
            {children}
          </div>

        </main>

      </div>
    </ProtectedRoute>
  );
}