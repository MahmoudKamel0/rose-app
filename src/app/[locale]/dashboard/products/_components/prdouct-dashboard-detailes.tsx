"use client";

import { ProductDashboardSteps } from "@lib/types/product-dashboard";
import React, { useState } from "react";
import ProductDashboard from "./product-dashboard";
import CreateProduct from "./create-product";
import EditProduct from "./edit-product";

export default function ProductDashboardDetailes() {
    const [step, setStep] = useState<ProductDashboardSteps>("new_product");
    const [productId, setProductId] = useState("673e1cd711599201718280fb");

    const steps = {
        products_dashboard: <ProductDashboard setStep={setStep} />,
        new_product: <CreateProduct setStep={setStep} />,
        edit_product: <EditProduct setStep={setStep} />,
    };

    return <main className="p-6">{steps[step]}</main>;
}
