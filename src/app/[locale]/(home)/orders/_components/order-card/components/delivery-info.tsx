import { Truck, X, Package, TriangleAlert, CheckCheck } from "lucide-react";

type DeliveryStatus = "Pending" | "Cancelled" | "Delivered";

interface DeliveryInfoProps {
  deliveryStatus: DeliveryStatus;
}

const deliveryConfig = {
  Pending: { icon: <Truck />, color: "text-yellow-600" },
  Cancelled: { icon: <TriangleAlert/>, color: "text-[#CD2E33]" },
  Delivered: { icon: <CheckCheck/>, color: "text-[#009966]" },
};

const DeliveryInfo = ({ deliveryStatus }: DeliveryInfoProps) => (
  <h6 className="font-semibold flex gap-2.5 items-center">
    Delivery Status:
    <span className={`${deliveryConfig[deliveryStatus].color} font-medium flex gap-1 items-center`}>
      {deliveryConfig[deliveryStatus].icon} {deliveryStatus}
    </span>
  </h6>
);

export default DeliveryInfo;
