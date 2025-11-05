"use server";

import { getDecodeToken } from "@lib/utils/get-decode-token";
import { CartRequest, CartResponse } from "../_types/product-id";
import { JSON_HEADER } from "@lib/constants/shared.constant";
import { revalidateTag } from "next/cache";

export async function addToCart(data: CartRequest) {
    const headers: Record<string, string> = { ...JSON_HEADER };

    const token = await getDecodeToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token.accessToken}`;
    }

    const res = await fetch(`${process.env.BASE_URL!}cart`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers,
    });
    const response: ApiResponse<CartResponse> = await res.json();

    // Revalidate cart data
    revalidateTag("cart-data");

    return response;
}
