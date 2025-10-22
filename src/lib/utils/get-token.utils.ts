import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function GetToken() {
    // Fetch token using next-auth's getToken utility
    try {
        const token = await getToken({
            req: { cookies: cookies() } as any,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // Check if token and accessToken exist
        if (!token?.accessToken) {
            console.warn("No access token found in JWT.");
            return null;
        }

        // Return the access token
        return token.accessToken;
    } catch (error: any) {
        console.error("Error while fetching token in Server Component:", error?.message || error);
        return null;
    }
}
