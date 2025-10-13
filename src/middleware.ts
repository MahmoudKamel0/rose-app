import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const publicPages = ["/", "/login"];
const handleI18nRouting = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    // Regex to check if the page is public
    const publicPathnameRegex = RegExp(
        `^(/(${routing.locales.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
        "i"
    );

    // Check if the current request is for a public page
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    // If the page is not public, you can add custom logic here (e.g., authentication)
    if (isPublicPage) {
        return handleI18nRouting(req);
    }

    // If the page is public, just handle i18n routing
    return handleI18nRouting(req);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"], // Match all app pages except api, _next, and static files
};
