import { cn } from "@lib/utils/cn.util";
import {
    Home,
    Gift,
    ClipboardList,
    PartyPopper,
    Headset,
    Info,
    MapPinHouse,
    ScrollText,
    Settings,
    User,
    CalendarHeart,
    LayoutDashboard,
    Package,
} from "lucide-react";

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
        path: "/profile",
    },
    {
        icon: <MapPinHouse size="16" />,
        name: "My Addresses",
        path: "/address",
    },
    {
        icon: <ScrollText size="16" />,
        name: "My Orders",
        path: "/orders",
    },
    {
        icon: <Settings size="16" />,
        name: "Dashboard",
        path: "/dashboard",
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

// For links Asidebar dashboard component: (app/dashboard/_components/asidebar)
export const getDashboardAdminLinks = (t: (key: string) => string) => [
    {
        id: 1,
        href: "/dashboard",
        label: t("overview"),
        icon: <LayoutDashboard size="20" strokeWidth="2.5" />,
    },
    {
        id: 2,
        href: "/dashboard/categories",
        label: t("categories"),
        icon: <ClipboardList size="20" strokeWidth="2.5" />,
    },
    {
        id: 3,
        href: "/dashboard/occasions",
        label: t("occasions"),
        icon: <CalendarHeart size="20" strokeWidth="2.5" />,
    },
    {
        id: 4,
        href: "/dashboard/products",
        label: t("products"),
        icon: <Package size="20" strokeWidth="2.5" />,
    },
];
