"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import { FORGOT_PASSWORD_STEPS } from "@lib/constants/auth.constants";
import { Step } from "@lib/types/auth/auth";
import { InputOTP, InputOTPSlot } from "@components/ui/input-otp";
import { OtpFormData, OtpSchema } from "@lib/schemas/auth.schemas";
import { useTranslations } from "next-intl";
import { useVerifyOtp } from "../_hooks/use-verify-otp";

import { toast } from "sonner";
import ResendOtpButton from "./resend-otp-btn";

type OtpStepProps = {
    email: string | null;
    setStep: (step: Step) => void;
};

export default function OtpStep({ email, setStep }: OtpStepProps) {
    // State to store OTP error messages (string)
    const [otpError, setOtpError] = useState<string>();

    // Translation hook scoped to "otp" namespace
    const t = useTranslations("otp");

    // React Query mutation for verifying OTP
    const { isPending, verifyOtp } = useVerifyOtp();

    // react-hook-form setup with Zod validation
    const {
        control, // Controller for form inputs
        handleSubmit, // Function to handle form submission
        formState: { errors, isSubmitting }, // Form state
    } = useForm<OtpFormData>({
        resolver: zodResolver(OtpSchema), // Zod schema validation
        defaultValues: { resetCode: "" }, // Initial form values
    });

    const onSubmit = async (data: OtpFormData) => {
        await verifyOtp(data.resetCode, {
            onSuccess: () => {
                toast.success("OTP verified successfully", {
                    description: "You can now reset your password",
                    duration: 4000,
                });
                // Move to the next step on successful OTP verification
                setStep(FORGOT_PASSWORD_STEPS.PASSWORD);
            },
            onError: (err: Error) => {
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
                    <Button variant="link" size="link" className="ms-0.5 text-blue-700 capitalize underline" type="button">
                        {t("edit")}
                    </Button>
                </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6 border-t border-b border-zinc-200 py-6">
                <Controller
                    name="resetCode"
                    control={control}
                    render={({ field }) => (
                        <>
                            {/* OTP Input: 6 slots in a single row */}
                            <InputOTP
                                maxLength={6}
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                    if (otpError) setOtpError(""); // reset error on typing
                                }}
                                hasError={!!otpError} // boolean for border styling
                                className="justify-center"
                            >
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <InputOTPSlot key={i} index={i} hasError={!!otpError} />
                                ))}
                            </InputOTP>

                            {/* Error messages */}
                            {otpError && <p className="-mt-3 text-sm font-medium text-red-500">{otpError}</p>}
                            {errors.resetCode && <p className="-mt-3 text-sm font-medium text-red-500">{t("error")}</p>}
                        </>
                    )}
                />

                {/* Resend OTP button */}
                <ResendOtpButton email={email} />

                {/* Submit OTP */}
                <Button type="submit" className="mt-4 mb-3 w-full bg-[#A6252A] font-medium text-white" disabled={isPending || isSubmitting}>
                    {isSubmitting || isPending ? t("verifying") : t("verify")}
                </Button>
            </form>
        </div>
    );
}
