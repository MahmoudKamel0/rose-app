import ProductDetailes from "./_components/product-detailes";
import Reviews from "@components/features/reviews-section/reviews-section";
import React from "react";

export default async function ProductId({ params }: { params: { productId: string } }) {
    const { productId } = params;

    return (
        <main className="px-20 py-16">
            {/* Render the product details */}
            <ProductDetailes productId={productId} />

            {/* Render the product reviews */}
            <Reviews productId={productId} />
        </main>
    );
}
