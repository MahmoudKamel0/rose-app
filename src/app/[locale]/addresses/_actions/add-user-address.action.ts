"use server";

import { AddressesResponse, AddressReq } from "@lib/types/end-point-api/addresses";
import { getDecodeToken } from "@lib/utils/get-decode-token";

export async function addUserAddress(address: AddressReq) {
    try {
        const token = await getDecodeToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).
        if (token) {
            headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        const res = await fetch(`${process.env.BASE_URL}addresses`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(address),
        });

        const response: ApiResponse<AddressesResponse> = await res.json();

        return response;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}
