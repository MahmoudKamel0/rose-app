"use server";

import { getToken } from "next-auth/jwt";

export async function getAccessToken() {
    const token = await getToken({
        req: (await import("next/headers").then((m) => ({ cookies: m.cookies() }))) as any,
        secret: process.env.NEXTAUTH_SECRET,
    });

    return token?.accessToken || null;
}
