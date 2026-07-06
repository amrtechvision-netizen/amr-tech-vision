import { verifySuperAdmin } from "@/lib/verifyAdmin";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

const {
  idToken,
  uid,
  currentUid,
} = body;

// Verify Super Admin
await verifySuperAdmin(idToken);

    if (uid === currentUid) {
  return NextResponse.json(
    {
      success: false,
      message: "You cannot delete your own account.",
    },
    {
      status: 400,
    }
  );
}

    // Prevent self delete
    if (uid === currentUid) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot delete your own account.",
        },
        {
          status: 400,
        }
      );
    }

    // Check admin exists
    const adminDoc = await adminDb
      .collection("adminUsers")
      .doc(uid)
      .get();

    if (!adminDoc.exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Delete from Authentication
    await adminAuth.deleteUser(uid);

    // Delete Firestore document
    await adminDb
      .collection("adminUsers")
      .doc(uid)
      .delete();

    return NextResponse.json({
      success: true,
      message: "Admin deleted successfully.",
    });
  } catch (error: any) {
    console.error(error);

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