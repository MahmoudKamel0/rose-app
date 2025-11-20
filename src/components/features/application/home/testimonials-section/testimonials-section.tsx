import TestimonialsContent from "./testimonials-content";
import HighlightedHeading from "@components/shared/highlighted-heading";
import Subtitle from "@components/shared/subtitle";
import TestimonialsSkeleton from "@components/skeletons/testimonials-section/testimonials-skeleton";
import { cn } from "@lib/utils/cn.util";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function TestimonialsSection() {
    //  Translations
    const t = await getTranslations("testimonials");

    return (
        <section className={cn("mt-32 flex flex-col gap-11 py-2.5")}>
            <div className={cn("flex flex-col items-center gap-2 p-4 text-center")}>
                {/* Subtitle and highlighted heading */}
                <Subtitle text={t("testimonials-subtitle")} />
                <HighlightedHeading text={t("testimonials-heading")} highlightWidth="350px" borderWidth="150px" />
            </div>

            {/* Wrap the fetching component inside Suspense */}
            <Suspense fallback={<TestimonialsSkeleton />}>
                <TestimonialsContent />
            </Suspense>
        </section>
    );
}
