"use client";

import React, { useState, useEffect } from "react";
import { useSpecificProduct } from "@app/[locale]/products/[productId]/_hooks/use-products.hook";
import Image from "next/image";
import { cn } from "@/lib/utils/cn.utils";
import { Heart, Loader2, Minus, Package, Plus, Star } from "lucide-react";
import CartBtn from "./add-to-cart-button";
import { useTranslations } from "next-intl";

export default function ProductDetailes({ productId }: { productId: string }) {
    // Translation
    const t = useTranslations("product-detailes");

    // State
    const [activeImage, setActiveImage] = useState<string>("");
    const [liked, setLiked] = useState(false);

    // Hooks
    const { specificProductData, error, isPending } = useSpecificProduct(productId);
    const data = specificProductData?.product;

    // useEffect
    useEffect(() => {
        if (data?.images?.length && !activeImage) {
            setActiveImage(data.images[0]);
        }
    }, [data, activeImage]);

    // Variables
    const mainImage = activeImage || (data?.images[0] as string);

    return (
        <div className="flex gap-16">
            {/* Handel loading */}
            {isPending && (
                <div className="flex min-h-screen w-full flex-col items-center justify-center">
                    <Loader2 className="text-maroon-500 h-14 w-14 animate-spin" />
                    <p>{t("loading")}</p>
                </div>
            )}

            {/* Handel error */}
            {error && <div>Error: {error.message}</div>}

            {/* Main image */}
            {data && (
                <>
                    <div className="flex flex-col items-center justify-between">
                        <div className="relative h-96 w-xl overflow-hidden rounded-xl">
                            <Image src={mainImage} alt={data.title} fill className="rounded-10 object-fill transition" />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex items-center justify-center gap-2">
                            {data &&
                                data.images.map((img) => (
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
                                                "rounded-md object-cover transition-all duration-200 hover:brightness-75",
                                                activeImage === img ? "brightness-100" : "brightness-50"
                                            )}
                                        />
                                    </button>
                                ))}
                        </div>
                    </div>

                    <div className="flex-1">
                        {/* Product name */}
                        <h1 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-50">{data.title}</h1>

                        <div className="flex items-end">
                            {/* Price */}
                            <div className="mt-2.5 flex gap-1.5 text-3xl">
                                <span className="font-bold text-zinc-300 line-through dark:text-zinc-500">{data.price}</span>
                                <span className="font-semibold text-zinc-800 dark:text-zinc-50">
                                    {data.priceAfterDiscount} <sub className="font-semibold">{t("price")}</sub>
                                </span>
                            </div>

                            {/* Quantity */}
                            <div className="px-3 text-sm font-medium">
                                <div
                                    className={`flex items-center gap-2 rounded-3xl px-3 py-1.5 ${
                                        data.quantity > 0
                                            ? "bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-50"
                                            : "bg-red-50 text-red-600 dark:bg-zinc-300"
                                    }`}
                                >
                                    <Package size={20} />
                                    {data.quantity > 0 ? `${data.quantity} ${t("left")}` : t("out")}
                                </div>
                            </div>
                        </div>

                        {/* Product rating */}
                        <div className="mt-8 flex items-center gap-1.5 border-y-1 border-zinc-100 py-4 dark:border-zinc-700">
                            <Star color="orange" size={20} fill="orange" />
                            <span className="text-base font-medium">
                                {t("rate")}:{" "}
                                {data.rateCount < 1 ? <span>{t("no-rate")}</span> : <span className="font-normal">{data.rateAvg}/5</span>}{" "}
                                <span className="font-normal text-blue-600">{`(${data.rateCount})`}</span>
                            </span>
                        </div>

                        {/* Product description */}
                        <div className="dark:text-zinc400 ttext-zinc-400 mt-8 h-72 w-full overflow-y-auto text-base">
                            <p>{data.description}</p>
                        </div>
                        <div className="mt-9 flex items-center justify-center gap-1.5">
                            <button
                                onClick={() => setLiked(!liked)}
                                className={`h-button flex w-12 items-center justify-center rounded-xl transition-colors ${
                                    liked ? "bg-zinc-800 text-zinc-50" : "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-50"
                                }`}
                            >
                                <span>
                                    <Heart
                                        size={20}
                                        className={`transition-all ${liked ? "fill-white stroke-white" : "stroke-gray-600"}`}
                                    />
                                </span>
                                <span className="">
                                    {liked ? (
                                        <Minus size={10} className="stroke-gray-500" />
                                    ) : (
                                        <Plus size={10} className="stroke-gray-500" />
                                    )}
                                </span>
                            </button>

                            {/* Add to cart button */}
                            <CartBtn productId={productId} numberProduct={data.quantity} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
