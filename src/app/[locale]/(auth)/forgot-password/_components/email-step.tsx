import { Step } from "@lib/types/auth/auth";
import React from "react";

type EmailStepProps = {
    email: string | null;
    setEmail: (email: string) => void;
    setStep: (step: Step) => void;
};
export default function EmailStep({ email, setEmail, setStep }: EmailStepProps) {
  

    return <div></div>;
}
