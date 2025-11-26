import { ApiError, StatisticsResponse } from "@lib/types/dashboard/product-statistics";
import { getDecodeToken } from "@lib/utils/get-decode-token";

/**
 * Fetch product statistics from the API.
 * Returns either `StatisticsResponse` on success or `ApiError` on failure.
 */
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZTA3YWY3ZmVlNjhhNGMyZWJhZmJhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjI0MjQzMDl9.0tYKHrz6liDX-0U_XLsrroB7ISnmChOip5evszIyiag`;

export async function getProductStatistics(): Promise<StatisticsResponse | ApiError> {
    // Decode user token if needed (currently not used)
    const decodedToken = await getDecodeToken();

    try {
        // Fetch product statistics from server
        const res = await fetch(`${process.env.BASE_URL}statistics/products`, {
            cache: "no-store", // always fetch fresh data
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${decodedToken?.accessToken}`, // Uncomment if using dynamic token
                Authorization: `Bearer ${token}`, // static token for testing
            },
        });

        const data = await res.json();

        // If API returns an error field, cast and return as ApiError
        if ("error" in data) return data as ApiError;

        // Otherwise, return as StatisticsResponse
        return data as StatisticsResponse;
    } catch (error) {
        // Handle network or fetch errors
        console.error("Network or fetch error:", error);
        return { error: "Network error" };
    }
}
