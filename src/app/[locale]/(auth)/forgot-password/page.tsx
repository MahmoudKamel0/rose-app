import React from "react";
import ForgotPasswordLayout from "./_components/layout/forgot-passowrd-layout";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ForgotPassword() {
    // Translation hook, scoped to "otp" namespace
    const t = useTranslations("otp");

    return (
        <div>
            <ForgotPasswordLayout />
        </div>
    );
}
