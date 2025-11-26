import z from "zod";

export const SetAddressesSchema = z.object({
    city: z.string().min(3, "City must be at least 3 characters lang").max(30, "City must be at most 30 characters lang"),
    street: z.string().min(10, "Address must be at least 10 characters lang").max(100, "Address must be at most 1000 characters lang"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\+\d{6,15}$/, "Phone number must be in international format starting with + followed by 6 to 15 digits"),
});

export type AddressFormData = z.infer<typeof SetAddressesSchema>;
