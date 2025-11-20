"use client";

import { Link } from "@i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

/**
 * LogoCopyright Component
 *
 * This component displays the company branding in the footer section,
 * including the logo, application name, and copyright notice.
 */
export default function LogoCopyright() {
    const t = useTranslations("footer");

    return (
        <div className="text-center">
            {/* logo brand */}
            <Link href="/">
                <Image src="/images/logo.webp" alt={t("logo-alt")} loading="lazy" width={240} height={225} />
            </Link>

            {/* app title */}
            <h4 className="text-lg font-semibold text-softpink-300">{t("app-title")}</h4>

            {/* copyright */}
            <p className="text-sm text-zinc-50">{t("copyright")}</p>
        </div>
    );
}
