"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  FolderKanban,
  Image,
  Wrench,
  Users,
  Star,
  Mail,
} from "lucide-react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function DashboardStats() {
  const [projects, setProjects] = useState(0);
  const [gallery, setGallery] = useState(0);
  const [services, setServices] = useState(0);
  const [clients, setClients] = useState(0);
  const [testimonials, setTestimonials] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const unsubProjects = onSnapshot(
      collection(db, "projects"),
      (snap) => setProjects(snap.size)
    );

    const unsubGallery = onSnapshot(
      collection(db, "gallery"),
      (snap) => setGallery(snap.size)
    );

    const unsubServices = onSnapshot(
      collection(db, "services"),
      (snap) => setServices(snap.size)
    );

    const unsubClients = onSnapshot(
      collection(db, "clients"),
      (snap) => setClients(snap.size)
    );

    const unsubTestimonials = onSnapshot(
      collection(db, "testimonials"),
      (snap) => setTestimonials(snap.size)
    );

    const unsubMessages = onSnapshot(
      collection(db, "messages"),
      (snap) => {
        const unread = snap.docs.filter(
          (doc) => !doc.data().isRead
        );

        setUnreadMessages(unread.length);
      }
    );

    return () => {
      unsubProjects();
      unsubGallery();
      unsubServices();
      unsubClients();
      unsubTestimonials();
      unsubMessages();
    };
  }, []);

  const cards = [
    {
      title: "Projects",
      total: projects,
      icon: FolderKanban,
      color: "text-cyan-400",
      href: "/admin/projects",
    },
    {
      title: "Gallery",
      total: gallery,
      icon: Image,
      color: "text-pink-400",
      href: "/admin/gallery",
    },
    {
      title: "Services",
      total: services,
      icon: Wrench,
      color: "text-yellow-400",
      href: "/admin/services",
    },
    {
      title: "Clients",
      total: clients,
      icon: Users,
      color: "text-green-400",
      href: "/admin/clients",
    },
    {
      title: "Testimonials",
      total: testimonials,
      icon: Star,
      color: "text-orange-400",
      href: "/admin/testimonials",
    },
    {
      title: "Unread Messages",
      total: unreadMessages,
      icon: Mail,
      color: "text-red-400",
      href: "/admin/messages",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Link key={card.title} href={card.href}>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-cyan-400 hover:scale-[1.02] transition-all duration-300 cursor-pointer">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-400 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold text-white mt-2">
                    {card.total}
                  </h2>

                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  <Icon
                    size={34}
                    className={card.color}
                  />
                </div>

              </div>

            </div>

          </Link>
        );
      })}

    </div>
  );
}