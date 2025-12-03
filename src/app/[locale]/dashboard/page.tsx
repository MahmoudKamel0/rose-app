import React, { Suspense } from "react";
import OverviewFirstRow from "./_components/overview-first-row";
import ProductsStatistics from "./_components/products-statistics";
import ProductStatisticsLoader from "./_components/product-statistics-loader";

export default function page() {
    return (
        <div className="min-h-screen">
            <OverviewFirstRow />
            <Suspense fallback={<ProductStatisticsLoader />}>
                <ProductsStatistics />
            </Suspense>
        </div>
    );
}
