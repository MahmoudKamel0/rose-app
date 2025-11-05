"use server";

import { getDecodeToken } from "@lib/utils/get-decode-token";
import { CartErrorResponse, CartSuccessResponse } from "@lib/types/components/cart";
import { revalidateTag } from "next/cache";

export async function updateCartItemAction(
    productId: string,
    quantity: number
): Promise<{ ok: boolean; payload: CartSuccessResponse | CartErrorResponse }> {
    try {
        const token = await getDecodeToken();

        const res = await fetch(`${process.env.BASE_URL}/cart/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.accessToken}`,
            },
            body: JSON.stringify({ quantity }),
        });

        const data = await res.json();

        // Revalidate cart data
        revalidateTag("cart-data");

        return {
            ok: res.ok,
            payload: data,
        };
    } catch (error: any) {
        return {
            ok: false,
            payload: { message: error || "Unexpected error occurred" },
        };
    }
}
