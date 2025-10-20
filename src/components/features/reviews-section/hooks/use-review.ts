"use client";

import { useMutation } from "@tanstack/react-query";
import { ReviewInput } from "@lib/schemas/review.schema";
import { createReviewAction } from "../action/review.action";

export const useReview = () => {
    // Mutation hook
    return useMutation({
        // Mutation function to create a review
        mutationFn: async (data: ReviewInput) => {
            try {
                // Call the action to create a review
                const res = await createReviewAction(data);

                // Check if the response is valid
                if (!res || res.error || res.error === "Failed") {
                    throw new Error(res?.error || "Something went wrong");
                }

                // Return the response
                return res;
            } catch (err: any) {
                // Log and re-throw the error
                console.error("Review submission failed:", err);
                throw err;
            }
        },
    });
};
