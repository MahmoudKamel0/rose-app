"use server";

import { JSON_HEADER } from "@lib/constants/shared.constant";
import { getDecodeToken } from "@lib/utils/get-decode-token";

export async function deleteProduct(id: string): Promise<{ ok: boolean; error?: string }> {
    const headers: Record<string, string> = { ...JSON_HEADER };

    const token = await getDecodeToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token.accessToken}`;
    }
    try {
        const res = await fetch(`${process.env.BASE_URL}/products/${id}`, {
            method: "DELETE",
            headers,
        });

        if (!res.ok) {
            // API real error
            let errorMessage = "Unknown error";
            try {
                const errJson = await res.json();
                errorMessage = errJson.message || JSON.stringify(errJson) || res.statusText;
            } catch {
                errorMessage = res.statusText;
            }

            return {
                ok: false,
                error: `Status ${res.status}: ${errorMessage}`,
            };
        }

        return { ok: true };
    } catch (err: any) {
        return { ok: false, error: err.message || "Unexpected error" };
    }
}
