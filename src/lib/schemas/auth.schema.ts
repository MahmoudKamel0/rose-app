import { useTranslations } from "next-intl";
import { z } from "zod";

export const useRegisterSchema = () => {
    const t = useTranslations();

    return z
        .object({
            firstName: z.string().min(1, t("firstName-required")).min(2, t("firstName-min")),
            lastName: z.string().min(1, t("lastName-required")).min(2, t("lastName-min")),
            email: z.string().min(1, t("email-required")).email(t("email-invalid")),
            phone: z
                .string()
                .min(1, t("phone-required"))
                .regex(/^\+\d{6,15}$/, t("phone-invalid")),
            gender: z.enum(["male", "female"], {
                message: t("gender-required"),
            }),
            password: z
                .string()
                .min(1, t("password-required"))
                .min(8, t("password-min"))
                .regex(/^[A-Z].*$/, t("password-first-capital"))
                .regex(/[^A-Za-z0-9]/, t("password-special-char")),
            rePassword: z.string().min(1, t("confirmPassword-required")),
        })
        .refine((data) => data.password === data.rePassword, {
            message: t("passwords-not-match"),
            path: ["rePassword"],
        });
};

export type RegisterInput = z.infer<ReturnType<typeof useRegisterSchema>>;
