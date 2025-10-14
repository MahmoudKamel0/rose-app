"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { greatVibes } from "@fonts";

export default function AuthMessage() {
    const pathname = usePathname();
    const t = useTranslations();

    let message = "";
    if (pathname.includes("/register")) {
        message = t("register-message");
    } else if (pathname.includes("/login")) {
        message = t("login-message");
    }

    return (
        <h1
            className={`${greatVibes.className} text-maroon-700 mb-6 w-full border-b border-b-zinc-200 pb-4 text-center text-5xl leading-[100%] font-normal`}
        >
            {message}
        </h1>
    );
}
