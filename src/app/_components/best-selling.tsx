

import * as React from "react";
import { cn } from "@lib/utils/cn.utils";
import { Button } from "@/components/ui/button";
import { getBestSellingProducts } from "@lib/apis/best-selling.api";
import Subtitle from "@components/shared/subtitle";
import { ArrowRight } from "lucide-react";
import ProductCard from "@components/shared/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BtnPrimary from "@components/shared/btn-primary";


export default async function BestSellingSection() {
  const products = await getBestSellingProducts();

  return (
    <section>
      <div className={cn("mx-auto flex flex- md:flex-row items-start gap-8 px-4")}>
        {/* LEFT SIDE */}
        <div className={cn("md:w-1/4 space-y-4")}>
         {/* REUSABLE SUBTITLE */}
          <Subtitle text="Best Selling" />
           {/* HEADING */}
          <h2 className={cn("text-3xl font-bold text-maroon-700")}>
            <span className={cn("text-softpink-500")}>Check Out</span> What <br />
            Everyone’s <span className={cn("text-softpink-500")}>Buying</span> Right Now
          </h2>
           {/* DESCRIPTION */}
          <p className={cn("text-zinc-500 text-base")}>
            Not sure what to choose?<br />
            Start with our best sellers, these are the gifts our customers keep coming back for.
            Whether you're celebrating a birthday, anniversary or wedding, our top picks are guaranteed to leave a lasting impression. 
          </p>
        {/* REUSABLE BTN PRIMARY */}
         <BtnPrimary text="Explore Gifts " /> 
        </div>

        {/* RIGHT SIDE - EMBLA CAROUSEL */}
        <div className={cn("md:w-3/4 relative w-full")}>
          {Array.isArray(products) && products.length > 0 ? (
            <Carousel opts={{ align: "start", loop: true }} className={cn("w-full")}>
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem
                    key={product._id}
                    className={cn("basis-full sm:basis-1/2 lg:basis-1/3")}
                  >
          <ProductCard product={product} />

                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className={cn("absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full")}/>
              <CarouselNext className={cn("absolute -right-0.5 top-1/2 -translate-y-1/2 z-10 rounded-full bg-red-900")} />
            </Carousel>
          ) : (
            <p className="text-gray-500">No products available</p>
          )}
        </div>
      </div>
    </section>
  );
}
