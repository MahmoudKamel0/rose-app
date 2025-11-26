import Loading from "@components/shared/loading";
import { useTranslations } from "next-intl";

export default function ProductStatisticsLoader() {
    const t = useTranslations("products_statistics");
    return (
        <div className="ms-4 mt-6 flex gap-6 p-10">
            {/* Top Selling Products Loader */}
            <div className="top-selling flex h-441 w-[536px] items-center justify-center gap-6 rounded-2xl bg-white p-6">
                <Loading label={t("loadingTopSelling")} />
            </div>

            {/* Low Stock Products Loader */}
            <div className="low-stock flex h-441 w-[536px] items-center justify-center gap-6 rounded-2xl bg-white p-6">
                <Loading label={t("loadingLowStock")} />
            </div>
        </div>
    );
}
