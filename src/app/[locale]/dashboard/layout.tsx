import Asidebar from "./_components/asidebar";
import { SidebarProvider } from "@components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="flex w-full h-screen overflow-hidden">
            {/* <aside className="min-h-screen w-80 bg-zinc-200">SideBar</aside> */}
            <Asidebar />
            <div className="flex-auto overflow-y-auto">
                <header className="bg-zinc-200">dasboard header</header>
                <main className="min-h-screen bg-zinc-50 pl-4 pr-6 pt-6 dark:bg-zinc-900">{children}</main>
            </div>
        </SidebarProvider>
    );
}
