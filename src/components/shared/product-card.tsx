"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CartBtn from "@app/[locale]/(home)/products/[productId]/_components/add-to-cart-button";
import { cn } from "@lib/utils/cn.util";
import { Eye, Heart, Star } from "lucide-react";
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
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
                    <button className="rounded-full bg-white p-3 text-maroon-600 transition hover:bg-maroon-600 hover:text-white">
                        <Heart className="h-5 w-5" strokeWidth={2} />
                    </button>
                    {/* Eye Icon */}
                    <button className="rounded-full bg-white p-3 text-maroon-600 transition hover:bg-maroon-600 hover:text-white">
                        <Eye className="h-5 w-5" strokeWidth={2} />
                    </button>
                </div>
                {/* HOT Badge */}
                {product.sold > 300 && (
                    <Badge className={cn("absolute right-2 top-2 rounded-full bg-maroon-50 px-2 py-0.5 text-xs uppercase text-maroon-600")}>
                        HOT
                    </Badge>
                )}
                {/* NEW Badge */}
                {product.sold < 20 && (
                    <Badge className={cn("absolute right-2 top-2 rounded-full bg-zinc-100 px-2 py-0.5 text-xs uppercase text-zinc-700")}>
                        NEW
                    </Badge>
                )}
                {/* OUT OF STOCK Badge */}
                {product.quantity < 1 && (
                    <Badge className={cn("absolute right-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-xs uppercase text-white")}>
                        OUT OF STOCK
                    </Badge>
                )}
            </div>
            <CardContent className={cn("space-y-1.5 px-0 py-5")}>
                {/* Product Title */}
                <h3 className={cn("line-clamp-1 text-lg font-semibold capitalize text-maroon-700 dark:text-[#FFC2D0]")}>{product.title}</h3>
                {/* Rating */}
                <div className="flex items-center justify-center">
                    <div className="flex flex-1 flex-col items-start justify-start gap-2">
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
                        <div className="flex items-center justify-center gap-4">
                            {/* Prices */}
                            <div className="flex items-center gap-2">
                                <p className="text-base font-medium text-maroon-700 dark:text-[#FFC2D0]">
                                    {product.priceAfterDiscount} EGP
                                </p>
                                {product.priceAfterDiscount < product.price && (
                                    <p className="text-base font-medium text-zinc-400 line-through">{product.price} EGP</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Add to Cart Button */}
                    <CartBtn productId={product._id} numberProduct={product.quantity} size="rounded-icon" isText={false} />
                </div>
            </CardContent>
        </Card>
    );
}
