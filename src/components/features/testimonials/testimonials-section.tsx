import { Suspense } from "react";
import TestimonialsSkeleton from "./testimonials-skeleton";
import TestimonialsContent from "./testimonials-content";

export default function TestimonialsSection() {
    return (
        // Suspense fallback
        <Suspense fallback={<TestimonialsSkeleton />}>
            {/* Testimonials content */}
            <TestimonialsContent />
        </Suspense>
    );
}
