import { OccasionsResponse } from "@lib/types/dashboard/occasions";

export async function fetchOccasions(page: number = 1, limit: number = 10, search: string = ""): Promise<OccasionsResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });

    if (search.trim()) {
        params.append("search", search.trim());
    }

    const url = `${process.env.BASE_URL}/occasions?${params.toString()}`;

    const res = await fetch(url, {
        next: {
            tags: ["occasions"],
            revalidate: 60,
        },
        cache: "force-cache",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch occasions: ${res.status} ${res.statusText}`);
    }

    return res.json();
}
