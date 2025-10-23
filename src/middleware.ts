import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const UNPROTECTED_ROUTES = ["/login", "/register", "/forgot-password", "/"];
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    
    // Extract locale
    const locale = pathname.split("/")[1] || routing.defaultLocale;
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Check authentication
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthPage = UNPROTECTED_ROUTES.includes(pathWithoutLocale);

    // Authenticated user on auth page → redirect to home-page
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL(`/${locale}/`, req.url));
    }

    // Unauthenticated user on non-auth page → redirect to login
    if (!token && !isAuthPage) {
        const loginUrl = new URL(`/${locale}/login`, req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)", "/"],
};