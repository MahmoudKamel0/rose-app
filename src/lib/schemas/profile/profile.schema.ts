import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("email-invalid").min(1, "email-required"),
  phone: z.string().min(5, "Invalid phone number"),
  gender: z.string(),
  photo: z.string(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;