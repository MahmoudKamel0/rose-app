"use server";

import { CartErrorResponse, CartSuccessResponse } from "@lib/types/components/cart";
import { getDecodeToken } from "@lib/utils/get-decode-token";
import { revalidateTag } from "next/cache";

// Delete cart item
export async function deleteCartItemAction(itemId: string): Promise<CartSuccessResponse | CartErrorResponse> {
    // Validate input
    if (!itemId || itemId.length !== 24) {
        return { message: '"id" length must be 24 characters long' };
    }

    // Delete cart item
    try {
        // Get user's token from cookies
        const token = await getDecodeToken();

        // Send DELETE request to API
        const url = `${process.env.BASE_URL}/cart/${itemId}`;

        // Parse response
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.accessToken}`,
            },
        });

        // Parse response
        const data = await res.json();

        // Check if the request was successful
        if (!res.ok) {
            return { message: data.message || "Failed to remove item" };
        }

        // Revalidate cart data
        revalidateTag("cart-data");

        // Return data
        return data as CartSuccessResponse;
    } catch (error: any) {
        // Log and re-throw the error
        return { message: error.message || "Unexpected error occurred" };
    }
}
