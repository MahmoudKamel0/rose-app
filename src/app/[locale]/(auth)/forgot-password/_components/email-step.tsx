"use client";

import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailForgetPasswordSchema, EmailForgetPasswordValue } from "@/lib/schemas/forget-password-schema";
import { MoveRight } from "lucide-react";
import { useAddForgetPasswordEmail } from "../_hooks/use-add-forget-password-email";
import { Step } from "@lib/types/auth/auth";
import { FORGOT_PASSWORD_STEPS } from "@lib/constants/auth.constants";

// component handles first step of "forgot password" flow
export default function ForgetPasswordEmail({
    setStep,
    setEmail,
}: {
    setStep: React.Dispatch<React.SetStateAction<Step>>;
    setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}) {
    // hook to send email request
    const { mutateAsync, error, isPending } = useAddForgetPasswordEmail();

    // form config with zod validation
    const form = useForm({
        resolver: zodResolver(EmailForgetPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const { isValid } = form.formState;

    // handle submit
    const onSubmit: SubmitHandler<EmailForgetPasswordValue> = async (values) => {
        const res = await mutateAsync(values, {
            onSuccess: () => {
                form.reset();
                setEmail(values.email);
                setStep(FORGOT_PASSWORD_STEPS.OTP);
            },
        });
    };

    return (
        <div className="mx-auto max-w-md rounded-lg bg-white p-6 font-mono">
            <div className="mb-4 flex-col items-start justify-center gap-2">
                <h1 className="font-inter mb-2 text-3xl font-bold text-gray-800">Forgot Password</h1>
                <p className="mb-6 font-mono text-base font-normal text-gray-500">
                    Don&apos;t worry, we will help you recover your account.
                </p>
            </div>

            {/* simple form to collect user email */}

            <Form {...form}>
                <form onSubmit={form.handleSubmit((values) => onSubmit(values))} className="space-y-6">
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-gray-800">Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="user@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col gap-10">
                        {error && <AuthError error={error.message} />}
                        <Button
                            type="submit"
                            disabled={!isValid || isPending}
                            className="flex h-11 w-full items-center justify-center gap-2 bg-blue-600 font-medium text-white"
                        >
                            <span>Continue</span> <MoveRight />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
