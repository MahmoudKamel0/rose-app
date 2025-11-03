import BtnPrimary from "@components/shared/btn-primary";
import { Link } from "@i18n/navigation";
import { PackageX } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function NoOrders() {
    // translate no orders
    const t = useTranslations("orders");
    // return no orders
    return (
        // no orders component
        <div className="flex flex-col items-center justify-center rounded-2xl bg-zinc-50 py-24 shadow-sm dark:bg-zinc-900">
            {/* no orders icon */}
            <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
                <PackageX className="h-14 w-14 text-zinc-500 dark:text-zinc-400" />
            </div>
            {/* no orders title */}
            <h2 className="mb-2 text-2xl font-semibold text-zinc-700 dark:text-zinc-100"> {t("noOrders.title")}</h2>
            {/* no orders description */}
            <p className="mb-6 max-w-md text-center text-zinc-500 dark:text-zinc-400">{t("noOrders.description")}</p>
            {/* no orders go shopping button */}
            <Link href={"/products"}>
                {/* no orders go shopping button text */}
                <BtnPrimary text={t("noOrders.startShopping")} />
            </Link>
        </div>
    );
}
