import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

// Auth-related routes (language-independent)
// const authRoutes = ["/login", "/register", "/forgot-password"];

// // Create i18n middleware
// const handleI18nRouting = createMiddleware(routing);

// export default async function middleware(req: NextRequest) {
//     const pathname = req.nextUrl.pathname;

//     // Detect locale from URL
//     const segments = pathname.split("/");
//     const locale = routing.locales.includes(segments[1] as (typeof routing.locales)[number])
//         ? (segments[1] as (typeof routing.locales)[number])
//         : routing.defaultLocale;

//     // User token (next-auth)
//     const token = await getToken({ req });

//     // --- Define public pages dynamically ---
//     const isAuthRoute = authRoutes.some((route) => pathname === `/${locale}${route}`);
//     const isProductsPage = pathname === `/${locale}/products` || pathname.startsWith(`/${locale}/products/`);
//     const isRootPage = pathname === `/${locale}`;

//     const isPublic = isAuthRoute || isProductsPage || isRootPage;

//     // --- Public pages handling ---
//     if (isPublic) {
//         // If authenticated and trying to access login/register, redirect to overview
//         if (token && isAuthRoute) {
//             const redirectUrl = new URL(`/${locale}/overview`, req.nextUrl.origin);
//             return NextResponse.redirect(redirectUrl);
//         }

//         // Allow access to public pages
//         return handleI18nRouting(req);
//     }

//     // --- Protected pages handling ---
//     if (!token) {
//         const redirectUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
//         redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
//         return NextResponse.redirect(redirectUrl);
//     }

//     // Authenticated user → proceed
//     return handleI18nRouting(req);
// }

// export const config = {
//     matcher: ["/((?!api|_next|.*\\..*).*)"], // Match all non-static app pages
// };

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
