import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z.string().nonempty("First name is required"),
        lastName: z.string().nonempty("Last name is required"),
        email: z.string().email("Invalid email").nonempty("Email is required"),
        phone: z
            .string()
            .nonempty("Phone is required")
            .regex(/^\+\d{6,15}$/, "Invalid phone number"),
        gender: z.enum(["male", "female"], { message: "Gender is required" }),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
        rePassword: z.string().nonempty("Confirm password is required"),
    })
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords don't match",
        path: ["rePassword"],
    });

export type RegisterInput = z.infer<typeof registerSchema>;
