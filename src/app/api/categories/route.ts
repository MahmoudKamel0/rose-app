import { CategoriesResponse } from "@app/[locale]/products/_types/categories";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    try {
        const res = await fetch(`https://flower.elevateegy.com/api/v1/categories?page=${page}&limit=${limit}`, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
        }

        const data: CategoriesResponse = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "error", categories: [] }, { status: 500 });
    }
}
