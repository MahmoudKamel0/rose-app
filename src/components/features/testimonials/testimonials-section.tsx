import { fetchTestimonials } from "@lib/apis/testimonials.api";
import TestimonialsCarousel from "./testimonials-carousel";
import { cn } from "@lib/utils/cn.utils";
import Subtitle from "@components/shared/subtitle";
import HighlightedHeading from "@components/shared/highlighted-heading";
import { getTranslations } from "next-intl/server";

export default async function TestimonialsSection() {
    // Fetch translations
    const t = await getTranslations();
    // Fetch testimonials
    const data = await fetchTestimonials();
    const testimonials = data.testimonials;

    return (
        <section className={cn("flex flex-col gap-11")}>
            <div className={cn("flex flex-col items-center gap-2 p-4 text-center")}>
                <Subtitle text={t("testimonials-subtitle")} />
                <HighlightedHeading text={t("testimonials-heading")} highlightWidth="350px" borderWidth="150px" />
            </div>
            <TestimonialsCarousel testimonials={testimonials} />
        </section>
    );
}
