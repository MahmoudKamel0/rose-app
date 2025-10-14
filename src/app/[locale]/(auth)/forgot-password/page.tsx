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

            {/* Footer Section */}
            <p className="mt-5 text-center text-sm font-medium">
                {t("need-help")}{" "}
                <Link href="/contact" className="font-bold text-[#741C21]">
                    {t("contact-us")}
                </Link>
            </p>
        </div>
    );
}
