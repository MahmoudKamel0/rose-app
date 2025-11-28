"use server";

import { ApiResponse, ApiErrorResponse } from "@/lib/types/dashboard/occasions";
import { getDecodeToken } from "@/lib/utils/get-decode-token";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createOccasion<T>(formData: FormData): Promise<ApiResponse<T>> {
    const token = await getDecodeToken();

    try {
        const res = await fetch(`${process.env.BASE_URL}/occasions`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token?.accessToken}`,
            },
            body: formData,
            cache: "no-store",
        });

        const contentType = res.headers.get("content-type");
        let payload;

        if (contentType && contentType.includes("application/json")) {
            payload = await res.json();
        } else {
            const text = await res.text();
            payload = { error: text || "Invalid response from server" };
        }

        if (res.ok) {
            revalidateTag("occasions");
            revalidatePath("/occasions");
        }

        return {
            ok: res.ok,
            status: res.status,
            payload: payload as T | ApiErrorResponse,
        };
    } catch (error) {
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
