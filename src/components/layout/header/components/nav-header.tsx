"use client";
import { NAV_LINKS } from "@lib/constants/component-ui.constant";
import { cn } from "@lib/utils/cn.util";
import { ClipboardList, Gift, Headset, Home, Info, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    const [left, setLeft] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);

    // Style for navigation links
    const LinkStyle = cn(
        "hover:text-softpink-200 hover:[&_svg]:stroke-softpink-200 !flex items-center gap-2 font-medium text-zinc-50",
        "dark:text-zinc-800 dark:hover:text-maroon-800 dark:hover:[&_svg]:stroke-maroon-800"
    );

    // Style for the animated underline
    const LineHoverStyle = cn(
        "bg-softpink-200 transition-left absolute bottom-0 left-0 h-0.5 w-full duration-500",
        "dark:bg-maroon-800"
    );

    // Update underline position and width on hover
    const handleHover = (element: HTMLElement) => {
        setLeft(element.offsetLeft);
        setWidth(element.offsetWidth);
    };

    return (
        <nav className={cn("bg-maroon-700 dark:bg-softpink-200 flex h-11 items-center justify-center")}>
            <ul onMouseLeave={() => setWidth(0)} className={cn("relative flex h-full w-fit items-center justify-center gap-10")}>
                {NAV_LINKS.map((item) => (
                    <li key={item.name} onMouseEnter={(e) => handleHover(e.currentTarget as HTMLElement)}>
                        <Link className={LinkStyle} href={item.path || "/"}>{item.icon} {item.name}</Link>
                    </li>
                ))}

                {/* line hover Effect */}
                <div className={LineHoverStyle} style={{ width: width, left: left }}></div>
            </ul>
        </nav>
    );
}
