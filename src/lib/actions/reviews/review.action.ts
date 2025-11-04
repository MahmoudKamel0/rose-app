"use server";

import { ReviewInput } from "@lib/schemas/review.schema";
import { getDecodeToken } from "@lib/utils/get-decode-token";

// Action to create a new review
export async function createReviewAction(data: ReviewInput) {
    // Get authentication token
    const token = await getDecodeToken();

    console.log("get token",token);
    

    try {
        // Ensure token exists
        if (!token?.accessToken) {
            throw new Error("Unauthorized: No token found");
        }

        // Send API request
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.accessToken}`,
            },
            body: JSON.stringify(data),
        });

        // Parse response
        const payload = await res.json();

        // Handle non-OK responses
        if (!res.ok) {
            throw new Error(payload?.message || "Failed to create review");
        }

        // Return the created review data
        return payload;
    } catch (err) {
        console.error("createReviewAction error:", err);

        // Rethrow the error for further handling
        throw err;
    }
}
