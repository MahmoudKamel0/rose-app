import { OrdersResponse } from "@lib/types/end-point-api/orders";
import { getDecodeToken } from "@lib/utils/get-decode-token";

export async function getOrders(): Promise<OrdersResponse> {
    try {
        const decodedToken = await getDecodeToken();

        // If no token or decode failed
        if (!decodedToken) {
            throw new Error("No valid authentication token found");
        }
        const res = await fetch(`${process.env.BASE_URL}orders`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${decodedToken.accessToken}`,
            },
        });

        if (!res.ok) {
            // HTTP error
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: OrdersResponse = await res.json();
        return data;
    } catch (error) {
        // Handle network errors or JSON parse errors
        console.error("Failed to fetch orders:", error);
        throw new Error("Failed to fetch orders. Please try again later.");
    }
}
