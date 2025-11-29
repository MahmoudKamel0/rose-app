"use server";

import { ApiResponse, ApiErrorResponse } from "@lib/types/dashboard/occasions";
import { getDecodeToken } from "@lib/utils/get-decode-token";
import { revalidateTag } from "next/cache";

export async function deleteRequest<T>(endpoint: string): Promise<ApiResponse<T>> {
    // Get decoded token for authorization
    const token = await getDecodeToken();

    // Make DELETE request to delete occasion
    try {
        const res = await fetch(`${process.env.BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.accessToken}`,
            },
            cache: "no-store",
        });

        // Parse JSON payload from response
        const payload = (await res.json()) as T | ApiErrorResponse;

        // If deletion was successful, revalidate relevant tags
        revalidateTag("occasions");

        // Return structured API response
        return {
            ok: res.ok,
            status: res.status,
            payload,
        };
    } catch (error) {
        // Return error response in case of failure
        return {
            ok: false,
            status: 500,
            payload: {
                error: error instanceof Error ? error.message : "Unexpected error occurred",
            },
        };
    }
}
