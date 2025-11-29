import { ProductDashboardSteps } from "@lib/types/product-dashboard";
import React from "react";
import Product from "../page";
import ProductForm from "./product-form";

export default function EditProduct({
    setStep,
    productId,
}: {
    setStep: React.Dispatch<React.SetStateAction<ProductDashboardSteps>>;
    productId: string;
}) {
    return <ProductForm setStep={setStep} productId={productId} />;
}
