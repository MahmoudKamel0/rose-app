import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const authRoutes = ["/login", "/register", "/forgot-password"];
const publicPages = ["/en", "/ar", "/en/products", "/en/products", ...authRoutes];
const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // get the language from URL
    const segments = pathname.split("/");
    const locale = routing.locales.includes(segments[1] as (typeof routing.locales)[number])
        ? (segments[1] as (typeof routing.locales)[number])
        : routing.defaultLocale;

    // Get user's token
    const token = await getToken({ req });

    // If the user request public route
    if (publicPages.some((page) => pathname.endsWith(page))) {
        // authenticated, redirect to landing page
        if (authRoutes.some((page) => pathname.endsWith(page)) && token) {
            const redirectUrl = new URL(`/${locale}`, req.nextUrl.origin);
            return NextResponse.redirect(redirectUrl);
        }

        // Not authenticated, pass
        return handleI18nRouting(req);
    }

    // If the user request Protected route
    if (!token) {
        // Not authenticated, redirect to login page
        const redirectUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
        redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }
    // authenticated, pass
    return handleI18nRouting(req);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"], // Match all app pages except api, _next, and static files
};
