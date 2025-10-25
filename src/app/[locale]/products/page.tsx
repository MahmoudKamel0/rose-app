<<<<<<< HEAD
import React from "react";

export default function Products() {
    return (
        <div>
            <h1>products</h1>
        </div>
=======
import { Container } from "@components/features/application/container";
import ProductListing from "@components/features/application/products/product-listing";

type SearchParams = {
    page?: string;
    limit?: number
};

type ProductsPageProps = {
    searchParams: SearchParams;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {

    return (
        <main>
            <Container className="mt-16 flex gap-12">
                <div className="sticky top-0 h-screen w-72 bg-red-600"></div>
                <ProductListing searchParams={searchParams} />
            </Container>
        </main>
>>>>>>> 54f27d8f79cc709188ec8e853b50c3dea765fc67
    );
}
