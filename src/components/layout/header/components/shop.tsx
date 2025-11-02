import { Badge } from "@components/ui/badge";
import { cn } from "@lib/utils/cn.util";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "@i18n/navigation";
import NotificationMenu from "./Notification";
// import NotificationMenu from "./Notification";

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

export default function ShopHeader({ showNotifications = false }: { showNotifications?: boolean }) {
    return (
        <div className="flex items-center gap-2.5 border-x border-zinc-200 px-4 py-3 dark:border-zinc-700">
            {/* Favorites icon button - navigates to user's favorite items */}
            <Link href="/">
                <Heart className={cn("stroke-zinc-700 dark:stroke-zinc-50")} />
            </Link>

            {/* Shopping Cart icon button - shows number of items in cart */}
            <Link className="relative" href="/">
                <ShoppingCart className="stroke-zinc-700 dark:stroke-zinc-50" />
                <Badge className="absolute -right-1.5 -top-1.5 min-h-3.5 min-w-3.5 items-center justify-center p-1 text-10 text-white">
                    8
                </Badge>
            </Link>

            {/* Notification bell icon button - shows number of notifications */}
            {showNotifications && <NotificationMenu />}
        </div>
    );
}
