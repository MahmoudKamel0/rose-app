import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@components/providers/theme.provider";
import Providers from "@components/providers";
import { ModeToggle } from "@components/ui/mode-toggle";
import { cn } from "@lib/utils/cn.utils";
import { sarabun, tajawal } from "@fonts/index";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

// Generate static params for each locale
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

// Locale Layout
type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

// Function to fetch translations for metadata
export async function generateMetadata({ params }: Pick<Props, "params">) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return {
        title: t("title"),
        description: t("description"),
        keywords: t("keywords"),
        openGraph: {
            title: t("ogTitle"),
            description: t("ogDescription"),
            siteName: t("siteName"),
        },
    } as Metadata;
}

export default async function LocaleLayout({ children, params }: Props) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            <body className={cn(sarabun.className, tajawal.variable, "antialiased")}>
                {/* Theme Provider */}
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {/* Providers */}
                    <Providers>{children}</Providers>
                    {/* Mode Toggle for switching themes */}
                    <ModeToggle />
                </ThemeProvider>
            </body>
        </html>
    );
}
