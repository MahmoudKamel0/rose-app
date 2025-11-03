import React from "react";
import OrderCard from "./_components/order-card";
import { PackageX } from "lucide-react";
import BtnPrimary from "@components/shared/btn-primary";
import { Link } from "@i18n/navigation";
import NoOrders from "./_components/no-orders";

// const orders = [
//     {
//         orderNumber: "12345",
//         createdAt: "14 July, 2025 at 10:05AM",
//         totalPrice: "1,820 EGP",
//         isPaid: true,
//         paymentMethod: "Cash",
//         deliveryStatus: "Pending",
//         status: "In Progress",
//         items: [],
//     },
//     {
//         orderNumber: "12346",
//         createdAt: "15 July, 2025 at 12:00PM",
//         totalPrice: "2,500 EGP",
//         isPaid: false,
//         paymentMethod: "Credit Card",
//         deliveryStatus: "Delivered",
//         status: "Done",
//         items: [],
//     },
//     {
//         orderNumber: "12347",
//         createdAt: "16 July, 2025 at 2:00PM",
//         totalPrice: "1,200 EGP",
//         isPaid: false,
//         paymentMethod: "Cash",
//         deliveryStatus: "Cancelled",
//         status: "Cancelled",
//         items: [],
//     },
// ];
const orders = [];

export default function Page() {
    return (
        <main className="m-auto mx-20 mt-16">
            <h1 className="mb-8 text-5xl font-bold text-zinc-800">Orders</h1>

            {orders.length === 0 ? (
                <NoOrders />
            ) : (
                <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.orderNumber}
                            orderNumber={order.orderNumber}
                            createdAt={order.createdAt}
                            totalPrice={order.totalPrice}
                            isPaid={order.isPaid}
                            paymentMethod={order.paymentMethod}
                            deliveryStatus={order.deliveryStatus}
                            status={order.status}
                            items={order.items}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
