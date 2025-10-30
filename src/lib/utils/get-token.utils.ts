import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

/**
 * GetCookieDiagnostic: retrieves and decodes the accessToken from the NextAuth session cookie
 */
export async function GetCookieDiagnostic() {
    const raw = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;

    if (!raw) {
        return null;
    }

    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
        return null;
    }

    try {
        const verified: any = jwt.verify(raw, secret);
        return verified?.accessToken || null;
    } catch {
        try {
            const decoded: any = jwt.decode(raw, { json: true });
            return decoded?.accessToken || null;
        } catch {
            return null;
        }
    }
}
