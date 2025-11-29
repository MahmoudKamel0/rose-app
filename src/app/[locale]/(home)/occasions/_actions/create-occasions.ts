"use server";

import { ApiResponse, ApiErrorResponse } from "@/lib/types/dashboard/occasions";
import { getDecodeToken } from "@/lib/utils/get-decode-token";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createOccasion<T>(formData: FormData): Promise<ApiResponse<T>> {
    // Get decoded token for authorization
    const token = await getDecodeToken();

    // Make POST request to create occasion
    try {
        const res = await fetch(`${process.env.BASE_URL}/occasions`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token?.accessToken}`,
            },
            body: formData,
            cache: "no-store",
        });

        // Determine content type and parse accordingly
        const contentType = res.headers.get("content-type");
        let payload;

        // If content type is JSON, parse response
        if (contentType && contentType.includes("application/json")) {
            payload = await res.json();
        } else {
            const text = await res.text();
            payload = { error: text || "Invalid response from server" };
        }

        // If creation was successful, revalidate relevant paths and tags
        if (res.ok) {
            revalidateTag("occasions");
            revalidatePath("/occasions");
        }

        // Return structured API response
        return {
            ok: res.ok,
            status: res.status,
            payload: payload as T | ApiErrorResponse,
        };
    } catch (error) {
        // Log error for debugging
        console.error("Create occasion error:", error);
        return {
            ok: false,
            status: 500,
            payload: {
                error: error instanceof Error ? error.message : "Unexpected error occurred",
            },
        };
    }
}
