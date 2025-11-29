import { JSON_HEADER } from "@lib/constants/shared.constant";
import { AddressesResponse } from "@lib/types/end-point-api/addresses";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req });

        const headers: Record<string, string> = { ...JSON_HEADER };

        if (token) {
            headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        const res = await fetch(`${process.env.BASE_URL}addresses`, {
            method: "GET",
            headers,
        });

        const response: ApiResponse<AddressesResponse> = await res.json();

        if (response == null || (res.status >= 400 && res.status < 600)) {
            return NextResponse.json(response ?? { error: "Failed to fetch addresses" }, { status: res.status || 500 });
        }
        if ("error" in response) {
            return NextResponse.json({ error: `${"There's something wrong, please try again"}` }, { status: 500 });
        }
        return NextResponse.json(response.addresses, { status: 200 });
    } catch {
        return NextResponse.json({ error: `${"There's something wrong, please try again"}` }, { status: 500 });
    }
}
