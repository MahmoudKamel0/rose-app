"use server";

import { ApiResponse, CartErrorResponse, CartSuccessResponse } from "@lib/types/components/cart";
import { getDecodeToken } from "@lib/utils/get-decode-token";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.BASE_URL!;

/**
 * Reusable DELETE request function.
 */
async function deleteRequest<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        const payload = (await res.json()) as T | CartErrorResponse;

        revalidateTag("cart-data");

        return {
            ok: res.ok,
            status: res.status,
            payload,
        };
    } catch (error) {
        return {
            ok: false,
            status: 500,
            payload: {
                message: error instanceof Error ? error.message : "Unexpected error occurred",
            } as CartErrorResponse,
        };
    }
}

/**
 * Delete a single cart item by ID.
 */
export async function deleteCartItemAction(itemId: string): Promise<ApiResponse<CartSuccessResponse>> {
    if (!itemId || itemId.length !== 24) {
        return {
            ok: false,
            status: 400,
            payload: { message: '"id" length must be 24 characters long' },
        };
    }

    const token = await getDecodeToken();
    return deleteRequest<CartSuccessResponse>(`/cart/${itemId}`, token?.accessToken);
}

/**
 * Clear the entire cart.
 */
interface ClearCartResponse {
    message?: string;
}

export async function clearCartAction(): Promise<ApiResponse<ClearCartResponse>> {
    const token = await getDecodeToken();
    return deleteRequest<ClearCartResponse>("/cart", token?.accessToken);
}
