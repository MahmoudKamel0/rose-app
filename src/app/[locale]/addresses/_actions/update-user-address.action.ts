"use server";

import { AddressesResponse, AddressReq } from "@lib/types/end-point-api/addresses";
import { getDecodeToken } from "@lib/utils/get-decode-token";

export async function updateUserAddress({ address, address_id }: { address: AddressReq; address_id: string }) {
    try {
        const token = await getDecodeToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        const res = await fetch(`${process.env.BASE_URL}addresses/${address_id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(address),
        });

        const response: ApiResponse<AddressesResponse> = await res.json();

        return response;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return { Error: "Something went wrong" };
    }
}
