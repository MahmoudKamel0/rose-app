import { Suspense } from "react";
import ReviewsSection from "./components/general-rating";
import ReviewsList from "./components/reviews-list";
import ReviewsSectionSkeleton from "../../skeletons/reviews-section/reviews-section.skeleton";
import ReviewsListSkeleton from "../../skeletons/reviews-section/reviews-list.skeleton";
import ReviewForm from "./components/review-form";
import { fetchRelatedProducts } from "@lib/apis/related-products.api";
import EmblaCarousel from "@app/_components/best-selling-section/components/right-side-best-selling/embla-carousel-best-selling";
import HighlightedHeading from "@components/shared/highlighted-heading";
import { getTranslations } from "next-intl/server";
import EmblaCarouselSkeleton from "@components/shared/embla-carousel-skeleton";
import { ReviewsSectionProps } from "@lib/types/review-product";

export default async function Reviews({ productId }: ReviewsSectionProps) {
    // Translation hook
    const t = await getTranslations("relatedProducts");
    const productIdd = "673e2e1f1159920171828153";

    return (
        <section className="px-20">
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
