import React from "react";
import { getAllCategories } from "../../get-dashboard-data";
import { getTranslations } from "next-intl/server";

export default async function AllCategory() {
    // Translation
    const t = await getTranslations("dashboard.overview.first-row");

    // Function
    const data: AllCategoriesResponseType | string = await getAllCategories();

    if (typeof data == "string") {
        return <div className="flex items-center justify-center text-red-600">{data}</div>;
    }

    return (
        <div className="flex-1 rounded-2xl bg-white p-6 pr-3 dark:bg-zinc-800">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-50">{t("all-Categories")}</h2>
            <div className="custom-scroll mt-4 flex h-60 flex-col gap-2.5 overflow-y-auto px-2">
                {data.statistics.map((item) => (
                    <div className="flex items-start justify-between border-b-1 pb-2 text-zinc-800 dark:text-zinc-50" key={item._id}>
                        <span>{item.name}</span>
                        <span className="flex w-24 items-center justify-center rounded-lg bg-zinc-100 px-2 py-1 dark:bg-zinc-700">
                            {item.totalProducts} {t("products")}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
