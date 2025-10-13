import { Step } from "@lib/types/auth/auth";
import React from "react";

type ResetPasswordProps = {
    email: string | null;
    setStep: (step: Step) => void;
};

export default function ResetPassword({ email, setStep }: ResetPasswordProps) {
    return <div></div>;
}
