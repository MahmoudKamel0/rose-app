"use server";

import { getDecodeToken } from "@lib/utils/get-decode-token";

export async function addProductAction(data: FormData) {
    const token = await getDecodeToken();

    try {
        const headers: Record<string, string> = {};

        if (token?.accessToken) {
            headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        const res = await fetch(`${process.env.BASE_URL!}products`, {
            method: "POST",
            headers,
            body: data,
        });

        if (!res.ok) {
            return { error: `Server error: ${res.statusText}` };
        }
        const response = await res.json();

        return response;
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Unknown error" };
    }
}
