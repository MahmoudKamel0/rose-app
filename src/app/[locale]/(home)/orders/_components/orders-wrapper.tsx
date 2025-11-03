import { fetchOrders } from "@lib/apis/orders/fetch-orders";
import NoOrders from "./no-orders";
import OrderCard from "./order-card";
import { Order } from "@lib/types/end-point-api/orders";
import OrdersError from "./orders-error";


export default async function OrdersWrapper() {
  try {
    const data = await fetchOrders();
    const orders: Order[] = data.orders;

    return (
      <>
        {orders.length === 0 ? (
          <NoOrders />
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <OrderCard
                key={order.orderNumber}
                orderNumber={order.orderNumber}
                createdAt={order.createdAt}
                totalPrice={order.totalPrice.toString()}
                isPaid={order.isPaid}
                paymentMethod={order.paymentType === "cash" ? "Cash" : "Credit Card"}
                deliveryStatus={
                  order.state === "pending"
                    ? "Pending"
                    : order.state === "cancelled"
                    ? "Cancelled"
                    : "Delivered"
                }
                status={
                  order.state === "pending"
                    ? "In Progress"
                    : order.state === "cancelled"
                    ? "Cancelled"
                    : "Done"
                }
                orderItems={order.orderItems}
              />
            ))}
          </div>
        )}
      </>
    );
  } catch (error) {
    return (
      <OrdersError/>
    );
  }
}
