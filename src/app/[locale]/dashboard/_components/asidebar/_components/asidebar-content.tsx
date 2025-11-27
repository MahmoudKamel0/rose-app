"use client";

import { SidebarContent, SidebarGroup, SidebarMenuItem } from "@components/ui/sidebar";
import { Link, usePathname } from "@i18n/navigation";
import { useTranslations } from "next-intl";
import { getDashboardAdminLinks } from "@lib/constants/component-ui.constant";
import { cn } from "@lib/utils/cn.util";

/**
 * AsidebarContent
 *
 * This component renders the main content of the sidebar within the dashboard.
 * It displays a list of navigation links as defined in the ASIDEBAR_LINKS constant.
 * Each link is styled based on the current pathname, highlighting the active route.
 *
 * @returns {JSX.Element} The rendered sidebar content with navigation menu items.
 */
export default function AsidebarContent() {
    const pathname = usePathname();
    const t = useTranslations("dashboard.asidebar");
    const ASIDEBAR_LINKS = getDashboardAdminLinks(t);

    return (
        <SidebarContent>
            <SidebarGroup className="flex flex-col gap-4">
                {ASIDEBAR_LINKS.map((item) => (
                    <SidebarMenuItem
                        key={item.id}
                        className={cn(
                            pathname === item.href && "bg-maroon-50 text-maroon-500 [&_svg]:stroke-maroon-500",
                            "rounded-10 p-2 font-bold"
                        )}
                    >
                        <Link className="flex w-full items-center gap-2" href={item.href}>
                            {item.icon} {item.label}
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarGroup>
        </SidebarContent>
    );
}
