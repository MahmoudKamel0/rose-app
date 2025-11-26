import { getOrders } from "@lib/apis/orders/fetch-orders";
import NoOrders from "./no-orders";
import OrderCard from "./order-card";
import { Order } from "@lib/types/end-point-api/orders";
import OrdersError from "./orders-error";

export default async function OrdersWrapper() {
    try {
        // fetch orders
        const data = await getOrders();
        // get orders
        const orders: Order[] = data.orders;
        // return orders wrapper


        return (
            <>
                {orders.length === 0 ? (
                    <NoOrders /> // no orders component
                ) : (
                    // orders component
                    <div className="flex flex-col gap-4">
                        {orders.map((order) => (
                            <OrderCard
                                // order card component
                                key={order.orderNumber}
                                orderNumber={order.orderNumber}
                                createdAt={order.createdAt}
                                totalPrice={order.totalPrice}
                                isPaid={order.isPaid}
                                paymentMethod={order.paymentType === "cash" ? "Cash" : "Credit Card"}
                                deliveryStatus={
                                    order.state === "pending" ? "Pending" : order.state === "cancelled" ? "Cancelled" : "Delivered"
                                }
                                status={order.state === "pending" ? "In Progress" : order.state === "cancelled" ? "Cancelled" : "Done"}
                                orderItems={order.orderItems}
                            />
                        ))}
                    </div>
                )}
            </>
        );
        // catch error
    } catch {
        return <OrdersError />; // orders error component
    }
}
