"use server";

import { ApiResponse, CartErrorResponse } from "@lib/types/components/cart";
import { getDecodeToken } from "@lib/utils/get-decode-token";
import { revalidateTag } from "next/cache";

interface ClearCartResponse {
    message?: string;
}

export async function clearCartAction(): Promise<ApiResponse<ClearCartResponse>> {
    const token = await getDecodeToken();
    const url = `${process.env.BASE_URL}/cart`;

    try {
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.accessToken}`,
            },
            cache: "no-store",
        });

        const payload = (await res.json()) as ClearCartResponse | CartErrorResponse;

        // Revalidate cart data
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
                error: error instanceof Error ? error.message : "Failed to clear cart",
            },
        };
    }
}
