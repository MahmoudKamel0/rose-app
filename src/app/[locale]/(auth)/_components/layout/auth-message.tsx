"use client";

import { useTranslations } from "next-intl";
import { greatVibes } from "@fonts";
import { cn } from "@lib/utils/cn.utils";
import { usePathname } from "@/i18n/navigation";

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
                "text-maroon-700 dark:text-softpink-300 mb-6 w-full pb-4 text-center text-5xl leading-[100%] font-normal"
            )}
        >
            {message}
        </h1>
    );
}
