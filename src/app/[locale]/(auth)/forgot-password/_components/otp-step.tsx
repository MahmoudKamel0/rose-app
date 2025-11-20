"use client";

import { useVerifyOtp } from "../_hooks/use-verify-otp";
import ResendOtpButton from "./resend-otp-btn";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@components/ui/button";
import { InputOTP, InputOTPSlot } from "@components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORGOT_PASSWORD_STEPS } from "@lib/constants/auth.constants";
import { OtpFormData, OtpSchema } from "@lib/schemas/auth/otp.schema";
import { Step } from "@lib/types/auth/auth";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type OtpStepProps = {
    email: string;
    setStep: (step: Step) => void;
};

export default function OtpStep({ email, setStep }: OtpStepProps) {
    // Translation hook scoped to "otp" namespace
    const t = useTranslations("otp");

    // State to store OTP error messages (string)
    const [otpError, setOtpError] = useState<string>();

    // React Query mutation for verifying OTP
    const { isPending, verifyOtp } = useVerifyOtp();

    // react-hook-form setup with Zod validation
    const form = useForm<OtpFormData>({
        resolver: zodResolver(OtpSchema), // Zod schema validation
        defaultValues: { resetCode: "" }, // Initial form values
    });

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    // Handle form submission
    const onSubmit = async (data: OtpFormData) => {
        await verifyOtp(data.resetCode, {
            onSuccess: () => {
                toast.success(t("toast.verifySuccess.title"), {
                    description: t("toast.verifySuccess.description"),
                    duration: 1000,
                });
                // Move to the next step on successful OTP verification
                setStep(FORGOT_PASSWORD_STEPS.PASSWORD);
            },
            onError: (err: Error) => {
                toast.error(t("toast.error.title"), {
                    description: t("toast.error.description"),
                    duration: 1000,
                });
                setOtpError(err.message || "Something went wrong");
            },
        });
    };

    return (
        <div className="flex flex-col text-zinc-800 dark:text-zinc-50">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-lg font-medium">{t("enter-title")}</h2>
                <p className="text-sm">
                    {t("sent", { email: email ?? "user@example.com" })}
                    <Button
                        variant="link"
                        size="link"
                        className="ms-0.5 capitalize text-blue-700 underline"
                        type="button"
                        onClick={() => setStep(FORGOT_PASSWORD_STEPS.EMAIL)}
                    >
                        {t("edit")}
                    </Button>
                </p>
            </div>

            {/* OTP Form */}
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6 border-b border-t border-zinc-200 py-6">
                    {/* OTP Input Field */}
                    <FormField
                        control={control}
                        name="resetCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputOTP
                                        maxLength={6}
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange(value);
                                            if (otpError) setOtpError("");
                                        }}
                                        className="justify-center"
                                    >
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <InputOTPSlot key={i} index={i} hasError={!!otpError} />
                                        ))}
                                    </InputOTP>
                                </FormControl>
                                {/* Display OTP error message if exists */}
                                {otpError && <p className="-mt-3 text-sm font-medium text-red-500">{otpError}</p>}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Resend OTP button */}
                    <ResendOtpButton email={email} />

                    {/* Submit OTP */}
                    <Button
                        type="submit"
                        className="mb-3 mt-4 w-full bg-[#A6252A] font-medium text-white"
                        disabled={isPending || isSubmitting}
                    >
                        {isSubmitting || isPending ? t("verifying") : t("verify")}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
