import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@i18n/routing";
import { cn } from "@lib/utils/cn.util";
import { sarabun, tajawal } from "@fonts";
import { Metadata } from "next";
import Providers from "@components/providers";
import { LocaleLayoutProps } from "@lib/types/components";

// Generate static parameters for all supported locales, enabling pre-rendering for each language version
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

// Generate static params for each supported locale (Next.js i18n pre-rendering)
export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });

    return {
        title: t("title"),
        description: t("description"),
        keywords: t("keywords"),
        // alternates:
        openGraph: {
            title: t("ogTitle"),
            description: t("ogDescription"),
            siteName: t("siteName"),
        },
    };
}

/**
 * LocaleLayout is the layout component for locale-specific routing.
 * It validates the requested locale, sets up the internationalization context,
 * and wraps all child components with the necessary providers and metadata.
 *
 * @param children - The React node(s) to be rendered within the locale layout.
 * @param params - An object containing the locale parameter from the route.
 * @returns The rendered HTML structure with the locale-specific settings applied.
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    // Extract the 'locale' from the params and validate it against supported locales.
    const { locale } = await params;

    // If the locale is not in the list of supported locales, show a 404 page.
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Set the current request's locale for all downstream i18n operations.
    setRequestLocale(locale);

    return (
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            <body className={cn("antialiased ", sarabun.variable, tajawal.variable)}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
