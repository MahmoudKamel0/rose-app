import { Product } from "@lib/types/dashboard/product-statistics";
import { cn } from "@lib/utils/cn.util";
import { useTranslations } from "next-intl";

interface TopSellingProps {
    products: Product[];
}

// Predefined gradient classes for the top 3 products
const gradientClasses = [
    "from-customGold/25 to-customGold/10 bg-gradient-to-r", // 1st place
    "from-customSilver/25 to-customSilver/10 bg-gradient-to-r", // 2nd place
    "from-customBronze/25 to-customBronze/10 bg-gradient-to-r", // 3rd place
];

export default function TopSelling({ products }: TopSellingProps) {
    const t = useTranslations("top_selling");
    return (
        <div className="top-selling flex h-441 w-full flex-col gap-6 rounded-2xl bg-white p-6 text-zinc-800">
            {/* Component title */}
            <h2 className="title text-2xl font-semibold capitalize"> {t("title")}</h2>

            {/* Scrollable list of products */}
            <div className="list flex flex-col gap-2.5 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#7b1e24] hover:scrollbar-thumb-[#5a1218]">
                {products.map((item, index) => (
                    <div
                        key={item._id}
                        className={cn(
                            "flex items-center justify-between rounded-sm px-2.5 py-1.5",
                            // Apply gradient for top 3 products, else default background
                            index < 3 ? `${gradientClasses[index]}` : "bg-zinc-100"
                        )}
                    >
                        {/* Product title and price */}
                        <h3 className={cn(index < 3 ? "font-bold" : "")}>
                            {item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}{" "}
                            <span className="text-sm font-normal">({item.price.toLocaleString()} EGP)</span>
                        </h3>

                        {/* Number of sales */}
                        {/* <h3 className="text-sm font-bold capitalize">
                            {item.sold} <span className="font-medium">sales</span>
                        </h3> */}
                        <h3 className="text-sm font-bold capitalize"> {t("sales", { count: item.sold ?? 0 })}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
