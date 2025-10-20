"use server";

import { ReviewInput } from "@lib/schemas/review.schema";
import { getAccessToken } from "@lib/utils/get-token.util";
import { log } from "console";

export async function createReviewAction(data: ReviewInput) {
    // Get the access token
    const token = await getAccessToken();

    // Send a POST request to the API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    // Parse and return the response payload
    const payload = await res.json();
    return payload;
}
