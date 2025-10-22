import { cn } from "@lib/utils/cn.utils";
import { Home, Gift, ClipboardList, PartyPopper, Headset, Info, LogOut, MapPinHouse, ScrollText, Settings, User } from "lucide-react";

// For NavHeader component: (components/layout/header/components/nav-header)
export const NAV_LINKS = [
    {
        icon: <Home size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        name: "Home",
    },
    {
        icon: <Gift size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        name: "Products",
        path: "/products",
    },
    {
        icon: <ClipboardList size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        name: "Categories",
    },
    {
        icon: <PartyPopper size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        name: "Occasions",
    },
    {
        icon: <Headset size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        name: "Contact",
    },
    {
        icon: <Info size="20" className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        name: "About",
    },
];

// For AccountDropdown component: (components/layout/header/components/account-dropdown)
export const ACCOUNT_DROPDOWN_LINKS = [
    {
        icon: <User size="16" />,
        name: "My Profile",
        path: "/",
    },
    {
        icon: <MapPinHouse size="16" />,
        name: "My Addresses",
        path: "/",
    },
    {
        icon: <ScrollText size="16" />,
        name: "My Orders",
        path: "/",
    },
    {
        icon: <Settings size="16" />,
        name: "Dashboard",
        path: "/",
    },
    {
        icon: <LogOut size="16" />,
        name: "Log out",
        path: "/",
    },
];

// For Footer component: (components/layout/footer)
export const FOOTER_LINKS = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/",
        name: "Products",
    },
    {
        path: "/",
        name: "Categories",
    },
    {
        path: "/",
        name: "Occasions",
    },
    {
        path: "/",
        name: "Contact",
    },
    {
        path: "/",
        name: "About",
    },
    {
        path: "/",
        name: "Terms & Conditions",
    },
    {
        path: "/",
        name: "Privacy Policy",
    },
    {
        path: "/",
        name: "FAQs",
    },
];