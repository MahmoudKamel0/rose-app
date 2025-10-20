"use client";

import React, { useState } from "react";
import { useSpecificProduct } from "@/hooks/products/use-products";
import Image from "next/image";
import { cn } from "@/lib/utils/cn.utils"; // optional helper for class merging (if you use shadcn)

export default function SpecificProduct() {
    const { specificProductData, error, isLoading } = useSpecificProduct();
    const data = specificProductData?.product;

    // Use state

    const [activeImage, setActiveImage] = useState<string | null>(null);

    if (isLoading) return <div>Loading product…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;

    // Vairiables

    const mainImage = activeImage || data.images[0];

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-xl">
                <Image src={mainImage} alt={data.title} width={605} height={402} className="rounded-10 h-[402px] object-cover transition" />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center justify-center gap-2">
                {data.images.map((img) => (
                    <button
                        key={img}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={cn(
                            "relative overflow-hidden rounded-xl border-2",
                            activeImage === img ? "border-maroon-600" : "border-transparent"
                        )}
                    >
                        <Image
                            src={img}
                            alt={data.title}
                            width={91}
                            height={111}
                            className={cn(
                                "rounded-md object-cover transition-all duration-200",
                                activeImage === img ? "brightness-100" : "brightness-75"
                            )}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
