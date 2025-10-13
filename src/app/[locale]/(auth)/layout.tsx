import React from "react";
import SideImage from "./_components/layout/side-image";
import DecorationImage from "./_components/layout/decoration-image";
import ToggleLocale from "@components/layout/header/toggle-locale";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
        // Main Container
        <div className="flex h-screen justify-between">
            <main className="flex h-full w-6/12 flex-col items-center justify-center overflow-y-auto">
                <div className="flex w-[25.4rem] justify-end">
                    {/* Toggle Locale */}
                    <ToggleLocale />
                </div>
                {/* Decoration Image */}
                <DecorationImage margin="mb-10 mt-4" />
                {/* Children */}
                {children}
                {/* Decoration Image */}
                <DecorationImage rotated margin="mt-10" />
            </main>

            {/* Side Image */}
            <section className="relative h-full w-6/12">
                <SideImage />
            </section>
        </div>
    );
}
