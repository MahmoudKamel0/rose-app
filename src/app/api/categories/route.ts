
import { CategoriesResponse } from "@app/[locale]/(home)/products/_types/categories";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // Parse URL to get query parameters
    const { searchParams } = new URL(req.url);
    // Default values if parameters are not provided
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    try {
        // Fetch categories from the external API
        const res = await fetch(`https://flower.elevateegy.com/api/v1/categories?page=${page}&limit=${limit}`, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        // Handle non-OK responses
        if (!res.ok) {
            return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
        }

        // Parse and return the JSON response
        const data: CategoriesResponse = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        // Handle fetch errors

        return NextResponse.json({ message: "error", categories: [] }, { status: 500 });
    }
}
