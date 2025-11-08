import { Truck, TriangleAlert, CheckCheck } from "lucide-react";
import { useTranslations } from "next-intl";

// Define possible delivery statuses
type DeliveryStatus = "Pending" | "Cancelled" | "Delivered";

interface DeliveryInfoProps {
    deliveryStatus: DeliveryStatus; // Current status of the delivery
}

// Configuration for each delivery status: icon and color
const deliveryConfig = {
    Pending: { icon: <Truck />, color: "text-yellow-600" },
    Cancelled: { icon: <TriangleAlert />, color: "text-[#CD2E33]" },
    Delivered: { icon: <CheckCheck />, color: "text-[#009966]" },
};

export default function DeliveryInfo({ deliveryStatus }: DeliveryInfoProps) {
    // Initialize translations for the "orders" namespace
    const t = useTranslations("orders");

    // Map delivery statuses to their translated text
    const statusTextMap = {
        Pending: t("deliveryInfo.pending"),
        Cancelled: t("deliveryInfo.cancelled"),
        Delivered: t("deliveryInfo.delivered"),
    };
    return (
        // Display delivery status with icon and translated text
        <h6 className="flex items-center gap-2.5 font-semibold">
            {t("deliveryInfo.label")}
            <span className={`${deliveryConfig[deliveryStatus].color} flex items-center gap-1 font-medium`}>
                {deliveryConfig[deliveryStatus].icon} {statusTextMap[deliveryStatus]}
            </span>
        </h6>
    );
}
