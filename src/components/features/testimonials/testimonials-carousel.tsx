"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import TestimonialCard from "./testimonial-card";
import { Testimonial } from "@lib/types/testimonial";
import { cn } from "@lib/utils/cn.utils";

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
    //  Carousel settings
    const plugin = React.useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
        })
    );

    return (
        //  Main container
        <div className={cn("flex h-[35rem] items-center justify-center bg-rose-50 py-3 dark:bg-zinc-700")}>
            <div className={cn("container text-center")}>
                {/* Carousel */}
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        loop: true,
                        dragFree: true,
                    }}
                >
                    {/* Carousel content */}
                    <CarouselContent className={cn("py-20")}>
                        {testimonials.map((t) => (
                            // Carousel item
                            <CarouselItem key={t._id} className={cn("flex basis-1/3 justify-center pl-0")}>
                                {/* Testimonial card */}
                                <TestimonialCard testimonial={t} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
