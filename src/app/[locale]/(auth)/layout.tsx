import { ReactNode } from "react";
import SideImage from "./_components/layout/side-image";
import DecorationImage from "./_components/layout/decoration-image";
import ToggleLocale from "@components/layout/header/toggle-locale";
import AuthMessage from "./_components/layout/auth-message";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Left Section */}
            <main className="h-full w-6/12 overflow-y-auto px-28">
                <div className="mx-auto flex  w-[25.4rem] flex-col items-center justify-center mt-1">
                    <div className="flex w-full justify-end">
                        <ToggleLocale />
                    </div>

                    {/* Decoration */}
                    <DecorationImage margin="mb-8 mt-4" />

                    {/* Auth Message */}
                    <AuthMessage />

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
