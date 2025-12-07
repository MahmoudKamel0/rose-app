import React, { Suspense } from "react";
import OverviewFirstRow from "./_components/overview-first-row";
import ProductsStatistics from "./_components/products-statistics";
import ProductStatisticsLoader from "./_components/product-statistics-loader";
import OrdersStatusCard from "./_components/orders-status";
import RevenueChart from "./_components/revenue";

export default function page() {
    return (
        <div className="min-h-screen">
            <OverviewFirstRow />
            <div className="flex gap-8">
                <OrdersStatusCard />
                <RevenueChart />
            </div>
            <Suspense fallback={<ProductStatisticsLoader />}>
                <ProductsStatistics />
            </Suspense>
        </div>
    );
}
