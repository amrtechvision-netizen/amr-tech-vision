"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        // Login page ko block mat karo
        if (pathname === "/admin/login") {
          setLoading(false);
          return;
        }

        if (!user) {
          router.replace("/admin/login");
          setLoading(false);
          return;
        }

        const snap = await getDoc(
          doc(db, "adminUsers", user.uid)
        );

        if (!snap.exists()) {
          await signOut(auth);
          router.replace("/admin/login");
          setLoading(false);
          return;
        }

        const admin = snap.data();

        if (admin.status !== "active") {
          await signOut(auth);
          router.replace("/admin/login");
          setLoading(false);
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <h1 className="text-cyan-400 text-3xl font-bold">
          Verifying Admin...
        </h1>
      </div>
    );
  }

  return <>{children}</>;
}