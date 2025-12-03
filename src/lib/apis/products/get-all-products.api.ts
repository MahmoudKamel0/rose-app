"use server";

import { searchParams } from "@lib/types/product-dashboard";
import { ProductsApiResponse } from "@lib/types/products";
import { getAuthHeaders } from "@lib/utils/get-auth-headers.util";

/**
 * Fetches all products from the API.
 *
 * @returns A promise resolving to the list of products.
 * @throws Will throw an error if the API request fails.
 */

export async function getAllProducts(searchParams: searchParams): Promise<ApiResponse<ProductsApiResponse>> {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(
            `${process.env.BASE_URL}/products?page=${searchParams.page}&limit=12&keyword=${searchParams.keyword || ""}`,
            {
                headers,
                next: { revalidate: 60 * 10 }, // update every 10 minutes
            }
        );

        if (!response.ok) return { error: "Failed to fetch products" };
        const payload = await response.json();

        // Check validate response
        // return productsResponseSchema.parse(payload);
        return payload;
    } catch {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return { error: "Something went wrong while loading products. Please try again later." };
    }
}
