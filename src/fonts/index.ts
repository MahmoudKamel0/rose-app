import localFont from "next/font/local";

export const sarabun = localFont({
    src: [
        {
            path: "../../public/fonts/sarabun/Sarabun-Thin.woff2",
            weight: "100",
            style: "normal",
        },
        {
            path: "../../public/fonts/sarabun/Sarabun-ExtraLight.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "../../public/fonts/sarabun/Sarabun-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/sarabun/Sarabun-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/sarabun/Sarabun-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/sarabun/Sarabun-SemiBold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/sarabun/Sarabun-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/sarabun/Sarabun-ExtraBold.woff2",
            weight: "800",
            style: "normal",
        },
    ],
    variable: "--font-sarabun",
    display: "swap",
    preload: true,

});

export const tajawal = localFont({
    src: [
        {
            path: "../../public/fonts/tajawal/Tajawal-ExtraLight.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "../../public/fonts/tajawal/Tajawal-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/tajawal/Tajawal-Regular.woff2",
            weight: "400",
            style: "normal",
        },
                {
            path: "../../public/fonts/tajawal/Tajawal-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/tajawal/Tajawal-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/tajawal/Tajawal-ExtraBold.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/fonts/tajawal/Tajawal-Black.woff2",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--font-inter",
    display: "swap",
    preload: true,
});
