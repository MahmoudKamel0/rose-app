import { z } from "zod";

export const reviewSchema = z.object({
    // ID of the reviewed product
    product: z.string().min(1, "Product ID is required"),
    // Rating between 1 and 5
    rating: z.number().min(1, "Please select a rating").max(5),
    // Title of the review
    title: z.string().min(1, "Title is required"),
    // Comment content of the review
    comment: z.string().min(1, "Comment is required"),
});

// Infer TypeScript type from schema
export type ReviewInput = z.infer<typeof reviewSchema>;
