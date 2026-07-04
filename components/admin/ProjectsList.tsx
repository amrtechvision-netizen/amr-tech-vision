"use client";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Project {
  id: string;
  title: string;
  description: string;
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<Project, "id">),
        }));

        setProjects(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;

    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const updateProject = async () => {
    if (!editingId) return;

    try {
      await updateDoc(doc(db, "projects", editingId), {
        title: newTitle,
        description: newDescription,
      });

      alert("Project Updated Successfully!");

      setEditingId("");
      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 mt-8">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        All Projects
      </h2>

      {projects.length === 0 ? (
        <p className="text-gray-400">
          No projects available.
        </p>
      ) : (
        <div className="space-y-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-5"
            >
              <div>
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>

                <p className="text-gray-400 mt-2">
                  {project.description}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingId(project.id);
                    setNewTitle(project.title);
                    setNewDescription(project.description);
                  }}
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(project.id)}
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
            Edit Project
          </h3>

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Project Title"
            className="w-full bg-slate-900 p-3 rounded-lg mb-4"
          />

          <textarea
            rows={5}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Project Description"
            className="w-full bg-slate-900 p-3 rounded-lg mb-5"
          />

          <div className="flex gap-3">
            <button
              onClick={updateProject}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold"
            >
              Update Project
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