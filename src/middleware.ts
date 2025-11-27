import { routing } from "@i18n/routing";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);
const PROTECTED_ROUTES = ["/wishlist", "/checkout", "/profile", "/dashboard", "/dashboard/(.*)"];

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Extract locale
    const locale = pathname.split("/")[1] || routing.defaultLocale;
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Check authentication
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthPage = PROTECTED_ROUTES.includes(pathWithoutLocale);

    // Unauthenticated user on non-auth page → redirect to login
    if (!token && isAuthPage) {
        const loginUrl = new URL(`/${locale}/login`, req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)", "/"],
};
