import { Badge } from "@components/ui/badge";
import { cn } from "@lib/utils/cn.utils";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import NotificationMenu from "./Notification";

/**
 * ShoShopHeader
 *
 * Renders the icon controls for user interactions related to the shop in the header.
 * Includes:
 *  - Favorites (Heart icon)
 *  - Shopping Cart (ShoppingCart icon with item badge)
 *  - Notifications (Bell icon with badge)
 *
 * Intended for display within the application's top header.
 */

export default function ShopHeader() {
    // BadgeStyle: reusable utility class for notification/favorite/cart badge styling
    const BadgeStyle = cn(
        "text-10 absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center p-2 font-medium text-white",
        "dark:bg-red-500 dark:text-zinc-50"
    );

    return (
        <div className={cn("flex items-center gap-2.5 border-x border-zinc-200 px-4 py-3", "dark:border-zinc-700")}>
            {/* Favorites icon button - navigates to user's favorite items */}
            <Link href="/">
                <Heart className={cn("stroke-zinc-700 dark:stroke-zinc-50")} />
            </Link>

            {/* Shopping Cart icon button - shows number of items in cart */}
            <Link className={cn("relative")} href="/">
                <ShoppingCart className={cn("stroke-zinc-700 dark:stroke-zinc-50")} />
                <Badge className={BadgeStyle}>8</Badge>
            </Link>

            {/* Notification bell icon button - shows number of notifications */}
            <NotificationMenu />
        </div>
    );
}
