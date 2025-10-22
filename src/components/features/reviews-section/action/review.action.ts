"use server";

import { ReviewInput } from "@lib/schemas/review.schema";
import GetToken from "@lib/utils/get-token.utils";

// Action to create a new review
export async function createReviewAction(data: ReviewInput) {
    // Get authentication token
    const token = await GetToken();

    try {
        // Ensure token exists
        if (!token) {
            throw new Error("Unauthorized: No token found");
        }

        // Send API request
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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
