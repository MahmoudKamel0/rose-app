import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Providers from "@components/providers";
<<<<<<< HEAD
import { cn } from "@lib/utils/cn.utils";
import { sarabun, tajawal } from "@fonts";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
=======
import { cn } from "@lib/utils/cn.util";
import { sarabun, tajawal } from "@fonts";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@components/layout/header";
>>>>>>> 54f27d8f79cc709188ec8e853b50c3dea765fc67

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
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
