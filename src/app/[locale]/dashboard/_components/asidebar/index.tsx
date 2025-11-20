import AsidebarContent from "./_components/asidebar-content";
import AsidebarFooter from "./_components/asidebar-footer";
import AsidebarHeader from "./_components/asidebar-header";
import { Sidebar } from "@components/ui/sidebar";

/**
 * Asidebar
 *
 * The main sidebar component for the dashboard layout.
 * Composes the sidebar header, content, and footer sections for navigation and user controls.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
export default function Asidebar() {
    return (
        <Sidebar className="w-72 border-black/10 px-6 py-8">
            {/* Header sidebar - display header sidebar */}
            <AsidebarHeader />

            {/* Content sidebar - display content sidebar */}
            <AsidebarContent />

            {/* Footer sidebar - display footer sidebar */}
            <AsidebarFooter />
        </Sidebar>
    );
}
