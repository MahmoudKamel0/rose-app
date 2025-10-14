import { z } from "zod";

// OTP Schema
export const OtpSchema = z.object({
  otp: z
    .string()
    .min(6, "Please enter all 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

// Infer TypeScript type from schema
export type OtpFormData = z.infer<typeof OtpSchema>;
