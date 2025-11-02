import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["en", "ar"],

    // Used when no locale matches
    defaultLocale: "en",

    // Map of pathnames to localized pathnames
    pathnames: {
        "/": { en: "/", ar: "/" },
        "/forgot-password": { en: "/forgot-password", ar: "/نسيت-كلمة-المرور" },
        "/login": { en: "/login", ar: "/تسجيل-الدخول" },
        "/register": { en: "/register", ar: "/انشاء حساب" },

        // Products
        "/products": { en: "/products", ar: "/المنتجات" },
    },
});
