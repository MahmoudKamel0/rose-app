import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@lib/utils/cn.utils";
import { ThemeProvider } from "@components/providers/theme.provider";
import { ModeToggle } from "@components/ui/mode-toggle";
import { sarabun, tajawal } from "@fonts/index";
import ReactQueryProvider from "@components/providers/react-query.provider";

export const metadata: Metadata = {
    title: "Rose Store – Premium Flower Boutique | Luxury Roses & Elegant Bouquets",
    description:
        "Rose Store is a premium online flower boutique offering luxury roses, handcrafted bouquets, and personalized floral arrangements. Perfect for weddings, gifts, and special occasions — delivered with elegance and care.",
    keywords: [
        "Rose Store",
        "Luxury flower shop",
        "Premium roses",
        "Elegant bouquets",
        "Online flower delivery",
        "Handcrafted floral arrangements",
        "Wedding flowers",
        "Gift bouquets",
        "Romantic roses",
        "Fresh flowers online",
        "Same day flower delivery",
    ],
    openGraph: {
        title: "Rose Store – Premium Flower Boutique | Luxury Roses & Elegant Bouquets",
        description:
            "Experience luxury in every petal — Rose Store offers handcrafted bouquets and premium flower delivery for every occasion.",
        siteName: "Rose Store",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn(sarabun.className, tajawal.className)}>
            <body className={cn("antialiased")}>
                <ReactQueryProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                        <ModeToggle />
                    </ThemeProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
