import { Suspense } from "react";
import ReviewsSection from "./components/general-rating";
import ReviewsList from "./components/reviews-list";
import ReviewsSectionSkeleton from "./components/reviews-section-skeleton";
import ReviewsListSkeleton from "./components/reviewsList-skeleton";
import ReviewForm from "./components/review-form";
import { fetchRelatedProducts } from "@lib/apis/related-products.api";
import EmblaCarousel from "@app/_components/best-selling-section/components/right-side-best-selling/embla-carousel-best-selling";
import HighlightedHeading from "@components/shared/highlighted-heading";
import { getTranslations } from "next-intl/server";

export default async function Page() {
    const t = await getTranslations("relatedProducts");
    const productId = "673e2e1f1159920171828153";

    return (
        <section className="px-20">
            {/* Wrap the fetching component inside Suspense */}
            <Suspense fallback={<ReviewsSectionSkeleton />}>
                {/* Render the fetched data */}
                <ReviewsSection productId={productId} />
            </Suspense>

            {/* Wrap the fetching component inside Suspense */}
            <div className="flex gap-5">
                {/* Render the fetched data */}
                <Suspense fallback={<ReviewsListSkeleton />}>
                    {/* Render the fetched data */}
                    <ReviewsList productId={productId} />
                </Suspense>

                {/* Review form */}
                <ReviewForm productId={productId} />
            </div>

            {/* Related Products */}
            <HighlightedHeading className="mt-15 mb-[1.3rem]" text={t("title")} highlightWidth="154px" borderWidth="60px" />

            {/* EMBLA CAROUSEL */}
            <EmblaCarousel fetchFn={fetchRelatedProducts} productId={productId} productNumber={4} />
        </section>
    );
}
