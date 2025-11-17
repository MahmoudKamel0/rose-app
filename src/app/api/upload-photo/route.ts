import { NextResponse } from "next/server";
import { getDecodeToken } from "@lib/utils/get-decode-token";

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("photo") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // ⭐ Decode token from cookies (Server only)
    const token = await getDecodeToken();

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ⭐ Re-create file as Node.js File for backend
    const arrayBuffer = await file.arrayBuffer();
    const nodeFile = new File([arrayBuffer], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });

    const backendForm = new FormData();
    backendForm.append("photo", nodeFile);

    // Forward request to real backend API
    const res = await fetch(`${process.env.BASE_URL}auth/upload-photo`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: backendForm,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Upload failed", data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
