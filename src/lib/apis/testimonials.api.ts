import { TestimonialsResponse } from "@lib/types/testimonial";

{
    /* Fetches testimonials from the API */
}
export async function fetchTestimonials(): Promise<TestimonialsResponse> {
    // Fetches testimonials from the API
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/testimonials`, {
            next: { revalidate: 60 },
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Check if the request was successful
        if (!res.ok) {
            throw new Error(`Failed to fetch testimonials: ${res.status}`);
        }

        // Parse the response as JSON
        const payload = (await res.json()) as TestimonialsResponse;
        return payload;
    } catch (error) {
        // Log and re-throw the error
        console.error("Error fetching testimonials:", error);
        throw error;
    }
}
