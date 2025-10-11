import HighlightedHeading from "@components/shared/highlighted-heading";
import Subtitle from "@components/shared/subtitle";
import { cn } from "@lib/utils/cn.utils";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import TestimonialsContent from "./testimonials-content";
import TestimonialsSkeleton from "@components/skeletons/testimonials-skeleton";

export default async function TestimonialsSection() {
    //  Translations
    const t = await getTranslations();

    return (
        <section className={cn("flex flex-col gap-11")}>
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
