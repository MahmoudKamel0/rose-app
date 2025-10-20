import * as React from "react";
import { cn } from "@lib/utils/cn.utils";
import { getBestSellingProducts } from "@lib/apis/best-selling.api";
import Leftside from "./components/left-side-best-selling/left-side-best-selling";
import EmblaCarousel from "./components/right-side-best-selling/embla-carousel-best-selling";

export default async function BestSellingSection() {
    return (
        <section>
            <div className={cn("flex- mx-auto mb-34 flex items-start gap-8 px-4 md:flex-row")}>
                {/* LEFT SIDE */}
                <Leftside />

                {/* RIGHT SIDE - EMBLA CAROUSEL */}
                <EmblaCarousel productId="" fetchFn={getBestSellingProducts} productNumber={3} />
            </div>
        </section>
    );
}
