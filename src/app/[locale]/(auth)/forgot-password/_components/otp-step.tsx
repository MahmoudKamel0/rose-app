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

const CORRECT_OTP = "123456"; // Simulation for testing

type OtpStepProps = {
  email: string | null;
  setStep: (step: Step) => void;
};

export default function OtpStep({ email, setStep }: OtpStepProps) {
  const t = useTranslations("otp");

  // State for showing OTP errors
  const [otpError, setOtpError] = useState<string>("");

  // react-hook-form setup
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<OtpFormData>({
    resolver: zodResolver(OtpSchema),
    defaultValues: { otp: "" },
  });

  // Handle form submission
  const onSubmit = async (data: OtpFormData) => {

    console.log(data)
    // Simulate OTP check
    if (data.otp !== CORRECT_OTP) {
      setOtpError("Invalid OTP. Please try again."); // Show error
      return;
    }

    setOtpError(""); // Reset error on correct OTP

    // Simulate async verification
    await new Promise(resolve => setTimeout(resolve, 1000));

    setStep(FORGOT_PASSWORD_STEPS.PASSWORD); // Move to next step
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
          name="otp"
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
              {errors.otp && <p className="-mt-3 text-sm font-medium text-red-500">{t("error")}</p>}
            </>
          )}
        />

        {/* Resend OTP button */}
        <div className="flex w-full justify-end">
          <Button type="button" variant="ghost">{t("send-new")}</Button>
        </div>

        {/* Submit OTP */}
        <Button
          type="submit"
          className="mt-4 mb-3 w-full bg-[#A6252A] font-medium text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("verifying") : t("verify")}
        </Button>
      </form>
    </div>
  );
}
