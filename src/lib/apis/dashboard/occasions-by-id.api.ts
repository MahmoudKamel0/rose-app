import { getDecodeToken } from "@/lib/utils/get-decode-token";
import { FetchOccasionByIdResponse } from "@lib/types/dashboard/occasions";

export async function fetchOccasionById(id: string): Promise<FetchOccasionByIdResponse | null> {
    const token = await getDecodeToken();

    try {
        const res = await fetch(`${process.env.BASE_URL}/occasions/${id}`, {
            headers: {
                Authorization: `Bearer ${token?.accessToken}`,
            },
            cache: "no-store",
        });

        if (!res.ok) return null;

        const data = (await res.json()) as FetchOccasionByIdResponse | { error: string };

        if ("occasion" in data) return data as FetchOccasionByIdResponse;

        return null;
    } catch (error) {
        return null;
    }
}
