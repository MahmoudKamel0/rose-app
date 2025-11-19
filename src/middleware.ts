
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createMiddleware(routing);
// Protected pages
const PROTECTED_ROUTES = ["/checkout", "/dashboard", "/profile"];

// Auth pages (public only)
const AUTH_PAGES = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Extract locale
    const locale = pathname.split("/")[1] || routing.defaultLocale;
    // Normalize path without locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Check authentication
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
  const isProtected = PROTECTED_ROUTES.includes(pathWithoutLocale);
  const isAuthPage = AUTH_PAGES.includes(pathWithoutLocale);

  // =============================
  // 🚧 1) Auth user visiting login/register → redirect to home
  // =============================
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}/`, req.url));
  }

  // =============================
  // 🔒 2) NON-auth user visiting protected route → redirect to login
  // =============================
  if (!token && isProtected) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // =============================
  // ✅ 3) Otherwise → allow access
  // =============================
    return intlMiddleware(req);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)", "/"],
};
