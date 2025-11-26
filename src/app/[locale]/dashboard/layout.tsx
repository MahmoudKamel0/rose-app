import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <aside className="min-h-screen w-80 bg-zinc-200">SideBar</aside>
            <div className="flex-1">
                <header className="bg-zinc-200">dasboard header</header>
                <main className="min-h-screen bg-zinc-50 pl-4 pr-6 pt-6 dark:bg-zinc-900"> {children}</main>
            </div>
        </div>
    );
}
