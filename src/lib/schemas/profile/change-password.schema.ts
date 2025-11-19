import { z } from "zod";

// Define a validation schema for the Change Password form using Zod
export const ChangePasswordFormSchema = z
  .object({
    password: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  // Custom validation to ensure new password and confirmation match
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

  // Define a TypeScript type inferred from the schema for form values
  export type ChangePasswordValues = z.infer<typeof ChangePasswordFormSchema>;
  