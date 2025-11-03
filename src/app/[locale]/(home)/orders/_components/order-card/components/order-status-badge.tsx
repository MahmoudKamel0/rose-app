import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

// Define possible order statuses
type OrderStatus = "In Progress" | "Cancelled" | "Done";

// Map each status to a corresponding background color
const statusColors = {
    "In Progress": "bg-blue-500",
    Cancelled: "bg-red-600",
    Done: "bg-[#00BC7D]",
};

interface OrderStatusBadgeProps {
    status: OrderStatus; // Current status of the order
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    // Initialize translations for the "orders" namespace
    const t = useTranslations("orders");

    // Map order statuses to their translated text
    const statusTextMap = {
        "In Progress": t("statusBadge.inProgress"),
        Cancelled: t("statusBadge.cancelled"),
        Done: t("statusBadge.done"),
    };
    return (
        // Container for the status badge
        <div className="status flex items-center gap-2.5">
            {/* Label for the status */}
            <h6 className="font-semibold">{t("statusBadge.label")}</h6>
            {/* Badge displaying the current status with color and translation */}
            <Badge variant="secondary" className={`${statusColors[status]} flex items-center gap-1 rounded-full capitalize text-white`}>
                {statusTextMap[status]}
            </Badge>
        </div>
    );
}
