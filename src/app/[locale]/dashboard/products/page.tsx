import React from "react";
import ProductDashboardDetailes from "./_components/prdouct-dashboard-detailes";
import { searchParams } from "@lib/types/product-dashboard";

export default function Product({ searchParams }: { searchParams: searchParams }) {
    return (
        <>
            <ProductDashboardDetailes searchParams={searchParams} />
        </>
    );
}
