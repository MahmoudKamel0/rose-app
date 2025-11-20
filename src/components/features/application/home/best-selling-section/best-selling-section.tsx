import Leftside from "./components/left-side-best-selling/left-side-best-selling";
import EmblaCarousel from "./components/right-side-best-selling/embla-carousel-best-selling";
import { getBestSellingProducts } from "@lib/apis/best-selling.api";
import React from "react";

export default function BestSelling() {
    return (
        <section className="flex gap-10">
            <Leftside />
            <EmblaCarousel productId="" productNumber={3} fetchFn={getBestSellingProducts} />
        </section>
    );
}
