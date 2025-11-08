import { OrderItem } from "@lib/types/end-point-api/orders";
import DeliveryInfo from "./delivery-info";
import OrderHeader from "./order-header";
import OrderItems from "./order-items";
import OrderStatusBadge from "./order-status-badge";
import PaymentMethodInfo from "./payment-method-info";
import PriceInfo from "./price-info";

// order card props
interface OrderCardProps {
    orderNumber: string;
    createdAt: string;
    totalPrice: number;
    isPaid: boolean;
    paymentMethod: "Cash" | "Credit Card";
    deliveryStatus: "Pending" | "Cancelled" | "Delivered";
    status: "In Progress" | "Cancelled" | "Done";
    orderItems: OrderItem[];
}

// order card component
const OrderCard = (props: OrderCardProps) => (
    // order card component
    <div className="rounded-lg bg-[#f4f4f5]">
        <OrderHeader orderNumber={props.orderNumber} createdAt={props.createdAt} />
        {/* order card content */}
        <div className="min-h-[430px]">
            {/* order card price info */}
            <div className="m-4 flex justify-between border-b border-zinc-200 pb-4">
                <PriceInfo totalPrice={props.totalPrice} isPaid={props.isPaid} />
                {/* order card status badge */}
                <OrderStatusBadge status={props.status} />
            </div>

            {/* order card content */}
            <div className="px-4">
                <div className="flex flex-col gap-2.5">
                    {/* order card payment method info */}
                    <PaymentMethodInfo paymentMethod={props.paymentMethod} />
                    {/* order card delivery info */}
                    <DeliveryInfo deliveryStatus={props.deliveryStatus} />
                    {/* order card order items */}
                    <OrderItems orderItems={props.orderItems} />
                </div>
            </div>
        </div>
    </div>
);

export default OrderCard;
