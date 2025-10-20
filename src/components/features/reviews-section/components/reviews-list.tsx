import Image from "next/image";
import { RatingStars } from "@components/shared/rating-stars";
import { fetchProductReviews } from "@lib/apis/product-reviews.api";
import { ReviewsSuccessResponse } from "@lib/types/review-product";
import { getTranslations, getFormatter } from "next-intl/server";

export default async function ReviewsList({ productId }: { productId: string }) {
    // Translation & Formatter
    const t = await getTranslations("reviewsList");
    const format = await getFormatter();

    // Fetch reviews from API
    const data = (await fetchProductReviews(productId)) as ReviewsSuccessResponse;
    const { reviews } = data;

    return (
        <div className="flex-1">
            {/* List of reviews */}
            <div className="mt-6 h-[15.4rem] space-y-[0.6rem] overflow-y-auto">
                {reviews.map((review) => {
                    // Format full name
                    const fullName = `${review.user.firstName} ${review.user.lastName}`;

                    // Get first letter of first name
                    const firstLetter = review.user.firstName?.charAt(0)?.toUpperCase() || "?";

                    // Format created date
                    const createdDate = format.dateTime(new Date(review.createdAt), "short");

                    return (
                        <div key={review._id} className="pb-6">
                            {/* Header */}
                            <div className="mb-3 flex items-center">
                                {/* Avatar */}
                                <div className="bg-maroon-800 relative mr-[0.44rem] flex h-11 w-11 items-center justify-center overflow-hidden rounded-full text-lg font-semibold text-white">
                                    {review?.user?.photo ? (
                                        <Image src={review.user.photo} alt={fullName} fill className="rounded-full object-cover" />
                                    ) : (
                                        <span>{firstLetter}</span>
                                    )}
                                </div>

                                {/* Name & Date */}
                                <div>
                                    <p className="font-semibold text-zinc-800 dark:text-white">{fullName}</p>
                                    <p className="text-sm text-zinc-500">{t("reviewedOn", { date: createdDate })}</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="mb-2 flex items-center">
                                <RatingStars rating={review.rating} />
                            </div>

                            {/* Title */}
                            <h3 className="mb-1 text-[15px] font-bold text-zinc-900 dark:text-zinc-50">{review.title}</h3>

                            {/* Comment */}
                            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{review.comment}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
