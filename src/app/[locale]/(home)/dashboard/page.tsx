import React from "react";
import OrdersStatusCard from "./_components/orders-status";
import RevenueChart from "./_components/revenue";

export default function Page() {
    return (
        <div className="flex gap-8">
            <OrdersStatusCard />
            <RevenueChart />
        </div>
    );
}
