import { productsResponseSchema } from "@lib/schemas/products";
import { ProductSchema } from "@lib/types/end-point-api/products";
import { getAuthHeaders } from "@lib/utils/get-auth-headers.util";

/**
 * Fetches all products from the API.
 *
 * @returns A promise resolving to the list of products.
 * @throws Will throw an error if the API request fails.
 */

export interface searchParams {
    page?: string,
    limit?: number,
    rating?: number,
    keyword?: string;
};

export async function getAllProducts(searchParams: searchParams): Promise<ProductSchema> {
    "use server";
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${process.env.BASE_URL}/products?page=${searchParams.page}&limit=12&keyword=${searchParams.keyword || ""}`,
      {

            headers,
            next: { revalidate: 60 * 10 } // update every 10 minutes
        });

        if (!response.ok) throw new Error("Failed to fetch products");
        const payload = await response.json();

        // Check validate response 
        return productsResponseSchema.parse(payload);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
catch (error: any) {       
    console.error("REAL ERROR ⇒", error);
    throw new Error("Something went wrong while loading products. Please try again later.");
}
}