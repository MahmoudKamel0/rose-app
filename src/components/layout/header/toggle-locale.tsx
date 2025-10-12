"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@components/ui/button";
import { useLocale } from "next-intl";

export default function ToggleLocale() {
    // Translate the button text based on the current locale
    const locale = useLocale();

    // Get the router object to enable navigation
    const router = useRouter();
    const pathname = usePathname();

    // Function to toggle between 'en' and 'ar' locales
    function toggleLocale() {
        router.push(
            { pathname, query: Object.fromEntries(new URLSearchParams(location.search).entries()) },
            { locale: locale === "en" ? "ar" : "en" }
        );
    }

    return <Button onClick={toggleLocale}>{locale === "en" ? "العربية" : "English"}</Button>;
}
