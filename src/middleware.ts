import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const authRoutes = ["/login", "/register", "/forgot-password"];
const publicPages = ["/en", "/ar", "/en/products", ...authRoutes];

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Get the locale from the URL
    const segments = pathname.split("/");
    const locale = routing.locales.includes(segments[1] as (typeof routing.locales)[number])
        ? (segments[1] as (typeof routing.locales)[number])
        : routing.defaultLocale;

    // Get user's token
    const token = await getToken({ req });

    // Check if the route is public
    const isPublic =
        publicPages.some((page) => pathname === page || pathname.startsWith(`${page}/`)) ||
        pathname.startsWith("/en/products/") || // support dynamic product pages
        pathname.startsWith("/ar/products/");

    if (isPublic) {
        // If authenticated user tries to access auth routes, redirect to home
        if (authRoutes.some((page) => pathname.endsWith(page)) && token) {
            const redirectUrl = new URL(`/${locale}`, req.nextUrl.origin);
            return NextResponse.redirect(redirectUrl);
        }

        // Public route → allow
        return handleI18nRouting(req);
    }

    // Protected routes → require authentication
    if (!token) {
        const redirectUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
        redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    // Authenticated → allow
    return handleI18nRouting(req);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"], // Match all app pages except api, _next, and static files
};
