"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@components/ui/carousel";
import { cn } from "@lib/utils/cn.utils";
import React from "react";

// Props for the skeleton component
type EmblaCarouselSkeletonProps = {
    productNumber?: number;
};

export default function EmblaCarouselSkeleton({ productNumber }: EmblaCarouselSkeletonProps) {
    // Array placeholder for loading state (4 or 6 cards)
    const placeholders = Array.from({ length: productNumber || 4 });

    return (
        <div className={cn("relative w-full", productNumber === 4 ? "w-full" : "md:w-3/4")}>
            {/* EMBLA CAROUSEL SKELETON */}
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent>
                    {placeholders.map((_, index) => (
                        <CarouselItem
                            key={index}
                            className={cn("basis-full sm:basis-1/2", productNumber === 4 ? "md:basis-1/4" : "md:basis-1/3")}
                        >
                            {/* Skeleton Card */}
                            <div className="flex animate-pulse flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3">
                                {/* Image placeholder */}
                                <div className="h-48 w-full rounded-md bg-gray-300" />

                                {/* Text placeholders */}
                                <div className="mt-2 space-y-2">
                                    <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                                    <div className="h-4 w-1/2 rounded bg-gray-300"></div>
                                </div>

                                {/* Button placeholder */}
                                <div className="mt-3 h-8 w-1/2 rounded bg-gray-300"></div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Carousel navigation buttons (disabled style) */}
                <CarouselPrevious className="absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-default rounded-full border-gray-400 bg-gray-300 opacity-50" />
                <CarouselNext className="absolute top-1/2 -right-0.5 z-10 -translate-y-1/2 cursor-default rounded-full border-gray-400 bg-gray-300 opacity-50" />
            </Carousel>
        </div>
    );
}
