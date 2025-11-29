import { useFormatter, useTranslations } from "next-intl";

// OrderHeader card props
interface OrderHeaderProps {
    orderNumber: string;
    createdAt: string;
}
export default function OrderHeader({ orderNumber, createdAt }: OrderHeaderProps) {
    // Initialize translations for the "orders" namespace
    const t = useTranslations("orders");
    // Initialize formatter for dates and numbers
    const format = useFormatter();
    return (
        // Main container for the order header
        <div className="order-item flex h-14 justify-between rounded-t-lg bg-[#A6252A] p-4">
            {/* Order title with order number */}
            <h3 className="text-2xl font-semibold text-white">
                {t("header.order")} <span>{orderNumber}</span>
            </h3>
            {/* Order creation date */}
            <p className="text-base font-normal text-zinc-100">
                {t("header.createdIn")}: <time className="font-semibold">{format.dateTime(new Date(createdAt), "full")}</time>
            </p>
        </div>
    );
}
