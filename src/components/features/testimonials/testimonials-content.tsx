import { fetchTestimonials } from "@lib/apis/testimonials.api";
import TestimonialsCarousel from "./testimonials-carousel";

export default async function TestimonialsContent() {
    // Fetch testimonials
    const data = await fetchTestimonials();
    const testimonials = data.testimonials;

    return <TestimonialsCarousel testimonials={testimonials} />;
}
