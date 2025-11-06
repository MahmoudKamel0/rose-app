import z from "zod";


// Define TypeScript type for the change password request
export type ChangePasswordRequest = {
  password: string;
  newPassword: string;
};

// Generic type to infer form input types from a Zod schema
export type FormInput<T extends z.ZodType<any, any>> = z.infer<T>;