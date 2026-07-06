"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

interface AdminUser {
  uid: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function AdminUsersList() {
    const updateRole = async (
  uid: string,
  role: string
) => {
  try {
    await updateDoc(doc(db, "adminUsers", uid), {
      role,
    });

    alert("Role Updated");
  } catch (error) {
    console.error(error);
    alert("Failed to update role");
  }
};

const updateStatus = async (
  uid: string,
  status: string
) => {
  try {
    await updateDoc(doc(db, "adminUsers", uid), {
      status,
    });
    
    alert("Status Updated");
  } catch (error) {
    console.error(error);
    alert("Failed to update status");
  }
};
const deleteAdmin = async (uid: string) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this admin?"
  );

  if (!confirmDelete) return;

  try {
    const currentUid = auth.currentUser?.uid;
    const user = auth.currentUser;

if (!user) {
  alert("Please login again.");
  return;
}

const idToken = await user.getIdToken(true);

    const res = await fetch("/api/admin/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  idToken,
  uid,
  currentUid,
}),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    alert("Admin Deleted Successfully");
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
};
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [currentRole, setCurrentRole] = useState("");

  useEffect(() => {
    const loadCurrentAdmin = async () => {
  if (!auth.currentUser) return;

  const snap = await getDoc(
    doc(db, "adminUsers", auth.currentUser.uid)
  );

  if (snap.exists()) {
    setCurrentRole(snap.data().role);
  }
};

loadCurrentAdmin();
    const unsubscribe = onSnapshot(
      collection(db, "adminUsers"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as AdminUser),
        }));

        setAdmins(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        All Admin Users
      </h2>

      {admins.length === 0 ? (
        <p className="text-gray-400">
          No admin users found.
        </p>
      ) : (
        <div className="space-y-4">

          {admins.map((admin) => (
            <div
              key={admin.uid}
              className="bg-slate-800 rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">
                  {admin.name}
                </h3>

                <p className="text-gray-400">
                  {admin.email}
                </p>

                <p className="text-cyan-400 mt-1">
                  {admin.role}
                </p>
              </div>

              <div className="flex flex-col gap-3 items-end">

  <span
    className={`px-4 py-2 rounded-full ${
      admin.status === "active"
        ? "bg-green-500/20 text-green-400"
        : "bg-red-500/20 text-red-400"
    }`}
  >
    {admin.status}
  </span>

  {currentRole === "Super Admin" ? (
  <select
    value={admin.role}
    onChange={(e) =>
      updateRole(admin.uid, e.target.value)
    }
    className="bg-slate-700 px-3 py-2 rounded-lg"
  >
    <option>Super Admin</option>
    <option>Admin</option>
    <option>Editor</option>
  </select>
) : (
  <div className="bg-slate-700 px-3 py-2 rounded-lg">
    {admin.role}
  </div>
)}

  {currentRole === "Super Admin" ? (
  <select
    value={admin.status}
    onChange={(e) =>
      updateStatus(admin.uid, e.target.value)
    }
    className="bg-slate-700 px-3 py-2 rounded-lg"
  >
    <option value="active">Active</option>
    <option value="disabled">Disabled</option>
  </select>
) : (
  <div className="bg-slate-700 px-3 py-2 rounded-lg">
    {admin.status}
  </div>
)}
  {currentRole === "Super Admin" && (
  <button
    onClick={() => deleteAdmin(admin.uid)}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    Delete Admin
  </button>
)}

</div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}