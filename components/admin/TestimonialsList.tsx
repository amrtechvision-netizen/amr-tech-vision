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

interface Testimonial {
  id: string;
  name: string;
  company: string;
  review: string;
  rating: number;
  image: string;
  createdAt?: {
    seconds: number;
  };
}

export default function TestimonialsList() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [editingId, setEditingId] = useState("");

  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "testimonials"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Testimonial, "id">),
        }));

        setTestimonials(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateTestimonial = async () => {
    if (!editingId) return;

    try {
      await updateDoc(doc(db, "testimonials", editingId), {
        name: newName,
        company: newCompany,
        review: newReview,
        rating: newRating,
      });

      alert("Testimonial Updated");

      setEditingId("");
      setNewName("");
      setNewCompany("");
      setNewReview("");
      setNewRating(5);
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;

    try {
      await deleteDoc(doc(db, "testimonials", id));
      alert("Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        All Testimonials
      </h2>

      {testimonials.length === 0 ? (
        <p className="text-gray-400">
          No testimonials found.
        </p>
      ) : (
        <div className="space-y-6">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:justify-between gap-5"
            >
              <div className="flex gap-5">

                {item.image ? (
  <Image
    src={item.image}
    alt={item.name}
    width={90}
    height={90}
    className="rounded-full object-cover border border-slate-700"
  />
) : (
  <div className="w-[90px] h-[90px] rounded-full bg-slate-700 flex items-center justify-center border border-slate-700">
    <span className="text-3xl">👤</span>
  </div>
)}

                <div>

                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="text-cyan-400">
                    {item.company}
                  </p>

                  <p className="text-yellow-400 mt-2">
                    {"⭐".repeat(item.rating)}
                  </p>

                  <p className="text-gray-300 mt-3">
                    {item.review}
                  </p>

                  <p className="text-gray-500 text-sm mt-3">
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
                    setNewReview(item.review);
                    setNewRating(item.rating);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTestimonial(item.id)}
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
            Edit Testimonial
          </h3>

          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full bg-slate-900 p-3 rounded-lg mb-4"
          />

          <input
            type="text"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            className="w-full bg-slate-900 p-3 rounded-lg mb-4"
          />

          <textarea
            rows={4}
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full bg-slate-900 p-3 rounded-lg mb-4"
          />

          <select
            value={newRating}
            onChange={(e) =>
              setNewRating(Number(e.target.value))
            }
            className="w-full bg-slate-900 p-3 rounded-lg mb-5"
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>

          <div className="flex gap-3">

            <button
              onClick={updateTestimonial}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg"
            >
              Update
            </button>

            <button
              onClick={() => {
                setEditingId("");
                setNewName("");
                setNewCompany("");
                setNewReview("");
                setNewRating(5);
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