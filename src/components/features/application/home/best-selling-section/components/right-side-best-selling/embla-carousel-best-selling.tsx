import ProductCard from "@components/shared/product-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@components/ui/carousel";
import React from "react";
import { useTranslations } from "next-intl"; // Next Intl translation
import { getTranslations } from "next-intl/server";
import { cn } from "@lib/utils/cn.util";

// Props for EmblaCarousel component
type EmblaCarouselProps = {
    fetchFn: (productId: string) => Promise<any>;
    productId: string;
    productNumber?: number;
};

export default async function EmblaCarousel({ fetchFn, productId, productNumber }: EmblaCarouselProps) {
    // Fetch related products
    const data = await fetchFn(productId);
    const products = data?.relatedProducts || data?.products || data || [];

    // Translation hook
    const t = await getTranslations("relatedProducts");

    return (
        <div className={cn("relative w-full", productNumber === 4 ? "w-full" : "md:w-3/4")}>
            {/* EMBLA CAROUSEL */}
            {Array.isArray(products) && products.length > 0 ? (
                <>
                    {/* Carousel with looping option */}
                    <Carousel opts={{ align: "start", loop: true }} className={cn("w-full")}>
                        {/* Carousel content */}
                        <CarouselContent>
                            {products.map((product: any) => (
                                <CarouselItem
                                    key={product._id || product.id}
                                    className={cn("basis-full sm:basis-1/2", productNumber === 4 ? "md:basis-1/4" : "md:basis-1/3")}
                                >
                                    {/* Product card */}
                                    <ProductCard product={product} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Carousel navigation buttons */}
                        <CarouselPrevious
                            className={cn("absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full border-red-900 bg-red-900")}
                        />
                        <CarouselNext
                            className={cn("absolute top-1/2 -right-0.5 z-10 -translate-y-1/2 rounded-full border-red-900 bg-red-900")}
                        />
                    </Carousel>
                </>
            ) : (
                // Translated message when no products exist
                <p className="text-gray-500">{t("noProducts", { default: "No products available" })}</p>
            )}
        </div>
    );
}
