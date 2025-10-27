import { SearchInput } from "@components/shared/search-input";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Link } from "@i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import DeliverToClient from "./deliver-to-client";
import AccountDropdown from "./account-dropdown";
import ShopHeader from "./shop";
import ToggleLocale from "./toggle-locale";

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

export default async function TopHeader() {
    // Using server components improves performance and reduces unnecessary client-side rendering.
    const SESSION = await getServerSession(authOptions);
    const t = await getTranslations("Layout.header");

    return (
        <div className="flex items-center gap-4 px-9 py-1">
            {/* Brand Logo website */}
            <Link href="/">
                {/* why used classes (h-fit max-w-fit)? for disabled classes tailwindcss for images */}
                <Image className="h-fit max-w-fit" src="/images/logo.webp" alt="logo rose app" width="85" height="80" />
            </Link>

            {/* (Is Authenticated): display Deliver Services */}
            {SESSION?.user && <DeliverToClient address={SESSION.user.addresses} />}

            {/* input search for find products */}
            <SearchInput className="flex-auto" placeholder={t("input-search")} />

            {/* (Is Authenticated): display Account user, Or display link sign in if not authenticated */}
            {SESSION?.user ? (
                <AccountDropdown />
            ) : (
                <Link
                    href="/login"
                    className="[&-svg]:stoke-zinc-700 dark:[&-svg]:stoke-zinc-50 !flex items-center gap-1.5 text-nowrap ps-4 text-zinc-700 dark:text-zinc-50"
                >
                    <User size="20" /> {t("login")}
                </Link>
            )}

            {/* Shop controls: favorites, shopping cart, notifications */}
            <ShopHeader />

            {/* translations */}
            <ToggleLocale />
        </div>
    );
}
