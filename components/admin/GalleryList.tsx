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

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  createdAt?: {
    seconds: number;
  };
}

export default function GalleryList() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [editingId, setEditingId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState("");
const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "gallery"),
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<GalleryItem, "id">),
          }))
          .filter(
            (item) =>
              item.image &&
              typeof item.image === "string" &&
              item.image.startsWith("http")
          );

        setGallery(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const uploadNewImage = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setUploading(true);

  try {
    const data = new FormData();

    data.append("file", file);

    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();

    setNewImage(result.secure_url);
  } catch (error) {
    console.error(error);
    alert("Image Upload Failed");
  } finally {
    setUploading(false);
  }
};
const updateGallery = async () => {
    if (!editingId) return;

    try {
      await updateDoc(doc(db, "gallery", editingId), {
  title: newTitle,
  category: newCategory,
  image: newImage || gallery.find(
    (item) => item.id === editingId
  )?.image,
});
      alert("Gallery Updated Successfully!");

      setEditingId("");
      setNewTitle("");
      setNewCategory("");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;

    try {
      await deleteDoc(doc(db, "gallery", id));
      alert("Gallery Image Deleted");
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Gallery Images
      </h2>

      {gallery.length === 0 ? (
        <p className="text-gray-400">
          No gallery images found.
        </p>
      ) : (
        <div className="space-y-6">

          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-5"
            >
              <div className="flex items-center gap-5">

                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={140}
                    height={100}
                    className="rounded-lg object-cover border border-slate-700"
                  />
                ) : (
                  <div className="w-[140px] h-[100px] rounded-lg bg-slate-700 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-cyan-400">
                    {item.category}
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
                    setNewCategory(item.category);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteImage(item.id)}
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
        <div className="mt-10 bg-slate-800 rounded-xl p-6 border border-slate-700">

          <h3 className="text-2xl font-bold text-cyan-400 mb-5">
            Edit Gallery
          </h3>

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Gallery Title"
            className="w-full bg-slate-900 p-3 rounded-lg mb-4"
          />

          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full bg-slate-900 p-3 rounded-lg mb-5"
          >
            <option>CCTV</option>
            <option>Fire Alarm</option>
            <option>Networking</option>
            <option>Access Control</option>
            <option>BMS</option>
            <option>PA System</option>
            <option>Other</option>
          </select>
          <input
  type="file"
  accept="image/*"
  onChange={uploadNewImage}
  className="w-full bg-slate-900 p-3 rounded-lg mb-4"
/>
{uploading && (
  <p className="text-cyan-400 mb-4">
    Uploading New Image...
  </p>
)}
{newImage && (
  <img
    src={newImage}
    alt="Preview"
    className="w-52 rounded-lg border border-slate-700 mb-5"
  />
)}

          <div className="flex gap-3">

            <button
              onClick={updateGallery}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold"
            >
              Update
            </button>

            <button
              onClick={() => {
                setEditingId("");
                setNewTitle("");
                setNewCategory("");
                setNewImage("");
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