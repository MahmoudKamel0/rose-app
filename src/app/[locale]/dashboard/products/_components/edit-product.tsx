import { ProductDashboardSteps } from "@lib/types/product-dashboard";
import React from "react";
import ProductForm from "./product-form";
import { useSpecificProduct } from "@/hooks/products/use-products.hook";
import PageLoader from "@components/shared/page-loader";
import { useTranslations } from "next-intl";

export default function EditProduct({
    setStep,
    productId,
}: {
    setStep: React.Dispatch<React.SetStateAction<ProductDashboardSteps>>;
    productId: string;
}) {
    // Transaltions
    const t = useTranslations("product-page");

    // Hooks
    const { error, isPending, specificProductData } = useSpecificProduct(productId);
    const { category, occasion, title, description, price, quantity, priceAfterDiscount } = specificProductData?.product || {};

    const theTitle = title as string;

    return (
        <>
            {isPending && <PageLoader />}
            {!error && !isPending && (
                <>
                    <div className="mb-6 overflow-clip text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
                        {t("edit-title", { theTitle })}
                    </div>
                    <ProductForm
                        setStep={setStep}
                        productId={productId}
                        productCategory={category}
                        productOccasion={occasion}
                        productTitle={title}
                        productDescription={description}
                        productPrice={`${price}`}
                        productQuantity={`${quantity}`}
                        productPriceAfterDiscount={`${priceAfterDiscount}`}
                        mode="edit"
                    />
                </>
            )}
        </>
    );
}
