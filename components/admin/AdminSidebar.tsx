"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import {
  LayoutDashboard,
  FolderKanban,
  Image,
  Wrench,
  Users,
  Star,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    name: "Services",
    href: "/admin/services",
    icon: Wrench,
  },
  {
    name: "Clients",
    href: "/admin/clients",
    icon: Users,
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: Star,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: Mail,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
  name: "Admin Users",
  href: "/admin/admin-users",
  icon: Users,
}
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  return (
    <aside className="w-72 h-screen bg-slate-900 border-r border-slate-700 flex flex-col overflow-hidden">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-cyan-400">
          AMR TECH VISION
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Admin CMS
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                pathname === item.href
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-800 text-gray-300"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}

      </nav>

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}