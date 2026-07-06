"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
  isRead: boolean;
  createdAt?: {
    seconds: number;
  };
}

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "read" | "unread"
  >("all");
  const [selectedMessage, setSelectedMessage] =
  useState<Message | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "messages"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Message, "id">),
        }));

        setMessages(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredMessages = useMemo(() => {
    return messages.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "all"
          ? true
          : filter === "read"
          ? item.isRead
          : !item.isRead;

      return matchSearch && matchFilter;
    });
  }, [messages, search, filter]);

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    try {
      await deleteDoc(doc(db, "messages", id));
      alert("Message Deleted");
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };
  const toggleReadStatus = async (
  id: string,
  currentStatus: boolean
) => {
  try {
    await updateDoc(doc(db, "messages", id), {
      isRead: !currentStatus,
    });

    alert("Status Updated");
  } catch (error) {
    console.error(error);
    alert("Update Failed");
  }
};
const replyEmail = (email: string, subject?: string) => {
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(
    subject || "Reply from AMR TECH VISION"
  )}`;
};

const copyEmail = async (email: string) => {
  try {
    await navigator.clipboard.writeText(email);
    alert("Email copied.");
  } catch {
    alert("Failed to copy email.");
  }
};

const copyPhone = async (phone: string) => {
  try {
    await navigator.clipboard.writeText(phone);
    alert("Phone number copied.");
  } catch {
    alert("Failed to copy phone.");
  }
};

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        All Messages
      </h2>

      {/* Search */}

      <input
        type="text"
        placeholder="Search by Name, Email or Subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-slate-800 p-3 rounded-lg mb-5"
      />

      {/* Filter */}

      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all"
              ? "bg-cyan-500"
              : "bg-slate-700"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-lg ${
            filter === "unread"
              ? "bg-red-500"
              : "bg-slate-700"
          }`}
        >
          Unread
        </button>

        <button
          onClick={() => setFilter("read")}
          className={`px-4 py-2 rounded-lg ${
            filter === "read"
              ? "bg-green-500"
              : "bg-slate-700"
          }`}
        >
          Read
        </button>

      </div>

      {/* List */}

      {filteredMessages.length === 0 ? (
        <p className="text-gray-400">
          No messages found.
        </p>
      ) : (
        <div className="space-y-5">

          {filteredMessages.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl p-5"
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                <div>

                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="text-gray-300">
                    {item.email}
                  </p>

                  <p className="text-gray-400">
                    {item.phone}
                  </p>

                  <p className="text-cyan-400 mt-2">
                    {item.subject}
                  </p>

                  <p className="text-gray-400">
                    Service: {item.service}
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    {item.createdAt
                      ? new Date(
                          item.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "No Date"}
                  </p>

                </div>

                <div className="flex flex-col gap-3">

                  <span
                    className={`px-3 py-1 rounded-lg text-center ${
                      item.isRead
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.isRead ? "Read" : "Unread"}
                  </span>

                  <button
  onClick={() => setSelectedMessage(item)}
  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
>
  View
</button>

                  <button
  onClick={() =>
    toggleReadStatus(item.id, item.isRead)
    
  }
  className={`px-5 py-2 rounded-lg ${
    item.isRead
      ? "bg-yellow-500 hover:bg-yellow-600"
      : "bg-green-500 hover:bg-green-600"
  }`}
>
  {item.isRead ? "Mark Unread" : "Mark Read"}
</button>
<button
                    onClick={() =>
                      deleteMessage(item.id)
                    }
                    className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    
    {selectedMessage && (
  <div className="mt-10 bg-slate-800 rounded-xl border border-slate-700 p-6">

    <h2 className="text-2xl font-bold text-cyan-400 mb-6">
      Message Details
    </h2>

    <div className="space-y-3">

      <p>
        <strong>Name:</strong> {selectedMessage.name}
      </p>

      <p>
        <strong>Email:</strong> {selectedMessage.email}
      </p>

      <p>
        <strong>Phone:</strong> {selectedMessage.phone}
      </p>

      <p>
        <strong>Subject:</strong> {selectedMessage.subject}
      </p>

      <p>
        <strong>Service:</strong> {selectedMessage.service}
      </p>

      <div>

        <strong>Message:</strong>

        <div className="bg-slate-900 rounded-lg p-4 mt-2 whitespace-pre-wrap">
          {selectedMessage.message}
        </div>

      </div>

    </div>

    <div className="flex flex-wrap gap-3 mt-6">

  <button
    onClick={() =>
      replyEmail(
        selectedMessage.email,
        selectedMessage.subject
      )
    }
    className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg"
  >
    📧 Reply
  </button>

  <button
    onClick={() => copyEmail(selectedMessage.email)}
    className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
  >
    📋 Copy Email
  </button>

  <button
    onClick={() => copyPhone(selectedMessage.phone)}
    className="bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg"
  >
    📱 Copy Phone
  </button>

</div>
<button
      onClick={() => setSelectedMessage(null)}
      className="mt-6 bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg"
    >
      Close
    </button>

  </div>
)}
</div>
  );
}