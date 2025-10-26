import React from "react";

import { Container } from "@components/features/application/container";
import OccasionFilter from '@components/features/occasion-filter/occasion-filter'
import PriceFilter from '@components/features/price-filter/price-filter'
import ProductListing from "@components/features/application/products/product-listing";
import CategoriesFilters from "./_components/categories";
import RatingFilter from "./_components/rating-filtration";
import ResetAll from "./_components/common/reset-all";

type SearchParams = {
    page?: string;
    limit?: number;
};

type ProductsPageProps = {
    searchParams: SearchParams;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    return (
        <main className="m-auto mx-20 mt-3 flex gap-6">
            <div className="filters flex w-1/4 flex-col gap-2.5 border-e-1 border-zinc-100 h-screen">
                <CategoriesFilters />
                <OccasionFilter />
                <RatingFilter />
                <PriceFilter />
                <ResetAll />
            </div>
            <Container className="mt-16 w-3/4 flex gap-12">
                <div className="sticky top-0 h-screen w-72 bg-red-600"></div>
                {/* <ProductListing searchParams={searchParams} /> */}
            </Container>
        </main>
    );
}
