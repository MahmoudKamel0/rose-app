import EmblaCarousel from "../application/home/best-selling-section/components/right-side-best-selling/embla-carousel-best-selling";
import ReviewsSection from "./components/general-rating";
import ReviewForm from "./components/review-form";
import ReviewsList from "./components/reviews-list";
import EmblaCarouselSkeleton from "@components/shared/embla-carousel-skeleton";
import HighlightedHeading from "@components/shared/highlighted-heading";
import ReviewsListSkeleton from "@components/skeletons/reviews-section/reviews-list.skeleton";
import ReviewsSectionSkeleton from "@components/skeletons/reviews-section/reviews-section.skeleton";
import { fetchRelatedProducts } from "@lib/apis/related-products.api";
import { ReviewsSectionProps } from "@lib/types/review-product";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function Reviews({ productId }: ReviewsSectionProps) {
    // Translation hook
    const t = await getTranslations("relatedProducts");
    const productIdd = "673e2e1f1159920171828153";

    return (
        <section className="container mx-auto max-w-[80rem]">
            {/* Wrap the fetching component inside Suspense */}
            <Suspense fallback={<ReviewsSectionSkeleton />}>
                {/* Render the fetched data */}
                <ReviewsSection productId={productIdd} />
            </Suspense>

            {/* Wrap the fetching component inside Suspense */}
            <div className="flex gap-5">
                {/* Render the fetched data */}
                <Suspense fallback={<ReviewsListSkeleton />}>
                    {/* Render the fetched data */}
                    <ReviewsList productId={productIdd} />
                </Suspense>

                {/* Review form */}
                <ReviewForm productId={productIdd} />
            </div>

            {/* Related Products */}
            <HighlightedHeading className="mt-15 mb-[1.3rem]" text={t("title")} highlightWidth="154px" borderWidth="60px" />

            {/* EMBLA CAROUSEL */}
            <Suspense fallback={<EmblaCarouselSkeleton productNumber={4} />}>
                <EmblaCarousel fetchFn={fetchRelatedProducts} productId={productIdd} productNumber={4} />
            </Suspense>
        </section>
    );
}
