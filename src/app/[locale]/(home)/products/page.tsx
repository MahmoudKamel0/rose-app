import CategoriesFilters from "./_components/categories";
import ResetAll from "./_components/common/reset-all";
import RatingFilter from "./_components/rating-filtration";
import { Container } from "@components/features/application/container";
import ProductListing from "@components/features/application/products/product-listing";

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
                    <RatingFilter />
                    <ResetAll />
                </div>
                <ProductListing searchParams={searchParams} />
            </Container>
        </main>
    );
}
