import React from "react";
import { CircleDollarSign, ClipboardList, LucideIcon, LucidePackage, ReceiptText } from "lucide-react";
import { cn } from "@lib/utils/cn.util";
import { getLocale, getTranslations } from "next-intl/server";
import { getOverallStatistics } from "@lib/apis/dashboard/statistics/get-overall-statistics.api";

interface OverallCardItem {
    id: number;
    title: string;
    number: number;
    bg: string;
    color: string;
    icon: LucideIcon;
    extra?: string;
}

export default async function Total() {
    // Translation
    const t = await getTranslations("dashboard.overview.first-row");
    const locale = await getLocale();

    // Functions
    const data: OverallStatisticsResponseType | string = await getOverallStatistics();

    if (typeof data == "string") {
        return <div className="flex items-center justify-center text-red-600">{data}</div>;
    }

    function formatNumber(num: number) {
        const newNum = Math.floor(num);
        return new Intl.NumberFormat(locale).format(newNum);
    }

    // Variables
    const { totalCategories, totalOrders, totalRevenue, totalProducts } = data.statistics;

    const overall: OverallCardItem[] = [
        {
            id: 1,
            title: t("total-products"),
            number: totalProducts,
            bg: "bg-maroon-50 dark:bg-dark-maroon",
            color: "text-maroon-600",
            icon: LucidePackage,
        },
        { id: 2, title: t("total-orders"), number: totalOrders, bg: "bg-light-blue", color: "text-blue-600", icon: ReceiptText },
        {
            id: 3,
            title: t("total-categories"),
            number: totalCategories,
            bg: "bg-light-purple",
            color: "text-custom-purple",
            icon: ClipboardList,
        },
        {
            id: 4,
            title: t("total-revenue"),
            number: totalRevenue,
            bg: "bg-light-green",
            color: "text-emerald-600",
            icon: CircleDollarSign,
            extra: t("egp"),
        },
    ];

    return (
        <div className="flex w-total flex-wrap gap-4 rounded-2xl bg-white p-6 dark:bg-zinc-800">
            {overall.map((item) => (
                <div key={item.id} className={cn(`w-52 rounded-2xl p-4`, item.bg, item.color)}>
                    {/* Icon */}
                    <div className="mb-3">
                        <item.icon size={35} strokeWidth={1.5} />
                    </div>

                    {/* Item number */}
                    <div className="text-2xl font-semibold">
                        <span>
                            <span>{formatNumber(item.number)}</span>
                        </span>
                        {item.extra && <sub className="ms-1 text-sm font-normal">{item.extra}</sub>}
                    </div>

                    {/* Item title */}
                    <div className="mt-1">
                        <span className="text-base font-medium text-zinc-800 dark:text-zinc-50">{item.title}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
