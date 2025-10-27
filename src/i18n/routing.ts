import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["en", "ar"],

    // Used when no locale matches
    defaultLocale: "en",

    // Map of pathnames to localized pathnames
    pathnames: {
        // Index route
        "/": "/",

        // Authentication
        "/login": { en: "/login", ar: "/تسجيل-الدخول" },
        "/register": { en: "/register", ar: "/انشاء حساب" },
        "/forgot-password": { en: "/forgot-password", ar: "/نسيت-كلمة-المرور" },

        // Products
        "/products": { en: "/products", ar: "/المنتجات" },
    },
});
