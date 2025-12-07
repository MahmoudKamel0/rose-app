import { z } from "zod";

export const updateOccasionSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export const createOccasionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.instanceof(File, { message: "Image is required" }),
});

export type UpdateOccasionFormValues = z.infer<typeof updateOccasionSchema>;
export type CreateOccasionFormValues = z.infer<typeof createOccasionSchema>;
