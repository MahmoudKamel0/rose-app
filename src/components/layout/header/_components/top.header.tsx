import { Badge } from "@components/ui/badge";
import { SearchInput } from "@components/shared/search-input.shared";
import { tajawal } from "@fonts";
import { cn } from "@lib/utils/cn.utils";
import { MapPinPen, ChevronDown, Heart, ShoppingCart, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TopHeader() {
    return (
        <div className={cn("flex items-center gap-4 px-9 py-1")}>
            {/* Logo website */}
            <Link href="/overview">
                <Image src="/images/logo.webp" alt="logo rose app" loading="lazy" width="85" height="80" />
            </Link>

            {/* Deliver to */}
            {true && (
                <div className={cn("deliver")} aria-label="deliver to location">
                    <span className={cn("text-sm dark:text-zinc-500")}>Deliver to:</span>
                    <p className={cn("text-maroon-700 dark:text-softpink-200 flex gap-1.5 font-medium")}>
                        <MapPinPen size="20" className={cn("stroke-maroon-700 dark:stroke-softpink-200")} /> Cairo
                    </p>
                </div>
            )}

            {/* input search */}
            <SearchInput className={cn("flex-auto")} placeholder="What awesome gift are you looking for?" />

            {/* account user */}
            <button className={cn("!flex items-center justify-center gap-1 ps-4 text-start leading-4 capitalize")} aria-label="account">
                <div>
                    <span className={cn("text-12 dark:text-zinc-400")}>hello</span>
                    <p className={cn("text-maroon-700 dark:text-softpink-200 font-medium")}>Jonathan</p>
                </div>
                <ChevronDown className={cn("stroke-zinc-500 dark:stroke-zinc-400")} size="18" />
            </button>

            {/* shop */}
            <div className={cn("flex items-center gap-2.5 border-x border-zinc-200 px-4 py-3", "dark:border-zinc-700")}>
                {/* Favorite */}
                <Link href="/">
                    <Heart className={cn("dark:stroke-zinc-50")} />
                </Link>

                {/* Cart */}
                <Link className={cn("relative")} href="/">
                    <ShoppingCart className={cn("dark:stroke-zinc-50")} />
                    <Badge
                        className={cn(
                            "text-10 absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center p-2 font-medium text-white",
                            "dark:bg-red-500 dark:text-zinc-50"
                        )}
                    >
                        8
                    </Badge>
                </Link>

                {/* Notification */}
                <Link className={cn("relative")} href="/">
                    <Bell className={cn("dark:stroke-zinc-50")} />
                    <Badge
                        className={cn(
                            "text-10 absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center p-2 font-medium text-white",
                            "dark:bg-red-500 dark:text-zinc-50"
                        )}
                    >
                        8
                    </Badge>
                </Link>
            </div>

            {/* translations */}
            <button className={cn(tajawal.className, "dark:text-zinc-50")}>العربية</button>
        </div>
    );
}
