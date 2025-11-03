import { Badge } from "@/components/ui/badge";

type OrderStatus = "In Progress" | "Cancelled" | "Done";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusConfig = {
  "In Progress": { color: "bg-blue-500", text: "in progress" },
  Cancelled: { color: "bg-red-600", text: "cancelled" },
  Done: { color: "bg-[#00BC7D]", text: "done" },
};

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => (
  <div className="status flex items-center gap-2.5">
    <h6 className="font-semibold">status:</h6>
    <Badge
      variant="secondary"
      className={`${statusConfig[status].color} text-white  rounded-full capitalize flex items-center gap-1`}
    >
      {statusConfig[status].text}
    </Badge>
  </div>
);

export default OrderStatusBadge;
