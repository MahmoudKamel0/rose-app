import React from "react";
import ProductForm from "./product-form";
import { ProductDashboardSteps } from "@lib/types/product-dashboard";
import { useTranslations } from "next-intl";

export default function CreateProduct({ setStep }: { setStep: React.Dispatch<React.SetStateAction<ProductDashboardSteps>> }) {
    // Transaltions
    const t = useTranslations("product-page");

    return (
        <>
            {/* Title */}
            <div className="mb-6 text-2xl font-semibold text-zinc-800 dark:text-zinc-50">{t("create-title")}</div>

            <ProductForm setStep={setStep} mode="create" />
        </>
    );
}
