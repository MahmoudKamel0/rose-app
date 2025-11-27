"use client";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@components/ui/dropdown-menu";
import { Link } from "@i18n/navigation";
import { EllipsisVertical, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

/**
 * AdminDropdown
 *
 * A dropdown menu component for the admin section, displaying the user's full name
 * and providing navigation options such as accessing the account page and logging out.
 *
 * @param {Object} props - The component props.
 * @param {string} props.fullname - The full name of the current user, shown in the dropdown label.
 * @returns {JSX.Element} The rendered admin dropdown menu.
 */
export default function AdminDropdown({ fullname }: { fullname: string }) {
    const t = useTranslations("dashboard.asidebar");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVertical size="18" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 h-32 px-3 capitalize place-content-center border-zinc-100 bg-white">
                <DropdownMenuLabel className="py-1 font-semibold">{fullname}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-black/10" />
                <DropdownMenuItem className="py-1">
                    <Link className="font-medium flex items-center gap-2" href="/dashboard/account"><User size="16" /> {t("account")}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/10" />
                <DropdownMenuItem className="py-1 font-medium cursor-pointer" onClick={() => signOut()}>
                    <LogOut size="16" /> {t("logout")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
