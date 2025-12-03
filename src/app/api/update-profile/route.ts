import { NextResponse } from "next/server";
import { getDecodeToken } from "@lib/utils/get-decode-token";

export async function PUT(req: Request) {

  // Step 1: Read & parse incoming JSON request body
  const body = await req.json();

  // Step 2: Get and validate authenticated user token
  const token = await getDecodeToken();
  // If no token → return Unauthorized response
  if (!token?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // =======================================================
  // Step 3: Filter ONLY the fields allowed to be updated
  // This protects backend from receiving unwanted fields
  // like _id, photo, role, createdAt, wishlist, addresses
  // =======================================================
  const allowedFields = ["firstName", "lastName", "email", "phone"];
  const filteredBody: any = {};

  // Loop through allowed fields and copy only the existing ones
  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      filteredBody[key] = body[key];
    }
  }

  // Step 4: Send sanitized body to backend API
  const res = await fetch(`${process.env.BASE_URL}auth/editProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify(filteredBody),
  });

  // Step 5: Parse backend response
  const data = await res.json();

  // Step 6: If backend returned an error → forward it
  if (!res.ok) {
    return NextResponse.json({ message: data.message }, { status: res.status });
  }

  // Step 7: Successfully updated → return backend response
  return NextResponse.json(data);
}
