import React from "react";
import { getTranslations } from "next-intl/server";

interface CartHeaderProps {
    count?: number;
}

export default async function CartHeader({ count = 0 }: CartHeaderProps) {
    // Translations
    const t = await getTranslations("cart");

    return (
        <div className="flex items-end gap-2">
            {/* cart title */}
            <h1 className="text-5xl font-bold">{t("title")}</h1>
            {/* cart count */}
            <span className="h-4 text-base text-zinc-400">
                {count} {t("products")}
            </span>
        </div>
    );
}
