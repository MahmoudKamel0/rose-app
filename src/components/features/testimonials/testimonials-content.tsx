import HighlightedHeading from "@components/shared/highlighted-heading";
import Subtitle from "@components/shared/subtitle";
import { fetchTestimonials } from "@lib/apis/testimonials.api";
import { cn } from "@lib/utils/cn.utils";
import { getTranslations } from "next-intl/server";
import TestimonialsCarousel from "./testimonials-carousel";

export default async function TestimonialsContent() {
    //  Translations
    const t = await getTranslations();
    //  Testimonials data fetch
    const data = await fetchTestimonials();
    const testimonials = data.testimonials;

    return (
        <section className={cn("flex flex-col gap-11")}>
            <div className={cn("flex flex-col items-center gap-2 p-4 text-center")}>
                {/* Subtitle and highlighted heading */}
                <Subtitle text={t("testimonials-subtitle")} />
                {/* Subtitle and highlighted heading */}
                <HighlightedHeading text={t("testimonials-heading")} highlightWidth="350px" borderWidth="150px" />
            </div>
            {/* Testimonials carousel */}
            <TestimonialsCarousel testimonials={testimonials} />
        </section>
    );
}
