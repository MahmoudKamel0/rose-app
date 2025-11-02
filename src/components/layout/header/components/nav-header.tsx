"use client";
import { getNavLinks } from "@lib/constants/component-ui.constant";
import { cn } from "@lib/utils/cn.util";
import { Link, usePathname } from "@i18n/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * NavHeader
 *
 * This component renders the main navigation bar for the header.
 *
 * Features:
 * - A horizontal list of navigation links, each with an associated icon (e.g., Home, Products, Categories, Occasions, Contact, About).
 * - An animated underline highlights the currently hovered link, dynamically adjusting its width and position.
 * - Styles adapt to light and dark themes.
 *
 * Usage: Embed this component under the main header to provide users with quick access to key sections of the site.
 */

export default function NavHeader() {
    const t = useTranslations("Layout.header");
    const pathname = usePathname();
    const NAV_LINKS = getNavLinks(t);

    const [left, setLeft] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);

    // Refs to track active link element
    useEffect(() => {
        const activeLink = document.querySelector<HTMLElement>(`li[data-path="${pathname}"]`);
        if (activeLink) {
            setLeft(activeLink.offsetLeft);
            setWidth(activeLink.offsetWidth);
        }
    }, [pathname]);

    // Style for navigation links
    const LinkStyle = cn(
        "hover:text-softpink-200 hover:[&_svg]:stroke-softpink-200 !flex items-center gap-2 font-medium text-zinc-50",
        "dark:text-zinc-800 dark:hover:text-maroon-800 dark:hover:[&_svg]:stroke-maroon-800"
    );

    // Style for the animated underline
    const LineHoverStyle = cn("bg-softpink-200 transition-left absolute bottom-0 left-0 h-0.5 w-full duration-500", "dark:bg-maroon-800");

    // Update underline position and width on hover
    const handleHover = (element: HTMLElement) => {
        setLeft(element.offsetLeft);
        setWidth(element.offsetWidth);
    };

    // ACTIVE STYLE
    const handleMouseLeave = () => {
        const activeLink = document.querySelector<HTMLElement>(`li[data-path="${pathname}"]`);
        if (activeLink) {
            setLeft(activeLink.offsetLeft);
            setWidth(activeLink.offsetWidth);
        } else {
            setWidth(0);
        }
    };

    return (
        <nav className="flex h-11 items-center justify-center bg-maroon-700 dark:bg-softpink-200">
            <ul onMouseLeave={handleMouseLeave} className="relative flex h-full w-fit items-center justify-center gap-10">
                {NAV_LINKS.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <li key={item.name} data-path={item.path} onMouseEnter={(e) => handleHover(e.currentTarget as HTMLElement)}>
                            <Link
                                className={cn(
                                    LinkStyle,
                                    isActive &&
                                        "text-softpink-200 dark:text-maroon-800 [&_svg]:stroke-softpink-200 dark:[&_svg]:stroke-maroon-800"
                                )}
                                href={item.path}
                            >
                                {item.icon} {item.name}
                            </Link>
                        </li>
                    );
                })}

                {/* line hover Effect */}
                <div className={LineHoverStyle} style={{ width: width, left: left }}></div>
            </ul>
        </nav>
    );
}
