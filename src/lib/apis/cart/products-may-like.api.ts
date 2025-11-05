import {
    RecommendationsErrorResponse,
    RecommendationsResponse,
    RecommendationsSuccessResponse,
} from "@lib/types/components/recommendations";
import { getDecodeToken } from "@lib/utils/get-decode-token";
import { revalidateTag } from "next/cache";

/**
 * Fetch recommended products for the currently authenticated user.
 */
export async function fetchRecommendations(): Promise<RecommendationsResponse> {
    try {
        // Decode token and extract user ID
        const token = await getDecodeToken();

        if (!token?.user?._id) {
            throw new Error("User ID not found in token");
        }

        const userId = token.user._id;
        const url = `${process.env.NEXT_PUBLIC_API_BASE}/related/recommendations/${userId}`;

        const res = await fetch(url, {
            next: { revalidate: 60 },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.accessToken}`,
            },
        });

        const payload = (await res.json()) as RecommendationsResponse;

        if (!res.ok) {
            console.error("Failed to fetch recommendations:", payload);
            throw new Error((payload as RecommendationsErrorResponse).error || `Error ${res.status}`);
        }

        // Revalidate cart data
        revalidateTag("cart-data");

        return payload as RecommendationsSuccessResponse;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
}
