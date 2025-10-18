import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid h-screen grid-cols-2">
            <div className="flex h-full items-center">
                <div className="mx-auto w-[406px]">{children}</div>
            </div>
            <div className="h-full bg-red-400">welcome</div>
        </div>
    );
}
