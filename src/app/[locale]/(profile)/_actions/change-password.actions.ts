"use server";

import { JSON_HEADER } from "@lib/constants/shared.constant";
import { getDecodeToken } from "@lib/utils/get-decode-token";
import { ChangePasswordRequest } from "../types/change-password.type";

// Function to change the user's password
export async function changePassword(data: ChangePasswordRequest) {
  // Get token from decode token function
  const token = await getDecodeToken() 

  // Send a PATCH request to the server to change the password
  const res = await fetch(`${process.env.BASE_URL}auth/change-password`, {
    method: "PATCH",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });
  
  // Check if the data is not ok 
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to change password");
  }

  // Parse the response JSON payload after a successful request
  const payload = await res.json();

  // Return the server response payload
  return payload;
}
