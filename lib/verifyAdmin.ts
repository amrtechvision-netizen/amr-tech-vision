import { adminAuth, adminDb } from "./firebaseAdmin";

export async function verifySuperAdmin(idToken: string) {
  try {
    // Verify Firebase ID Token
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    const uid = decodedToken.uid;

    // Check Firestore admin record
    const adminDoc = await adminDb
      .collection("adminUsers")
      .doc(uid)
      .get();

    if (!adminDoc.exists) {
      throw new Error("Admin not found.");
    }

    const admin = adminDoc.data();

    if (!admin) {
      throw new Error("Invalid admin.");
    }

    if (admin.status !== "active") {
      throw new Error("Admin account is disabled.");
    }

    if (admin.role !== "Super Admin") {
      throw new Error("Permission denied.");
    }

    return {
      success: true,
      uid,
      admin,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}