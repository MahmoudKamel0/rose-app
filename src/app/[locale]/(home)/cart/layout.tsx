import React, { Suspense } from "react";
import EmblaCarousel from "@components/features/application/home/best-selling-section/components/right-side-best-selling/embla-carousel-best-selling";
import EmblaCarouselSkeleton from "@components/shared/embla-carousel-skeleton";
import HighlightedHeading from "@components/shared/highlighted-heading";
import { fetchRecommendations } from "@lib/apis/cart/products-may-like.api";
import { useTranslations } from "next-intl";

export default function Layout({ children }: { children: React.ReactNode }) {
    // translations
    const t = useTranslations("Cart");

    return (
        <section className="container mx-auto mb-12 mt-16 flex max-w-[80rem] flex-col gap-10">
            {/* cart content */}
            <div className="flex gap-10">
                {/* cart items */}
                {children}

                {/* cart summary placeholder */}
                <div className="h-[38rem] w-[25rem] rounded-md border border-zinc-200 p-5">
                    <h3 className="mb-4 text-lg font-semibold">Cart Summary</h3>
                    <p className="text-gray-500">Subtotal, shipping, and total will appear here.</p>
                </div>
            </div>

            {/* carousel below the cart */}
            <div className="mt-16 w-full">
                {/* Related Products */}
                <HighlightedHeading
                    className="mt-15 mb-[1.3rem]"
                    text={t("productsYouMayLike")}
                    highlightWidth="154px"
                    borderWidth="60px"
                />

                {/* Carousel */}
                <Suspense fallback={<EmblaCarouselSkeleton productNumber={4} />}>
                    <EmblaCarousel productId="" productNumber={4} fetchFn={fetchRecommendations} />
                </Suspense>
            </div>
        </section>
    );
}
