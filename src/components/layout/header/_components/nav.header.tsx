"use client";
import { cn } from "@lib/utils/cn.utils";
import { ClipboardList, Gift, Headset, Home, Info, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavHeader() {
    const [left, setLeft] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const NAV_LINKS = [
        {
            icon: <Home size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
            name: "Home",
        },
        {
            icon: <Gift size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
            name: "Products",
        },
        {
            icon: <ClipboardList size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
            name: "Categories",
        },
        {
            icon: <PartyPopper size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
            name: "Occasions",
        },
        {
            icon: <Headset size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
            name: "Contact",
        },
        {
            icon: <Info size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
            name: "About",
        },
    ];

    // handle hover link
    const handleHover = (element: HTMLElement) => {
        setLeft(element.offsetLeft);
        setWidth(element.offsetWidth);
    };

    return (
        <nav className={cn("bg-maroon-700 dark:bg-softpink-200 flex h-11 items-center justify-center")}>
            <ul onMouseLeave={() => setWidth(0)} className={cn("relative flex h-full w-fit items-center justify-center gap-10")}>
                {NAV_LINKS.map((item) => (
                    <li key={item.name}>
                        <Link
                            onMouseEnter={(e) => handleHover(e.currentTarget as HTMLElement)}
                            className={cn(
                                "hover:text-softpink-200 hover:[&_svg]:stroke-softpink-200 !flex items-center gap-2 font-medium text-zinc-50",
                                "dark:text-zinc-800"
                            )}
                            href="/"
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    </li>
                ))}

                {/* line hover Effect */}
                <div
                    className={cn(
                        "bg-softpink-200 transition-left absolute bottom-0 left-0 h-0.5 w-full duration-500",
                        "dark:bg-maroon-800"
                    )}
                    style={{ width: width, left: left }}
                ></div>
            </ul>
        </nav>
    );
}
