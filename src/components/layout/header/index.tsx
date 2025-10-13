import TopHeader from "./components/top-header";
import NavHeader from "./components/nav-header";

/**
 * Header Component
 *
 * This component serves as the main header container for the application.
 * It is composed of:
 *  - TopHeader: Displays the top part of the header, typically containing ancillary links or user/account information.
 *  - NavHeader: Contains the main site navigation menu.
 *
 * Usage:
 * Place `<Header />` at the top of your layout to provide a consistent navigation and account section across pages.
 */
export default function Header() {
    return (
        <header className="mb-20">
            <TopHeader />
            <NavHeader />
        </header>
    );
}
