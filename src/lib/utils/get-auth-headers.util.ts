import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { JSON_HEADER } from "@lib/constants/shared.constant";


/**
 * Retrieves authentication headers to be used with API requests.
 *
 * Uses the NextAuth JWT token from cookies to generate an Authorization header.
 * The token is retrieved by calling `getToken` from "next-auth/jwt", using the
 * current cookies and the NEXTAUTH_SECRET environment variable.
 *
 * @returns {Promise<Record<string, string>>} An object containing the Content-Type and Authorization headers.
 */

export async function getAuthHeaders(): Promise<Record<string, string>> {
    const token = await getToken({
        req: {
            headers: {
                cookie: cookies().toString()
            }
        } as unknown as NextRequest,
        secret: process.env.NEXTAUTH_SECRET
    });

    return {
        ...JSON_HEADER,
        Authorization: `Bearer ${token?.accessToken}` || "",
    };
}

