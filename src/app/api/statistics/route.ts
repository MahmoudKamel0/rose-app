import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { StatisticsAPIResponse, StatisticsErrorResponse, StatisticsResponse } from "@lib/types/dashboard/orders-status";

export async function GET(req: NextRequest) {
    try {
        // Read and decode the JWT stored in the HttpOnly cookie using NextAuth
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // If no valid token is found, block the request
        if (!token?.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Construct the target API URL
        const url = `${process.env.NEXT_PUBLIC_API_BASE}/statistics`;

        // Forward the request to the external API with the user's access token
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.accessToken}`,
            },
            // Optional cache configuration
            next: { revalidate: 60 },
        });

        // Parse the received JSON response
        const payload = (await res.json()) as StatisticsAPIResponse;

        // Handle non-success responses from the external API
        if (!res.ok) {
            return NextResponse.json(payload as StatisticsErrorResponse, { status: res.status });
        }

        // Successful response: return data to the client
        return NextResponse.json(payload as StatisticsResponse);
    } catch (error) {
        // Fallback error handler for unexpected failures
        console.error("Route Handler Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
