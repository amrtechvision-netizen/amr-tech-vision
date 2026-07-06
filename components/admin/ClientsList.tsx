"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Client {
  id: string;
  name: string;
  company: string;
  website?: string;
  logo: string;
  createdAt?: {
    seconds: number;
  };
}

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);

  const [editingId, setEditingId] = useState("");

  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "clients"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Client, "id">),
        }));

        setClients(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateClient = async () => {
    if (!editingId) return;

    try {
      await updateDoc(doc(db, "clients", editingId), {
        name: newName,
        company: newCompany,
        website: newWebsite,
      });

      alert("Client Updated Successfully");

      setEditingId("");
      setNewName("");
      setNewCompany("");
      setNewWebsite("");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  const deleteClient = async (id: string) => {
    if (!confirm("Delete this client?")) return;

    try {
      await deleteDoc(doc(db, "clients", id));
      alert("Client Deleted");
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        All Clients
      </h2>

      {clients.length === 0 ? (
        <p className="text-gray-400">
          No clients found.
        </p>
      ) : (
        <div className="space-y-6">

          {clients.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-5"
            >
              <div className="flex items-center gap-5">

                {item.logo && (
                  <Image
                    src={item.logo}
                    alt={item.company}
                    width={100}
                    height={100}
                    className="rounded-lg border border-slate-700 object-contain bg-white p-2"
                  />
                )}

                <div>

                  <h3 className="text-xl font-bold">
                    {item.company}
                  </h3>

                  <p className="text-cyan-400">
                    {item.name}
                  </p>

                  {item.website && (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline text-sm"
                    >
                      {item.website}
                    </a>
                  )}

                  <p className="text-gray-500 text-sm mt-2">
                    {item.createdAt
                      ? new Date(
                          item.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "No Date"}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setNewName(item.name);
                    setNewCompany(item.company);
                    setNewWebsite(item.website || "");
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteClient(item.id)}
                  className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {editingId && (
        <div className="mt-10 bg-slate-800 rounded-xl border border-slate-700 p-6">

          <h3 className="text-2xl font-bold text-cyan-400 mb-5">
            Edit Client
          </h3>

          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Client Name"
            className="w-full bg-slate-900 p-3 rounded-lg mb-4"
          />

          <input
            type="text"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            placeholder="Company Name"
            className="w-full bg-slate-900 p-3 rounded-lg mb-4"
          />

          <input
            type="url"
            value={newWebsite}
            onChange={(e) => setNewWebsite(e.target.value)}
            placeholder="Website"
            className="w-full bg-slate-900 p-3 rounded-lg mb-5"
          />

          <div className="flex gap-3">

            <button
              onClick={updateClient}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg"
            >
              Update
            </button>

            <button
              onClick={() => {
                setEditingId("");
                setNewName("");
                setNewCompany("");
                setNewWebsite("");
              }}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}