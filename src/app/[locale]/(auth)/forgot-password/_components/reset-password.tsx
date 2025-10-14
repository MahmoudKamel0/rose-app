"use client";

import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateNewPasswordSchema, CreateNewPasswordValues } from "@/lib/schemas/forget-password-schema";
import { useResetPassword } from "../_hooks/use-reset-password";
import { Link } from "lucide-react";
import { AuthError } from "../../_components/auth-error";

// Forget password step: Create a new password
export default function ResetPassword({ email }: { email: string }) {
    const { error, isPending, mutateAsync } = useResetPassword();

    const form = useForm<CreateNewPasswordValues>({
        resolver: zodResolver(CreateNewPasswordSchema),
        mode: "onSubmit",
        defaultValues: {
            newPassword: "",
            rePassword: "",
        },
    });

    // Handle form submission
    const onSubmit: SubmitHandler<CreateNewPasswordValues> = async (values) => {
        if (values?.newPassword) {
            const allValues = { email, newPassword: values.newPassword };

            const res = await mutateAsync(allValues, {
                onSuccess: () => {
                    console.log("success");
                },
            });
            console.log(res);
        }
    };

    return (
        <div className="w-full">
            {/* Back button */}

            {/* Heading and description */}
            <div className="dark:zinc-50 mb-2 flex flex-col items-start justify-center gap-2 text-zinc-800 dark:text-zinc-50">
                <h1 className="text-2xl font-semibold">Create a New Password</h1>
                <p className="text-base font-normal">Set a strong password to secure your account.</p>
            </div>

            {/* Password form */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((values) => onSubmit(values))}
                    className="space-y-6 border-y-1 py-6 dark:border-y-zinc-800"
                >
                    {/* New Password */}
                    <FormField
                        name="newPassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-zinc-800 dark:text-zinc-50">New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="********"
                                        aria-invalid={!!form.formState.errors.newPassword}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Confirm New Password */}
                    <FormField
                        name="rePassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-zinc-800 dark:text-zinc-50">
                                    Confirm New Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="********"
                                        aria-invalid={!!form.formState.errors.rePassword}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* API Error */}
                    {error && <AuthError error={error.message} />}

                    {/* Submit button */}
                    <Button type="submit" className="w-input font-semibold text-white" disabled={isPending}>
                        {isPending ? "Loading..." : "Reset password"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
