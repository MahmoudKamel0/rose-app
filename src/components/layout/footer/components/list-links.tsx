"use client";

import { Link } from "@i18n/navigation";
import { FOOTER_LINKS } from "@lib/constants/component-ui.constant";
import { useTranslations } from "next-intl";

/**
 * ListLinks Component
 *
 * Renders a list of navigation links to be displayed in the footer area.
 */
export default function ListLinks() {
    const t = useTranslations("footer"); // استخدم namespace "footer"

    return (
        <ul className="flex-auto">
            {/* Title links */}
            <li>
                <h4 className="text-lg font-semibold text-softpink-300">{t("list-links.title")}</h4>
            </li>

            {/* Links important */}
            {FOOTER_LINKS.map((item) => (
                <li key={item.name}>
                    <Link className="font-medium text-zinc-50" href={item.path}>
                        {t(`list-links.links.${item.name.toLowerCase()}`)}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
