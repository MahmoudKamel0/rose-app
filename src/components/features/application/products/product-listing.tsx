import { getAllProducts } from "@lib/apis/products/get-all-products.api";
import ProductItem from "./product-item";
import Pagination from "../pagination";
import { Suspense } from "react";
import { ProductItemSkeletonCard } from "@components/skeletons/product-item.skeleton";

/**
 * ProductListing component
 *
 * Renders a grid of product items, currently displaying 12 placeholder products.
 * Each product is represented by the ProductItem component.
 *
 * The component uses a simple array to simulate twelve products for demonstration or layout purposes.
 *
 * @returns {JSX.Element} The rendered grid of product items.
 */

type SearchParams = {
    page?: string;
    limit?: number;
};

export default async function ProductListing({ searchParams }: SearchParams) {
    const { products: PRODUCTS_LIST, metadata: META_DATA } = await getAllProducts(searchParams);

    return (
        <section id="product-listing" className="flex-auto">
            <div className="grid w-full grid-cols-3 gap-4">
                {PRODUCTS_LIST.map((item) => (
                    <Suspense key={item._id} fallback={<ProductItemSkeletonCard />}>
                        <ProductItem product={item} />
                    </Suspense>
                ))}
            </div>

            <Pagination className="mt-10" totalPages={META_DATA.totalPages} />
        </section>
    );
}
