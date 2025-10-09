import { Container } from "@components/features/application/container.layout";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const FOOTER_LINKS = [
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

    return (
        <footer className="h-96 bg-zinc-800 py-10">
            <Container className="flex justify-between gap-5">
                {/* Logo & Copy right */}
                <div className="text-center">
                    <Link href="/">
                        <Image src="/images/logo.webp" alt="rose logo" loading="lazy" width="240" height="225" />
                    </Link>
                    <h4 className="text-softpink-300 text-lg font-semibold">Rose E-Commerce App</h4>
                    <p className="text-sm text-zinc-50">All rights reserved | 2025</p>
                </div>

                {/* Links */}
                <ul className="flex-auto" aria-labelledby="footer-links-title">
                    <h4 id="footer-links-title" className="text-softpink-300 text-lg font-semibold">
                        Discover our website
                    </h4>
                    {FOOTER_LINKS.map((item) => (
                        <li key={item.name}>
                            <Link className="font-medium text-zinc-50" href={item.path}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Subscription */}
                <div className="w-96">
                    {/* Header */}
                    <h4 className="text-softpink-300 text-xl font-semibold">
                        Get <span className="text-white">20%</span> Off Discount Coupon
                    </h4>
                    <p className="text-zinc-500 mb-5">By subscribing to our newsletter</p>

                    {/* Form subscription email */}
                    <form className="h-10 w-full rounded-full relative overflow-hidden">
                        <Input type="email" className="h-full w-full border-0 bg-zinc-600 placeholder:text-zinc-400 text-zinc-50" placeholder="Enter Your Email" />
                        <Button className="rounded-full absolute top-0 right-0 h-full w-28 !flex items-center bg-maroon-50 hover:bg-maroon-100 text-maroon-700 [&_svg]:stroke-maroon-700">
                            Subscribe <ArrowRight />
                        </Button>
                    </form>
                </div>
            </Container>
        </footer>
    );
}
