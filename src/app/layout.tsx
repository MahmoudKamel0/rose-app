import "./globals.css";
import { sarabun, tajawal } from "@fonts/index";
import { Metadata } from "next";
import Providers from "@components/providers";

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
        <html lang="en">
            <body className={`${sarabun.className} ${tajawal.variable} antialiased`}>
                <Providers>{children}</Providers>
                     </body>
        </html>
    );
}
