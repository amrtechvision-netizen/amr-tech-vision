"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  service: string;
  message: string;
  isRead: boolean;
  createdAt?: {
    seconds: number;
  };
}

export default function RecentMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "messages"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Message, "id">),
        }));

        data.sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;

          return bTime - aTime;
        });

        setMessages(data.slice(0, 5));
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-cyan-400">
          Recent Messages
        </h2>

        <Link
          href="/admin/messages"
          className="text-cyan-400 hover:underline"
        >
          View All →
        </Link>

      </div>

      {messages.length === 0 ? (
        <p className="text-gray-400">
          No messages found.
        </p>
      ) : (
        <div className="space-y-4">

          {messages.map((item) => (

            <div
              key={item.id}
              className="bg-slate-800 rounded-xl p-5 flex justify-between items-center"
            >

              <div>

                <h3 className="text-lg font-bold">
                  {item.name}
                </h3>

                <p className="text-cyan-400 text-sm mt-1">
                  {item.subject}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  {item.email}
                </p>

                <p className="text-gray-500 text-xs mt-2">
                  {item.createdAt
                    ? new Date(
                        item.createdAt.seconds * 1000
                      ).toLocaleDateString()
                    : "No Date"}
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  item.isRead
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {item.isRead ? "Read" : "Unread"}
              </span>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}