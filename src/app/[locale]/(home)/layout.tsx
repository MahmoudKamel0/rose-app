import Header from "@components/layout/header";
import { ReactNode } from "react";

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
        <>
            <Header />
            {children}
            {/* <Footer /> */}
        </>
    );
}
