import * as React from "react";
import Image from "next/image";
import { cn } from "@lib/utils/cn.utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getBestSellingProducts } from "@lib/apis/best-selling.api";

export default async function BestSellingSection() {
  const products = await getBestSellingProducts();

  return (
    <section className={cn("w-full py-10 bg-white")}>
      <div className={cn("max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8 px-4")}>
        {/* LEFT SIDE */}
        <div className={cn("md:w-1/3 space-y-4")}>
          <h4 className={cn("text-pink-600 font-semibold tracking-wide uppercase")}>
            Best Selling
          </h4>
          <h2 className={cn("text-3xl font-bold leading-snug text-gray-900")}>
            Check Out What <br />
            Everyone’s <span className={cn("text-pink-600")}>Buying</span> Right Now
          </h2>
          <p className={cn("text-gray-600 text-sm")}>
            Not sure what to choose? Start with our best sellers — these are the
            gifts our customers keep coming back for.
          </p>
          <Button className={cn("bg-pink-600 hover:bg-pink-700 text-white")}>
            Explore gifts →
          </Button>
        </div>

        {/* RIGHT SIDE - EMBLA CAROUSEL */}
        <div className={cn("md:w-2/3")}>
          {Array.isArray(products) && products.length > 0 ? (
            <Carousel opts={{ align: "start", loop: true }} className={cn("w-full")}>
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem
                    key={product._id}
                    className={cn("basis-full sm:basis-1/2 lg:basis-1/3")}
                  >
                    <Card className={cn("rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200")}>
                      <div className={cn("relative")}>
                        <Image
                          src={product.imgCover || "/images/placeholder.jpg"}
                          alt={product.title}
                          width={400}
                          height={300}
                          className={cn("object-cover w-full h-56")}
                        />

                        {/* HOT Badge */}
                        {product.sold > 300 && (
                          <Badge className={cn("absolute top-2 right-2 bg-pink-600 text-white text-xs")}>
                            HOT
                          </Badge>
                        )}

                                                {/* NEW Badge */}
                        {product.sold < 20 && (
                          <Badge className={cn("absolute top-2 right-2 bg-pink-600 text-white text-xs")}>
                            NEW
                          </Badge>
                        )}

                        {/* OUT OF STOCK Badge */}
                        {product.quantity < 1 && (
                          <Badge className={cn("absolute top-2 left-2 bg-gray-700 text-white text-xs")}>
                            OUT OF STOCK
                          </Badge>
                        )}
                      </div>

                      <CardContent className={cn("p-4 space-y-3")}>
                        {/* Product Title */}
                        <h3 className={cn("font-semibold text-gray-900 text-base line-clamp-2")}>
                          {product.title}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>{i < product.rateAvg ? "⭐️" : "☆"}</span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className={cn("text-gray-500 text-sm line-clamp-2")}>
                          {product.description}
                        </p>

                        {/* Prices */}
                        <div className={cn("flex items-center gap-2")}>
                          <p className={cn("font-bold text-pink-600")}>
                            {product.priceAfterDiscount} EGP
                          </p>
                          {product.priceAfterDiscount < product.price && (
                            <p className={cn("line-through text-gray-400 text-sm")}>
                              {product.price} EGP
                            </p>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <div className="flex justify-end">
                          <Button
                            size="icon"
                            className={cn(
                              "rounded-full w-9 h-9",
                              product.quantity < 1
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-pink-600 hover:bg-pink-700"
                            )}
                            disabled={product.quantity < 1}
                          >
                            🛒
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <p className="text-gray-500">No products available</p>
          )}
        </div>
      </div>
    </section>
  );
}
