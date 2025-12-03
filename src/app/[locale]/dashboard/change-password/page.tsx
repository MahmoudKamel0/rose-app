import ChangePasswordForm from "@components/shared/change-password-form";
import { useTranslations } from "next-intl";
import React from "react";

export default function ChangePasswordPage() {
    // Translation
    const t = useTranslations("change-password");

    return (
        <div className="p-8 bg-zinc-50 min-h-screen dark:bg-zinc-900">
            <div className="p-4 mt-4 bg-white dark:bg-zinc-800 rounded-2xl">
                <h1 className="text-zinc-800 dark:text-zinc-50 text-2xl font-semibold capitalize">{t("change-password")}</h1>
                <ChangePasswordForm />
            </div>
        </div>
    );
}

