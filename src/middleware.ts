import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

// Auth-related routes (language-independent)
const authRoutes = ["/login", "/register", "/forgot-password"];

// Create i18n middleware
const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Detect locale from URL
    const segments = pathname.split("/");
    const locale = routing.locales.includes(segments[1] as (typeof routing.locales)[number])
        ? (segments[1] as (typeof routing.locales)[number])
        : routing.defaultLocale;

    // User token (next-auth)
    const token = await getToken({ req });

    // --- Define public pages dynamically ---
    const isAuthRoute = authRoutes.some((route) => pathname === `/${locale}${route}`);
    const isProductsPage = pathname === `/${locale}/products` || pathname.startsWith(`/${locale}/products/`);
    const isRootPage = pathname === `/${locale}`;

    const isPublic = isAuthRoute || isProductsPage || isRootPage;

    // --- Public pages handling ---
    if (isPublic) {
        // If authenticated and trying to access login/register, redirect to overview
        if (token && isAuthRoute) {
            const redirectUrl = new URL(`/${locale}/overview`, req.nextUrl.origin);
            return NextResponse.redirect(redirectUrl);
        }

        // Allow access to public pages
        return handleI18nRouting(req);
    }

    // --- Protected pages handling ---
    if (!token) {
        const redirectUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
        redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    // Authenticated user → proceed
    return handleI18nRouting(req);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"], // Match all non-static app pages
};
