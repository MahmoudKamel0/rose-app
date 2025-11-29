import BtnPrimary from "@components/shared/btn-primary";
import { Link } from "@i18n/navigation";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function OrdersError() {
    // translate orders error
    const t = useTranslations("orders");
    // return orders error
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-zinc-50 py-24 shadow-sm dark:bg-zinc-900">
            {/* orders error title */}
            <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
                <AlertTriangle className="h-14 w-14 text-red-500 dark:text-red-400" />
            </div>
            {/* orders error description */}
            <h2 className="mb-2 text-2xl font-semibold text-zinc-700 dark:text-zinc-100"> {t("error.title")}</h2>
            {/* orders error description */}
            <p className="mb-6 max-w-md text-center text-zinc-500 dark:text-zinc-400">{t("error.description")}</p>
            {/* orders error go shopping button */}
            <Link href={"/products"}>
                {/* orders error go shopping button text */}
                <BtnPrimary text={t("error.goShopping")} />
            </Link>
        </div>
    );
}
