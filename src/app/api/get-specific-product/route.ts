import { JSON_HEADER } from "@lib/constants/shared.constant";
import { ProductResponse } from "@lib/types/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Fetch data from external API
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const res = await fetch(`${process.env.BASE_URL}products/${productId}`, {
        method: "GET",
        headers: JSON_HEADER,
    });

    const data: ApiResponse<ProductResponse> = await res.json();

    // If the call was not successful, throw an error

    return NextResponse.json(data, { status: 200 });
}
