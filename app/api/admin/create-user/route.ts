import { verifySuperAdmin } from "@/lib/verifyAdmin";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { adminDb } from "@/lib/firebaseAdminFirestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();

const {
  idToken,
  name,
  email,
  password,
  role,
} = body;

// Verify Super Admin
await verifySuperAdmin(idToken);

    const user = await adminAuth.createUser({
      displayName: name,
      email,
      password,
    });

    await adminDb.collection("adminUsers").doc(user.uid).set({
      uid: user.uid,
      name,
      email,
      role,
      status: "active",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      uid: user.uid,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}