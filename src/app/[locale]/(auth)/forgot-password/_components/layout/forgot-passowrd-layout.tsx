"use client";

import { FORGOT_PASSWORD_STEPS } from "@lib/constants/auth.constants";
import { Step } from "@lib/types/auth/auth";
import { useState } from "react";
import React from "react";
import EmailStep from "../email-step";
import OtpStep from "../otp-step";
import ResetPassword from "../reset-password";

export default function ForgetPasswordLayout() {
    const [email, setEmail] = useState<string>("");

    const [step, setStep] = useState<Step>(FORGOT_PASSWORD_STEPS.EMAIL);

    const steps = {
        [FORGOT_PASSWORD_STEPS.EMAIL]: <EmailStep setEmail={setEmail} setStep={setStep} />,
        [FORGOT_PASSWORD_STEPS.OTP]: <OtpStep email={email} setStep={setStep} />,
        [FORGOT_PASSWORD_STEPS.PASSWORD]: <ResetPassword email={email} />,
    };
    return <div className="w-input">{steps[step]}</div>;
}
