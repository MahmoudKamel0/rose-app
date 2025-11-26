import React, { Suspense } from "react";

import ProductsStatistics from "./_components/products-statistics";
import ProductStatisticsLoader from "./_components/product-statistics-loader";

export default function page() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <Suspense fallback={<ProductStatisticsLoader />}>
                <ProductsStatistics />
            </Suspense>
        </div>
    );
}
