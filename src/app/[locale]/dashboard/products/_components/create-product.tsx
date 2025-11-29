import React from "react";
import ProductForm from "./product-form";
import { ProductDashboardSteps } from "@lib/types/product-dashboard";

export default function CreateProduct({ setStep }: { setStep: React.Dispatch<React.SetStateAction<ProductDashboardSteps>> }) {
    return (
        <>
            <ProductForm setStep={setStep} />
        </>
    );
}
