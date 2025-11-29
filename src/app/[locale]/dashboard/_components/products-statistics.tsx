import React from "react";
import TopSelling from "./top-selling";
import LowStock from "./low-stock";
import { ApiError, StatisticsResponse } from "@lib/types/dashboard/product-statistics";
import { getProductStatistics } from "@lib/apis/dashboard/product-statistics";

export default async function ProductsStatistics() {
    // Fetch statistics from the API
    const data: StatisticsResponse | ApiError = await getProductStatistics();

    // Handle API error response
    if ("error" in data) {
        return <p className="text-red-500">Error: {data.error}</p>;
    }

    const { topSellingProducts, lowStockProducts } = data.statistics;

    return (
        <div className="ms-4 mt-6 flex gap-6 p-10">
            {/* Display top selling products */}
            <TopSelling products={topSellingProducts} />

            {/* Display low stock products */}
            <LowStock products={lowStockProducts} />
        </div>
    );
}
