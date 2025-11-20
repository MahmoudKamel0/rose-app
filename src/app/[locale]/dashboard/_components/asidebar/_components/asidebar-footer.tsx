import AdminDropdown from "./admin-dropdown";
import { authOptions } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { SidebarFooter, SidebarSeparator } from "@components/ui/sidebar";
import { generateUniqueColor } from "@lib/utils/generate-unique-color.util";
import { generateInitials } from "@lib/utils/generateInitials.util";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";

/**
 * AsidebarFooter
 *
 * This asynchronous component is responsible for rendering the footer section of the sidebar within the dashboard.
 * It fetches the current user session from the server, displays the user's avatar (or their initials if no image is available),
 * the user's full name, email address, and an admin actions dropdown.
 *
 * Utilizes server-side authentication with NextAuth to get the current session details.
 *
 * @returns {JSX.Element} The rendered sidebar footer containing user info and the admin dropdown.
 */
export default async function AsidebarFooter() {
    const SESSION: Session | null = await getServerSession(authOptions);
    const FULL_NAME = SESSION?.user ? `${SESSION.user.firstName} ${SESSION.user.lastName}` : "";
    const NAME_FALLBACK = generateInitials(SESSION?.user?.firstName ?? "");
    const BG_USER_UNIQUE = generateUniqueColor(FULL_NAME || "User");

    return (
        <SidebarFooter>
            <SidebarSeparator className="border-black/10" />
            <div className="flex items-center justify-between gap-3">
                <Avatar>
                    <AvatarImage src={SESSION?.user?.photo} alt={SESSION?.user?.firstName} />
                    <AvatarFallback className="font-bold" style={{ backgroundColor: BG_USER_UNIQUE }}>
                        {NAME_FALLBACK}
                    </AvatarFallback>
                </Avatar>

                <div id="info-user" className="flex-auto">
                    <strong className="text-sm font-bold capitalize">{FULL_NAME}</strong>
                    <p className="text-sm max-w-full text-[#2E2E3080] text-nowrap overflow-hidden text-ellipsis">{SESSION?.user?.email}</p>
                </div>

                <AdminDropdown fullname={FULL_NAME} />
            </div>
        </SidebarFooter>
    );
}
