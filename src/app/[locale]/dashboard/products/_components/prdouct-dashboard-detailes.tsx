"use client";

import { ProductDashboardSteps, searchParams } from "@lib/types/product-dashboard";
import React, { useState } from "react";
import CreateProduct from "./create-product";
import EditProduct from "./edit-product";
import DashboardProducts from "./dashboard-products";

export default function ProductDashboardDetailes({ searchParams }: { searchParams: searchParams }) {
    const [step, setStep] = useState<ProductDashboardSteps>("products_dashboard");
    const [productId, setProductId] = useState("");

    const steps = {
        products_dashboard: <DashboardProducts setStep={setStep} searchParams={searchParams} setProductId={setProductId} />,
        new_product: <CreateProduct setStep={setStep} />,
        edit_product: <EditProduct setStep={setStep} productId={productId} />,
    };

    return <main className="p-6">{steps[step]}</main>;
}
