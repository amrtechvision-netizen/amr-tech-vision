"use client";


import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Service {
  id: string;
  title: string;
  description: string;
  // icon field removed
  createdAt?: {
    seconds: number;
  };
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);

  const [editingId, setEditingId] = useState("");

  const [newTitle, setNewTitle] = useState("");

  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "services"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Service, "id">),
        }));

        setServices(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateService = async () => {
    if (!editingId) return;

    try {
      await updateDoc(doc(db, "services", editingId), {
        title: newTitle,
        description: newDescription,
      });

      alert("Service Updated Successfully");

      setEditingId("");
      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;

    try {
      await deleteDoc(doc(db, "services", id));

      alert("Service Deleted");
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        All Services
      </h2>

      {services.length === 0 ? (
        <p className="text-gray-400">
          No services available.
        </p>
      ) : (
        <div className="space-y-6">

          {services.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-5"
            >
              <div className="flex items-center gap-5">


                <div>

                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {item.description}
                  </p>

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
                    setNewTitle(item.title);
                    setNewDescription(item.description);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteService(item.id)}
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
            Edit Service
          </h3>

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-slate-900 p-3 rounded-lg mb-4"
          />

          <textarea
            rows={4}
            value={newDescription}
            onChange={(e) =>
              setNewDescription(e.target.value)
            }
            className="w-full bg-slate-900 p-3 rounded-lg mb-5"
          />

          <div className="flex gap-3">

            <button
              onClick={updateService}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg"
            >
              Update
            </button>

            <button
              onClick={() => {
                setEditingId("");
                setNewTitle("");
                setNewDescription("");
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