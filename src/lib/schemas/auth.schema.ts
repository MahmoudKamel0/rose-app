import { z } from "zod";

// Login Schema
const loginSchema = z.object({
    email: z.email("Please enter a valid email address").nonempty("Please enter your email address"),
    password: z.string("Please enter your password").nonempty("Please enter your password")
})

type LoginValues = z.infer<typeof loginSchema>;

export { loginSchema };

export type { LoginValues };



