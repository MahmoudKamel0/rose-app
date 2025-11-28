"use server";

import { ApiResponse, ApiErrorResponse } from "@lib/types/dashboard/occasions";
import { getDecodeToken } from "@lib/utils/get-decode-token";
import { revalidateTag } from "next/cache";

export async function deleteRequest<T>(endpoint: string): Promise<ApiResponse<T>> {
    const token = await getDecodeToken();

    try {
        const res = await fetch(`${process.env.BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.accessToken}`,
            },
            cache: "no-store",
        });

        const payload = (await res.json()) as T | ApiErrorResponse;

        revalidateTag("occasions");

        return {
            ok: res.ok,
            status: res.status,
            payload,
        };
    } catch (error) {
        return {
            ok: false,
            status: 500,
            payload: {
                error: error instanceof Error ? error.message : "Unexpected error occurred",
            },
        };
    }
}
