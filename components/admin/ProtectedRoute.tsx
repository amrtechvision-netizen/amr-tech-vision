"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const ADMIN_EMAILS = [
  "amrtechvision@gmail.com",
  "aamiraalam75@gmail.com",
];

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }

      if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
        alert("Access Denied");

        await signOut(auth);

        router.replace("/admin/login");
        return;
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <h1 className="text-cyan-400 text-3xl font-bold animate-pulse">
          Verifying Admin...
        </h1>
      </div>
    );
  }

  return <>{children}</>;
}