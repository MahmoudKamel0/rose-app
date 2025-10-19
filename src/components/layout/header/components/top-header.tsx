import { SearchInput } from "@components/shared/search-input";
import { tajawal } from "@fonts";
import { cn } from "@lib/utils/cn.utils";
import Image from "next/image";
import Link from "next/link";
import DeliverToClient from "./deliver-to-client";
import AccountDropdown from "./account-dropdown";
import ShopHeader from "./shop";
import { User } from "lucide-react";

/**
 * TopHeader
 *
 * This component renders the main top header for the application.
 * It includes:
 *  - The site logo (linked to /overview)
 *  - (If authenticated) The delivery address selector
 *  - A search input for finding products
 *  - (If authenticated) The user account dropdown, otherwise a login link
 *  - The shop controls (favorites, cart, notifications)
 *  - Language switcher button
 *
 * The component relies on authentication state (`IS_AUTH`) to determine
 * whether to show authenticated user controls or a sign-in link.
 */

export default function TopHeader() {
    // For test is user authenticated or no
    const IS_AUTH = false;

    const LoginLinkStyle = cn(
        "!flex items-center ps-4 gap-1.5 text-zinc-700 [&-svg]:stoke-zinc-700",
        "dark:text-zinc-50 dark:[&-svg]:stoke-zinc-50"
    );

    return (
        <div className={cn("flex items-center gap-4 px-9 py-1")}>
            {/* Logo website */}
            <Link href="/overview">
                <Image src="/images/logo.webp" alt="logo rose app" loading="lazy" width="85" height="80" />
            </Link>

            {/* (Is Authenticated): display Deliver Services */}
            {IS_AUTH && <DeliverToClient />}

            {/* input search for find products */}
            <SearchInput className={cn("flex-auto")} placeholder="What awesome gift are you looking for?" />

            {/* (Is Authenticated): display Account user, Or display link sign in if not authenticated */}
            {IS_AUTH ? (
                <AccountDropdown />
            ) : (
                <Link href="/" className={LoginLinkStyle}>
                    <User size="20" /> Login
                </Link>
            )}

            {/* Shop controls: favorites, shopping cart, notifications */}
            <ShopHeader />

            {/* translations */}
            <button className={cn(tajawal.className, "dark:text-zinc-50")}>العربية</button>
        </div>
    );
}
