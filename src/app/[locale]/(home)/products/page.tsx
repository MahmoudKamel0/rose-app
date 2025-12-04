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
            <Container className="mt-16 flex gap-12">
                <div className="filters flex w-[301px] flex-col gap-2.5">
                    <CategoriesFilters />
                    <OccasionFilter />
                    <RatingFilter />
                    <PriceFilter />
                    <ResetAll />
                </div>
                <ProductListing searchParams={searchParams} />
            </Container>
        </main>
    );
}
