"use client";

import { Star } from "lucide-react";

// Props for the RatingStars component
interface RatingStarsProps {
    rating: number;
    max?: number;
}

export function RatingStars({ rating, max = 5 }: RatingStarsProps) {
    return (
        // Render the rating stars
        <div className="flex items-center">
            {/* Render the rating stars */}
            {Array.from({ length: max }).map((_, i) => {
                const fill = i + 1 <= Math.floor(rating);
                const half = rating - i >= 0.5 && rating - i < 1;

                // Return each star with appropriate fill
                return (
                    <div key={i} className="relative">
                        {/* Render the star icon */}
                        <Star className={`h-5 w-5 ${fill ? "fill-[#FFA508] text-transparent" : "text-transparent"}`} />

                        {/* Render half star if applicable */}
                        {half && (
                            <Star className="absolute top-0 left-0 h-5 w-5 fill-[#FFA508] text-transparent [clip-path:inset(0_50%_0_0)]" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
