import { cn } from "@lib/utils/cn.util";
import { Home, Gift, ClipboardList, PartyPopper, Headset, Info, LogOut, MapPinHouse, ScrollText, Settings, User } from "lucide-react";

// For NavHeader component: (components/layout/header/components/nav-header)
export const getNavLinks = (t: (key: string) => string) => [
    {
        icon: <Home size={20} className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        path: "/",
        name: t("home"),
    },
    {
        icon: <Gift size={20} className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        path: "/products",
        name: t("products"),
    },
    {
        icon: <ClipboardList size={20} className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        path: "/categories",
        name: t("categories"),
    },
    {
        icon: <PartyPopper size={20} className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        path: "/occasions",
        name: t("occasions"),
    },
    {
        icon: <Headset size={20} className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        path: "/#footer",
        name: t("contact"),
    },
    {
        icon: <Info size={20} className={cn("stroke-zinc-50", "dark:stroke-zinc-800")} />,
        path: "/#about",
        name: t("about"),
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

// For SliderOffers component: (components/features/application/home/special-gifts/components/slider-offers)
export const IMAGES_SLIDERS_OFFERS = [
    {
        imagePath: "/images/img4.webp",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment.",
    },
    {
        imagePath: "/images/s2.webp",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment.",
    },
    {
        imagePath: "/images/img3.webp",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment.",
    },
];

// For Footer component: (components/layout/footer)
export const FOOTER_LINKS = [
    { path: "/", name: "home" },
    { path: "/products", name: "products" },
    { path: "/categories", name: "categories" },
    { path: "/occasions", name: "occasions" },
    { path: "/contact", name: "contact" },
    { path: "/about", name: "about" },
    { path: "/terms", name: "terms" }, 
    { path: "/privacy", name: "privacy" }, 
    { path: "/faqs", name: "faqs" }, 
];
