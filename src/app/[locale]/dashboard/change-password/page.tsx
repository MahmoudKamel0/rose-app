import ChangePasswordForm from "@components/shared/change-password-form";
import { useTranslations } from "next-intl";
import React from "react";

export default function ChangePasswordPage() {
    // Translation
    const t = useTranslations("change-password");

    return (
        <div className="container mx-auto flex gap-6 py-8 bg-zinc-50 min-h-screen dark:bg-zinc-900">
            <div className="w-1/4">
                <h1>Placeholder...</h1>
            </div>
            <div className="w-3/4 p-4 mt-9 bg-white dark:bg-zinc-800 rounded-2xl">
                <h1 className="text-zinc-800 dark:text-zinc-50 text-2xl font-semibold capitalize">{t("change-password")}</h1>
                <ChangePasswordForm />
            </div>
        </div>
    );
}

