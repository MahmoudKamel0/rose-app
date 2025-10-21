import { JSON_HEADER } from "@lib/constants/shared.constant";
import { ProductResponse } from "@lib/types/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Fetch data from external API
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");

        // const res = await fetch(`${process.env.BASE_URL}${process.env.ALL_NOTIFICATION_URL}/673e1cd711599201718280fb`, {
        const res = await fetch(`https://flower.elevateegy.com/api/v1/products/${productId}`, {
            method: "GET",
            headers: JSON_HEADER,
        });

        const data: ApiResponse<ProductResponse> = await res.json();

        // If the call was not successful, throw an error
        if ("error" in data) {
            return data;
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: `${err || "There's something wrong, please try again"}` }, { status: 500 });
    }
}
