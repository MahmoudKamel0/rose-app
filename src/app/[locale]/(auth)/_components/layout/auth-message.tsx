"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { greatVibes } from "@fonts";
import { cn } from "@lib/utils/cn.utils";

export default function AuthMessage() {
    // Determine the current path to display the appropriate message
    const pathname = usePathname();
    const t = useTranslations();

    // Set message based on the current path
    let message = "";

    if (pathname.endsWith("/register")) {
        message = t("register-message");
    } else if (pathname.endsWith("/login")) {
        message = t("login-message");
    }

    return (
        // Render the message with styling
        <h1
            className={cn(
                greatVibes.className,
                "text-maroon-700 mb-6 w-full border-b border-b-zinc-200 pb-4 text-center text-5xl leading-[100%] font-normal"
            )}
        >
            {message}
        </h1>
    );
}
