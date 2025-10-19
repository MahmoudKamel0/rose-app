import { useTranslations } from "next-intl";
import { z } from "zod";

export const useLoginSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    email: z
      .email({ message: t("email-invalid") })
      .min(1, { message: t("email-required") }),

    password: z
      .string()
      .min(1, { message: t("password-required") }),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;