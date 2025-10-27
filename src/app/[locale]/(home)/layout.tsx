import Footer from "@components/layout/footer";
import Header from "@components/layout/header";
import { Fragment, ReactNode } from "react";

/**
 * OverviewLayout
 *
 * This layout component wraps the homepage and its sub-routes.
 * It renders the global Header and the provided page content.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Child nodes representing page content
 * @returns {JSX.Element}
 */
export default function OverviewLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col justify-between">
            <Header />
            {children}
            <Footer />
        </main>
    );
}
