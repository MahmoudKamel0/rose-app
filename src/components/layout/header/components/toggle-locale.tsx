import { Link } from "@/i18n/navigation";
import { tajawal } from "@fonts";
import { cn } from "@lib/utils/cn.util";
import { getLocale } from "next-intl/server";

export default async function ToggleLocale() {
    const locale = await getLocale();
    const nextLocale = locale === "en" ? "ar" : "en";
    const nextLang = locale === "en" ? "العربية" : "English";

    return (
        <Link href="/" locale={nextLocale} className={cn(tajawal.className, "dark:text-zinc-50")}>
            {nextLang}
        </Link>
    );
}
