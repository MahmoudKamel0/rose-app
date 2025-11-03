import { OrderItem } from "@lib/types/end-point-api/orders";
import DeliveryInfo from "./components/delivery-info";
import OrderHeader from "./components/order-header";
import OrderItems from "./components/order-items";
import OrderStatusBadge from "./components/order-status-badge";
import PaymentMethodInfo from "./components/payment-method-info";
import PriceInfo from "./components/price-info";

interface OrderCardProps {
  orderNumber: string;
  createdAt: string;
  totalPrice: string;
  isPaid: boolean;
  paymentMethod: "Cash" | "Credit Card";
  deliveryStatus: "Pending" | "Cancelled" | "Delivered";
  status: "In Progress" | "Cancelled" | "Done";
  orderItems : OrderItem[]
}

const OrderCard = (props: OrderCardProps) => (
  <div className="bg-[#f4f4f5] rounded-lg">
    <OrderHeader orderNumber={props.orderNumber} createdAt={props.createdAt} />

    <div className="min-h-[430px]">
      <div className="flex justify-between m-4 pb-4 border-b border-zinc-200">
        <PriceInfo totalPrice={props.totalPrice} isPaid={props.isPaid} />
        <OrderStatusBadge status={props.status} />
      </div>

      <div className="px-4">
        <div className="flex flex-col gap-2.5">
          <PaymentMethodInfo paymentMethod={props.paymentMethod} />
          <DeliveryInfo deliveryStatus={props.deliveryStatus} />
          <OrderItems orderItems={props.orderItems} />
        </div>
      </div>
    </div>
  </div>
);

export default OrderCard;
