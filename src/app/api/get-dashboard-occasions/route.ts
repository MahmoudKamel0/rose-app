import { JSON_HEADER } from "@lib/constants/shared.constant";
import { OccasionsResponse } from "@lib/types/end-point-api/occasions";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });

    const headers: Record<string, string> = { ...JSON_HEADER };

    if (token?.accessToken) {
        headers["Authorization"] = `Bearer ${token.accessToken}`;
    }

    try {
        const res = await fetch(`${process.env.BASE_URL}occasions/`, {
            method: "GET",
            headers,
        });

        if (!res.ok) return { error: "Something went wrong" };

        const response: ApiResponse<OccasionsResponse> = await res.json();
        if ("error" in response) {
            return { error: "Something went wrong" };
        }

        return NextResponse.json(response);
    } catch {
        return { error: "Something went wrong" };
    }
}
