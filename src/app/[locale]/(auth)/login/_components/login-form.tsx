"use client";

import { LoginFields, useLoginSchema } from "@lib/schemas/auth/login.schema";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Link } from "@/i18n/navigation";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { useLogin } from "../_hooks/use-login";
import { useTranslations } from "next-intl";
import SubmissionFeedback from "@components/shared/submission-feedback";

export default function LoginForm() {
    // Translation
    const t = useTranslations("login-page");

    // Form
    const form = useForm<LoginFields>({
        resolver: zodResolver(useLoginSchema()),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Mutation
    const { login, isPending, error } = useLogin();

    // Function
    const onSubmit: SubmitHandler<LoginFields> = (values) => {
        login(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mb-5 flex w-[25.5rem] flex-col  border-y border-zinc-200 py-6 dark:border-zinc-700"
            >
                {/* Email */}
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="mb-4">
                            <Label>{t("email")} </Label>
                            <FormControl>
                                <Input {...field} placeholder="user@example.com" className="w-full" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="mb-2.5">
                            <Label>{t("password")} </Label>
                            <FormControl>
                                <Input {...field} placeholder="********" type="password" className="w-full" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Forgot Password */}
                <Link href="/forgot-password" className="text-maroon-700 dark:text-softpink-300 mb-9 text-end text-sm font-semibold">
                    {t("forgotpss")}
                </Link>

                {/* Feedback */}
                <SubmissionFeedback>{error?.message}</SubmissionFeedback>

                {/* Submit */}
                <Button
                    type="submit"
                    variant="default"
                    size="default"
                    disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
                    className="bg-maroon-600 h-12 w-full text-base font-medium text-white"
                >
                    {t("submit")}
                </Button>
            </form>
        </Form>
    );
}
