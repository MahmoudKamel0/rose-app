import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// API route to get authentication token
export async function GET(req: NextRequest) {
    try {
        // Get cookies and convert them to plain object
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // Handle missing token
        if (!token?.accessToken) {
            return NextResponse.json({ accessToken: null }, { status: 401 });
        }

        // Return the access token
        return NextResponse.json({ accessToken: token.accessToken });
    } catch (error) {
        // Handle error
        console.error("Error fetching token:", error);

        // Return server error response
        return NextResponse.json({ accessToken: null }, { status: 500 });
    }
}
