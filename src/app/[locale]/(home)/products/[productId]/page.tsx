import React from "react";
import ProductDetailes from "./_components/product-detailes";

export default async function ProductId({ params }: { params: { productId: string } }) {
    const { productId } = params;

    return (
        <main className="px-20 py-16">
            <ProductDetailes productId={productId} />
        </main>
    );
}
