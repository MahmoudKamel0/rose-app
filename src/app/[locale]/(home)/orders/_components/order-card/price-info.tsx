import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

// price info props
interface PriceInfoProps {
    totalPrice: number;
    isPaid: boolean;
}

// price info component
export default function PriceInfo({ totalPrice, isPaid }: PriceInfoProps) {
    // translate price info
    const t = useTranslations("orders");
    // format price
    const format = useFormatter();    // formatted price

    const formattedPrice = format.number(totalPrice, "currency");
    // return price info
    return (
        // price info component
        <div className="flex items-center gap-2.5">
            {/* price info total price */}
            <h3 className="text-2xl font-medium">
                {t("priceInfo.totalPrice")}:<span className="ms-1 font-semibold">{formattedPrice}</span>
            </h3>
            {/* price info payment status badge */}
            <Badge
                variant="secondary"
                className={`${
                    isPaid ? "bg-[#00BC7D]" : "bg-gray-400"
                } flex items-center justify-center gap-2.5 rounded-full font-semibold text-white`}
            >
                {isPaid && <Check width={20} height={20} />}
                {isPaid ? t("priceInfo.paid") : t("priceInfo.notPaid")}
            </Badge>
        </div>
    );
}
