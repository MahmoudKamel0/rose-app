import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["en", "ar"],

    // Used when no locale matches
    defaultLocale: "en",

    // Map of pathnames to localized pathnames
    pathnames: {
        "/overview": { en: "/", ar: "/" },
        "/forgot-password": { en: "/forgot-password", ar: "/نسيت-كلمة-المرور" },
        "/register": { en: "/register", ar: "/تسجيل-الدخول" },
        "/products": { en: "/products", ar: "/المنتجات" },
    },
});
