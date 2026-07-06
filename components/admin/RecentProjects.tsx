"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Project {
  id: string;
  title: string;
  category?: string;
  image: string;
  createdAt?: {
    seconds: number;
  };
}

export default function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, "id">),
        }));

        data.sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return bTime - aTime;
        });

        setProjects(data.slice(0, 5));
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-cyan-400">
          Recent Projects
        </h2>

        <Link
          href="/admin/projects"
          className="text-cyan-400 hover:underline"
        >
          View All →
        </Link>

      </div>

      {projects.length === 0 ? (
        <p className="text-gray-400">
          No projects available.
        </p>
      ) : (
        <div className="space-y-4">

          {projects.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl p-4 flex items-center justify-between"
            >

              <div className="flex items-center gap-4">

                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={70}
                    height={70}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-[70px] h-[70px] bg-slate-700 rounded-lg flex items-center justify-center text-xs">
                    No Image
                  </div>
                )}

                <div>

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-cyan-400 text-sm">
                    {item.category || "No Category"}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {item.createdAt
                      ? new Date(
                          item.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "No Date"}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}