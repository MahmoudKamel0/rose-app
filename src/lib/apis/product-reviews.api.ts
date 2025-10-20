import { ReviewsErrorResponse, ReviewsResponse } from "@lib/types/review-product";

/**
 * Fetch product reviews from the API.
 * @param productId The ID of the product to fetch reviews for.
 */
export async function fetchProductReviews(productId: string): Promise<ReviewsResponse> {
    // Construct the API URL
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/products/${productId}/reviews`;

    // Fetch the reviews
    try {
        const res = await fetch(url, {
            next: { revalidate: 60 },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });

        // Parse the response as JSON
        const payload = (await res.json()) as ReviewsResponse;

        // Check HTTP status
        if (!res.ok) {
            console.error("Failed to fetch reviews:", payload);
            throw new Error((payload as ReviewsErrorResponse).error || `Error ${res.status}`);
        }

        // Return the reviews payload
        return payload;
    } catch (error) {
        // Log and re-throw the error
        console.error("Error fetching product reviews:", error);

        // Rethrow the error
        throw error;
    }
}
