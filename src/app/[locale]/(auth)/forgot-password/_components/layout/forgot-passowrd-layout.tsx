"use client";

import { FORGOT_PASSWORD_STEPS } from "@lib/constants/auth.constants";
import { Step } from "@lib/types/auth/auth";
import { useState } from "react";
import React from "react";
import EmailStep from "../email-step";
import OtpStep from "../otp-step";
import ResetPassword from "../reset-password";

export default function ForgotPasswordLayout() {
    // Manage  email state
    const [email, setEmail] = useState<string>("");
    // Manage current step state
    const [step, setStep] = useState<Step>(FORGOT_PASSWORD_STEPS.EMAIL);

    // Define components for each step
    const steps = {
        [FORGOT_PASSWORD_STEPS.EMAIL]: <EmailStep setEmail={setEmail} setStep={setStep} />,
        [FORGOT_PASSWORD_STEPS.OTP]: <OtpStep email={email} setStep={setStep} />,
        [FORGOT_PASSWORD_STEPS.PASSWORD]: <ResetPassword email={email} />,
    };
    return <>{steps[step]}</>;
}
