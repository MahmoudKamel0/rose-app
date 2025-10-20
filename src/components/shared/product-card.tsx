"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@lib/utils/cn.utils";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product }) {
    if (!product) return null;

    return (
        <Card className={cn("overflow-hidden border-none shadow-none transition-all duration-200")}>
            <div className={cn("group relative")}>
                <Image
                    src={product.imgCover || "/images/placeholder.jpg"}
                    alt={product.title}
                    width={302}
                    height={272}
                    className={cn("h-64 w-full rounded-xl object-cover")}
                />
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 rounded-xl bg-[#E6507380] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {/* Heart Icon */}
                    <button className="text-maroon-600 hover:bg-maroon-600 rounded-full bg-white p-3 transition hover:text-white">
                        <Heart className="h-5 w-5" strokeWidth={2} />
                    </button>

                    {/* Eye Icon */}
                    <button className="text-maroon-600 hover:bg-maroon-600 rounded-full bg-white p-3 transition hover:text-white">
                        <Eye className="h-5 w-5" strokeWidth={2} />
                    </button>
                </div>
                {/* HOT Badge */}
                {product.sold > 300 && (
                    <Badge className={cn("bg-maroon-50 text-maroon-600 absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs uppercase")}>
                        HOT
                    </Badge>
                )}

                {/* NEW Badge */}
                {product.sold < 20 && (
                    <Badge className={cn("absolute top-2 right-2 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 uppercase")}>
                        NEW
                    </Badge>
                )}

                {/* OUT OF STOCK Badge */}
                {product.quantity < 1 && (
                    <Badge className={cn("absolute top-2 right-2 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white uppercase")}>
                        OUT OF STOCK
                    </Badge>
                )}
            </div>

            <CardContent className={cn("space-y-1.5 px-0 py-5")}>
                {/* Product Title */}
                <h3 className={cn("text-maroon-700 line-clamp-1 text-lg font-semibold capitalize dark:text-[#FFC2D0]")}>{product.title}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                            {i < product.rateAvg ? (
                                <Star className="h-4 w-4" fill="#FBA707" strokeWidth={0} />
                            ) : (
                                <Star className="h-4 w-4" color="#FBA707" strokeWidth={1} />
                            )}
                        </span>
                    ))}
                </div>

                {/* Prices + Add to cart*/}
                <div className="flex items-center justify-between">
                    {/* Prices */}
                    <div className="flex items-center gap-2">
                        <p className="text-maroon-700 text-base font-medium dark:text-[#FFC2D0]">{product.priceAfterDiscount} EGP</p>
                        {product.priceAfterDiscount < product.price && (
                            <p className="text-base font-medium text-zinc-400 line-through">{product.price} EGP</p>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        size="icon"
                        className={cn("bg-maroon-600 flex h-10 w-10 items-center justify-center rounded-full leading-none text-white")}
                    >
                        <ShoppingCart
                            className="inline-block !stroke-amber-50 align-middle"
                            style={{ width: 24, height: 24 }}
                            color="#ffffff"
                            strokeWidth={1}
                        />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
