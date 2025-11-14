"use client";

import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailForgetPasswordSchema, EmailForgetPasswordValue } from "@lib/schemas/auth/forget-password-schema";
import { useAddForgetPasswordEmail } from "../_hooks/use-add-forget-password-email";
import { FORGOT_PASSWORD_STEPS } from "@lib/constants/auth.constants";
import { AuthError } from "../../_components/auth-error";
import { useTranslations } from "next-intl";
import { Link } from "@i18n/navigation";
import { toast } from "sonner";
import { Step } from "@lib/types/auth/auth";

// component handles first step of "forgot password" flow
export default function ForgetPasswordEmail({
    setStep,
    setEmail,
}: {
    setStep: React.Dispatch<React.SetStateAction<Step>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
    // Translation
    const t = useTranslations("forget-password-email");

    // Hooks
    const { mutateAsync, isPending, error } = useAddForgetPasswordEmail();

    // Form
    const form = useForm({
        resolver: zodResolver(EmailForgetPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    // Get is valid form formState
    const { isValid } = form.formState;

    //  Functions
    const onSubmit: SubmitHandler<EmailForgetPasswordValue> = async (values) => {
        await mutateAsync(values, {
            onSuccess: () => {
                toast.success(t("toast"), {
                    description: t("toast-desc"),
                    duration: 3000,
                });
                form.reset();
                setEmail(values.email);
                setStep(FORGOT_PASSWORD_STEPS.OTP);
            },
        });
    };

    return (
        <div className="mx-auto">
            {/* Header  */}
            <div className="mb-4 flex-col items-start justify-center gap-2 text-zinc-800 dark:text-white">
                <h1 className="mb-2 text-2xl font-semibold">{t("title")}</h1>
                <p className="mb-6 text-base font-normal">{t("desc")}</p>
            </div>

            {/* Simple form to collect user email */}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((values) => onSubmit(values))}
                    className="h-full w-full space-y-6 border-y-2 py-9 dark:border-y-zinc-800"
                >
                    {/* Email field */}
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="mb-1.5 text-base font-medium">{t("label")}</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="user@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Backend error handling  */}
                    {error && <AuthError error={error.message} />}
                    <div className="mt-9 flex flex-col gap-10">
                        <Button
                            type="submit"
                            disabled={!isValid || isPending}
                            className="w-input flex h-11 items-center justify-center gap-2 font-medium text-white"
                        >
                            {isPending ? t("checking") : t("continue")}
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="mt-4">
                <p className="mt-5 text-center text-sm font-medium text-zinc-800 dark:text-zinc-50">
                    {t("footer-msg")}{" "}
                    <Link href="/register" className="font-bold text-maroon-700 dark:text-softpink-300">
                        {t("footer-link")}
                    </Link>
                </p>
            </div>
        </div>
    );
}
