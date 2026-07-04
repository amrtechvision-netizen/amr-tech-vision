"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = async () => {
    const snapshot = await getDocs(collection(db, "messages"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Message, "id">),
    }));

    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    await deleteDoc(doc(db, "messages", id));

    loadMessages();
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mt-8">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Contact Messages
      </h2>

      {messages.length === 0 ? (
        <p className="text-gray-400">
          No messages found.
        </p>
      ) : (
        <div className="space-y-5">

          {messages.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl p-5 border border-slate-700"
            >
              <h3 className="text-xl font-bold text-cyan-400">
                {item.name}
              </h3>

              <p className="mt-2">
                📧 {item.email}
              </p>

              <p>
                📞 {item.phone}
              </p>

              <p className="mt-4 text-gray-300">
                {item.message}
              </p>

              <button
                onClick={() => deleteMessage(item.id)}
                className="mt-5 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}