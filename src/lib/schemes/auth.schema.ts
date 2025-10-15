import { useTranslations } from "next-intl";
import { z } from "zod";

export const useRegisterSchema = () => {
    // Translations
    const t = useTranslations();

    // Define the registration schema using Zod
    return z
        .object({
            firstName: z.string({ required_error: t("firstName-required") }).min(2, t("firstName-min")),
            lastName: z.string({ required_error: t("lastName-required") }).min(2, t("lastName-min")),
            email: z.string({ required_error: t("email-required") }).email(t("email-invalid")),
            phone: z.string({ required_error: t("phone-required") }).regex(/^\+\d{6,15}$/, t("phone-invalid")),
            gender: z.enum(["male", "female"], {
                required_error: t("gender-required"),
            }),
            password: z
                .string({ required_error: t("password-required") })
                .min(8, t("password-min"))
                .regex(/^[A-Z].*$/, t("password-first-capital"))
                .regex(/[^A-Za-z0-9]/, t("password-special-char")),
            rePassword: z.string({ required_error: t("confirmPassword-required") }),
        })
        .refine((data) => data.password === data.rePassword, {
            message: t("passwords-not-match"),
            path: ["rePassword"],
        });
};

export type RegisterInput = z.infer<ReturnType<typeof useRegisterSchema>>;
