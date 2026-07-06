"use client";

import Link from "next/link";
import {
  FolderKanban,
  Image,
  Wrench,
  Users,
  Star,
  Mail,
} from "lucide-react";

const actions = [
  {
    title: "Projects",
    description: "Add & Manage Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    color: "text-cyan-400",
  },
  {
    title: "Gallery",
    description: "Upload Gallery Images",
    href: "/admin/gallery",
    icon: Image,
    color: "text-pink-400",
  },
  {
    title: "Services",
    description: "Manage Services",
    href: "/admin/services",
    icon: Wrench,
    color: "text-yellow-400",
  },
  {
    title: "Clients",
    description: "Manage Clients",
    href: "/admin/clients",
    icon: Users,
    color: "text-green-400",
  },
  {
    title: "Testimonials",
    description: "Manage Testimonials",
    href: "/admin/testimonials",
    icon: Star,
    color: "text-orange-400",
  },
  {
    title: "Messages",
    description: "View Contact Messages",
    href: "/admin/messages",
    icon: Mail,
    color: "text-red-400",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.title} href={item.href}>

              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-cyan-400 hover:scale-[1.02] transition-all duration-300 cursor-pointer">

                <div className="flex items-center gap-4">

                  <div className="bg-slate-900 p-3 rounded-lg">
                    <Icon
                      size={28}
                      className={item.color}
                    />
                  </div>

                  <div>

                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {item.description}
                    </p>

                  </div>

                </div>

              </div>

            </Link>
          );
        })}

      </div>

    </div>
  );
}