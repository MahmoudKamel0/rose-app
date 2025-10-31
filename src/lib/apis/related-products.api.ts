import { RelatedProductsErrorResponse, RelatedProductsResponse, RelatedResponse } from "@lib/types/related-product";

/**
 * Fetch related products for a given product ID.
 * @param productId The ID of the product to fetch related items for.
 */
export async function fetchRelatedProducts(productId: string): Promise<RelatedResponse> {
    // Construct API URL
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/related/category/${productId}`;

    try {
        const res = await fetch(url, {
            next: { revalidate: 60 }, // cache for 60 seconds
            headers: {
                "Content-Type": "application/json",
            },
        });

        const payload = (await res.json()) as RelatedResponse;

        // Handle error responses
        if (!res.ok) {
            console.error("Failed to fetch related products:", payload);
            throw new Error((payload as RelatedProductsErrorResponse).error || `Error ${res.status}`);
        }

        // Return the related products data
        return payload as RelatedProductsResponse;
    } catch (error) {
        console.error("Error fetching related products:", error);
        throw error;
    }
}
