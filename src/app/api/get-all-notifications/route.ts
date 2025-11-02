import { AllNotificationsResponse } from "@lib/types/end-point-api/all-notifications";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || "6";
    const page = searchParams.get("page") || "1";

    try {
        // Fetch data from external API
        const token = await getToken({ req });

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        const res = await fetch(`${process.env.BASE_URL}notifications/user?limit=${limit}&page=${page}`, {
            method: "GET",
            headers,
            cache: "no-store",
        });

        const data: ApiResponse<AllNotificationsResponse> = await res.json();

        // If the call was not successful, throw an error
        if ("error" in data) {
            throw new Error(data.error || "Theres Something Wrong Please Try Agin");
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: `${err || "There's something wrong, please try again"}` }, { status: 500 });
    }
}
