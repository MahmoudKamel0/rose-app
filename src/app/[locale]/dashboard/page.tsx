import OverviewFirstRow from "./_components/overview-first-row";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import type { Session } from "next-auth";
import { redirect } from "@i18n/navigation";


export const metadata: Metadata = {
    title: "Admin Dashboard",
};

export default async function Dashboard() {
    const SESSION: Session | null = await getServerSession(authOptions);

    // Redirect the user to the homepage if they are not an admin.
    if (SESSION?.user?.role !== "admin") {
        redirect({ href: "/", locale: "en" }); // replace "en" with appropriate locale if dynamic
    }

    return (
        <>
            <OverviewFirstRow />
        </>
    );
}
