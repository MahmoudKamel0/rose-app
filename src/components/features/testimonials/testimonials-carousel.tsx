"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import TestimonialCard from "./testimonial-card";
import { Testimonial } from "@lib/types/testimonial";

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
    //  Carousel settings
    const plugin = React.useRef(
        Autoplay({
            delay: 2500,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
        })
    );

    return (
        //  Main container: Background color changes in dark mode
        <div className="flex h-[35rem] items-center justify-center bg-rose-50 py-3 dark:bg-zinc-700">
            <div className="container text-center">
                {/* Carousel */}
                <Carousel plugins={[plugin.current]} opts={{ loop: true }}>
                    {/* Carousel content */}
                    <CarouselContent className="py-20">
                        {testimonials.map((t) => (
                            //  Carousel item
                            <CarouselItem key={t._id} className="flex basis-1/3 justify-center pl-0">
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
