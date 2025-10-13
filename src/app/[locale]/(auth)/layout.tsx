import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import SideImage from "./_components/layout/side-image";
import DecorationImage from "./_components/layout/decoration-image";
import ToggleLocale from "@components/layout/header/toggle-locale";
import { greatVibes } from "@fonts/index";

export default async function AuthLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
    const t = await getTranslations({ locale: params.locale });

    // Fallback: use pathname if needed
    const pathname = headers().get("x-pathname") || "";

    // Fallback: use referer if needed
    const referer = headers().get("referer") || "";
    const currentPath = pathname || referer;

    // Get the current path and translate the message
    let message = "";
    if (currentPath.includes("/register")) {
        message = t("register-message");
    } else if (currentPath.includes("/login")) {
        message = t("login-message");
    }

    return (
        <div className="flex h-screen justify-between">
            {/* Left Section */}
            <main className="flex min-h-screen w-6/12 flex-col items-center overflow-y-auto px-36 py-[7.3rem]">
                <div className="flex w-[25.4rem] flex-col items-center justify-center">
                    <div className="flex w-full justify-end">
                        <ToggleLocale />
                    </div>

                    {/* Decoration */}
                    <DecorationImage margin="mb-10 mt-4" />

                    {/* Auth Message */}
                    <h1
                        className={`${greatVibes.className} text-maroon-700 mb-6 w-full border-b border-b-zinc-200 pb-4 text-center text-5xl leading-[100%] font-normal`}
                    >
                        {message}
                    </h1>

                    {/* Children */}
                    {children}

                    {/* Decoration */}
                    <DecorationImage rotated margin="mt-10 mb-0" />
                </div>
            </main>

            {/* Right Section */}
            <section className="relative h-full w-6/12">
                <SideImage />
            </section>
        </div>
    );
}
