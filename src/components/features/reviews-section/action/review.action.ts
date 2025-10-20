"use server";

import { ReviewInput } from "@lib/schemas/review.schema";

export async function createReviewAction(data: ReviewInput) {
    // Send a POST request to the API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        body: JSON.stringify(data),
    });

    // Parse and return the response payload
    const payload = await res.json();
    return payload;
}
