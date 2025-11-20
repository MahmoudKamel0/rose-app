import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

/**
 * GetCookieDiagnostic: retrieves and decodes the accessToken from the NextAuth session cookie
 */
export async function getToken() {
    // get cookie
    const raw = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;

    // if cookie is not found
    if (!raw) {
        return null;
    }

    // get secret
    const secret = process.env.NEXTAUTH_SECRET;

    // if secret is not found
    if (!secret) {
        return null;
    }

    // decode cookie
    try {
        // verify cookie
        const verified: any = jwt.verify(raw, secret);

        // return access token
        return verified?.accessToken || null;
    } catch {
        // decode cookie
        try {
            // decode cookie
            const decoded: any = jwt.decode(raw, { json: true });
            // return access token
            return decoded?.accessToken || null;
        } catch {
            return null;
        }
    }
}
