import { Button } from "@components/ui/button";
import { SidebarHeader } from "@components/ui/sidebar";
import { Link } from "@i18n/navigation";
import { Flower } from "lucide-react";
import Image from "next/image";


/**
 * Renders the header section of the dashboard sidebar.
 * Displays the logo and a button to preview the website.
 *
 * @returns {JSX.Element} The AsidebarHeader component.
 */
export default function AsidebarHeader() {
    return (
        <SidebarHeader className="place-items-center">
            <Image src="/images/logo.webp" alt="logo rose store" width="120" height="112" priority />
            <Button className="w-full font-semibold">
                <Flower size="20" /> <Link href="/">Preview Website</Link>
            </Button>
        </SidebarHeader>
    );
}
