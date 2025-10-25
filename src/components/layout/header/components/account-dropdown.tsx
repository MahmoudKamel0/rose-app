import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { ACCOUNT_DROPDOWN_LINKS } from "@lib/constants/component-ui.constant";
import { cn } from "@lib/utils/cn.util";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

/**
 * AccountDropdown
 *
 * Renders the account dropdown menu in the header section.
 * Intended to display user account options such as profile, addresses, orders, and sign out.
 */

export default function AccountDropdown({ firstName, lastName }: { firstName: string; lastName: string }) {
    return (
        <DropdownMenu>
            {/* Button that triggers the account dropdown menu when clicked */}
            <DropdownMenuTrigger className={cn("!flex items-center justify-center gap-1 ps-4 text-start leading-4 capitalize outline-0")}>
                {/* dropdown account */}
                <div aria-label="Account menu dropdown to access user profile, orders, and settings">
                    <span className={cn("text-12 dark:text-zinc-400")}>hello</span>
                    <p className={cn("text-maroon-700 dark:text-softpink-200 font-medium")}>{firstName}</p>
                </div>

                {/* icon arrow button */}
                <ChevronDown className={cn("stroke-zinc-500 dark:stroke-zinc-400")} size="18" />
            </DropdownMenuTrigger>

            {/* Dropdown links */}
            <DropdownMenuContent className={cn("mt-3 w-56 rounded-xl border border-zinc-100 px-0 dark:border-zinc-600")} align="end">
                {/* user name label in dropdown */}
                <DropdownMenuLabel className="mb-1 border-b border-zinc-100 dark:border-zinc-600">{`${firstName} ${lastName}`}</DropdownMenuLabel>

                {/* render each account dropdown link as a menu item with its icon and label */}
                {ACCOUNT_DROPDOWN_LINKS.map((link) => (
                    <DropdownMenuItem
                        key={link.name}
                        className={cn(
                            link.name === "Dashboard" && "mt-1 rounded-none border-y border-zinc-100 px-2 py-0 dark:border-zinc-600"
                        )}
                    >
                        <Link
                            className="hover:bg-maroon-50 dark:hover:bg-softpink-200 !flex w-full items-center gap-2 rounded-sm px-1.5 py-1.5"
                            href={link.path}
                        >
                            {link.icon} {link.name}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
