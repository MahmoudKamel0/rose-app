import HighlightedHeading from "@components/shared/highlighted-heading";
import { RatingStars } from "@components/shared/rating-stars";
import { fetchProductReviews } from "@lib/apis/product-reviews.api";
import { ReviewsSuccessResponse } from "@lib/types/review-product";
import { getTranslations } from "next-intl/server";

// Props for the ReviewsSection component
interface ReviewsSectionProps {
    productId: string;
}

export default async function ReviewsSection({ productId }: ReviewsSectionProps) {
    // Translation
    const t = await getTranslations("reviewsSection");

    // Server-side fetch
    const data = (await fetchProductReviews(productId)) as ReviewsSuccessResponse;
    const { reviews, metadata } = data;

    // Calculate average rating
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = reviews.length ? totalRating / reviews.length : 0;

    return (
        <div className="border-b pb-4">
            {/* Rating info */}
            <HighlightedHeading text={t("title")} highlightWidth="154px" borderWidth="60px" />

            {/* General rating info */}
            <div className="mt-4 space-y-1">
                <h3 className="font-font-primary align-middle text-[20px] leading-none font-semibold tracking-normal text-zinc-900 dark:text-zinc-50">
                    {t("generalRating")}
                </h3>

                {/* Average rating */}
                <p className="text-2xl leading-none font-bold text-zinc-800 dark:text-white">
                    {avgRating.toFixed(1)}{" "}
                    <span className="text-sm leading-none font-medium text-zinc-500">
                        {t("averageRating", { rating: avgRating.toFixed(1), count: metadata.totalItems })}
                    </span>
                </p>

                {/* Rating stars */}
                <RatingStars rating={avgRating} />
            </div>
        </div>
    );
}
