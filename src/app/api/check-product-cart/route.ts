import { CartResponse } from "@app/[locale]/(home)/products/[productId]/_types/product-id";
import { JSON_HEADER } from "@lib/constants/shared.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Fetch data from external API
        const token = await getToken({ req });
        const headers: Record<string, string> = { ...JSON_HEADER };

        if (token) {
            headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        const res = await fetch(`${process.env.BASE_URL}${process.env.PRODUCT_CART}`, {
            method: "GET",
            headers,
            cache: "no-store",
        });

        const response: ApiResponse<CartResponse> = await res.json();

        // If the call was not successful, throw an error
        if ("error" in response) {
            return NextResponse.json(response, { status: 500 });
        }

        return NextResponse.json(response, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: `${err || "There's something wrong, please try again"}` }, { status: 500 });
    }
}
