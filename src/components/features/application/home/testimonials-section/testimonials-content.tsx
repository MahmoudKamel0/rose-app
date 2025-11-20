import TestimonialsCarousel from "./testimonials-carousel";
import { fetchTestimonials } from "@lib/apis/testimonials.api";

export default async function TestimonialsContent() {
    // Fetch testimonials
    const data = await fetchTestimonials();
    const testimonials = data.testimonials;

    return <TestimonialsCarousel testimonials={testimonials} />;
}
