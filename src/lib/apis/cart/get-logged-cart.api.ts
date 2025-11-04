import { CartErrorResponse, CartSuccessResponse } from "@lib/types/components/cart";
import { getDecodeToken } from "@lib/utils/get-decode-token";

// Fetch cart data
interface FetchCartResponse {
    ok: boolean;
    status: number;
    payload: CartSuccessResponse | CartErrorResponse;
}

export async function fetchCartData(): Promise<FetchCartResponse> {
    // Get user's token from cookies
    const token = await getDecodeToken();

    // Send GET request to API
    const url = `${process.env.BASE_URL}/cart`;

    // Parse response
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.accessToken}`,
            },
            cache: "no-store",
        });

        // Parse response
        const payload = (await res.json()) as CartSuccessResponse | CartErrorResponse;

        // Check if the request was successful
        return {
            ok: res.ok,
            status: res.status,
            payload,
        };
    } catch (error) {
        // Log and re-throw the error
        console.error("Error fetching cart data:", error);

        // Return error response
        return {
            ok: false,
            status: 500,
            payload: {
                error: error instanceof Error ? error.message : "Unknown error",
            },
        };
    }
}
