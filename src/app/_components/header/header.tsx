"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
export default function Headers() {
    // Variable Carousel
    const [api, setApi] = useState<CarouselApi | undefined>(undefined);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        const onSelect = () => setCurrent(api.selectedScrollSnap());
        api.on("select", onSelect);
        return () => {
            try {
                api.off("select", onSelect);
            } catch {}
        };
    }, [api]);
    // Variable For Data
    const cardContent = [
        {
            tittle: "Special Gifts For The People You Love",
            img: "/images/leftCard.png",
            subTittle: "Staring from 10.99 EGP",
        },
    ];
    const cardCarousel = [
        {
            tittle: "Say It with Flowers",
            img: "/images/img4.png",
            subTittle: "Elegant gifts for every special moment.",
        },
        {
            tittle: "Say It with Flowers",
            img: "/images/img6.png",
            subTittle: "Elegant gifts for every special moment.",
        },
    ];

    return (
        <section className="mb-10 flex w-full items-center justify-center gap-5">
            {/* The Left Card */}
            <div className="relative h-[27.5rem] w-[18.9rem] overflow-hidden rounded-xl">
                <Image
                    src={cardContent[0].img}
                    alt={cardContent[0].subTittle}
                    width={410}
                    height={270}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 flex w-full flex-col justify-end overflow-hidden rounded-md border-0 bg-black/25 px-6 pb-5 text-white">
                    <div className="w-full">
                        <div className="mb-2 inline-flex items-center justify-center rounded-full bg-[#FBEAEA] px-2.5 py-1">
                            <span className="font-md text-sm text-[#A6252A]">
                                {/* SubTittle */}
                                {cardContent[0].subTittle}
                            </span>
                        </div>
                        <p className="mb-3 text-2xl leading-snug font-semibold text-white">
                            {/* Tittle */}
                            {cardContent[0].tittle}
                        </p>
                        {/* Buttons For Right and Left */}
                        <Button className="hover:bg-#FBEAEA bg-[##FBEAEA] text-[#A6252A]" asChild>
                            <Link href={"/products"}>
                                {" "}
                                Shop Now <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            {/*  Customize Carousel and The Left Card */}
            <div className="relative flex h-[27.5rem] w-[59.7rem] justify-center overflow-x-hidden">
                <Carousel setApi={setApi} opts={{ loop: true, align: "center" }} className="w-full max-w-[956px] overflow-x-hidden">
                    <CarouselContent className="!overflow-visible overflow-x-hidden">
                        {/* Mapping Array */}
                        {cardCarousel.map((item, idx) => (
                            <CarouselItem key={idx} className="flex h-[440px] w-[956px] items-center justify-center overflow-hidden">
                                <div className="relative h-[27.5rem] w-[59.5rem] gap-6 overflow-hidden rounded-xl">
                                    {/* Distract Image */}
                                    <Image
                                        src={item.img}
                                        alt={item.subTittle}
                                        width={955}
                                        height={440}
                                        className="h-full w-full rounded-xl object-cover object-center"
                                        priority
                                    />

                                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-r from-black/65 via-black/30 to-transparent px-6 pb-5 text-white">
                                        <div className="mb-5 px-2">
                                            {/* Distract Tittle */}
                                            <p className="text-4xl font-semibold text-white">{item.tittle}</p>
                                            <span className="text-sm text-white">
                                                {/* Distract SubTittle */}
                                                {item.subTittle}
                                            </span>
                                        </div>

                                        <div className="mt-5 flex justify-between">
                                            <Button className="h-9 w-32 bg-[#FBEAEA] text-[#A6252A] hover:bg-[#FBEAEA]" asChild>
                                                <Link href={"/products"}>I’m buying!</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                {/* Buttons Right and Left */}
                <div className="absolute right-6 bottom-0 flex -translate-y-1/2 flex-row-reverse items-center gap-3 rounded-full bg-[#FBEAEA] p-1">
                    <ChevronRight onClick={() => api?.scrollTo(current + 1)} className="text-#A6252A-600 h-7 w-7 cursor-pointer" />
                    <ChevronLeft onClick={() => api?.scrollTo(current - 1)} className="h-7 w-7 cursor-pointer text-gray-400" />
                </div>
            </div>
        </section>
    );
}
