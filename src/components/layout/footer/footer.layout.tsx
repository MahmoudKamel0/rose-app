"use client";
import { ArrowRight } from "lucide-react";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log("Subscribing email:", email);
    };

    return (
        <footer className="bg-zinc-800 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {/* Left section - Logo and copyright */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6">
                            <div className="relative h-40 w-48">
                                <Image
                                    src="/rose-flower-logo-burgundy-maroon.jpg"
                                    alt="Rose E-Commerce Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg font-semibold text-[#e89bb5]">Rose E-Commerce App</p>
                            <p className="text-sm text-gray-400">All rights reserved | 2025</p>
                        </div>
                    </div>

                    {/* Middle section - Navigation links */}
                    <div>
                        <h3 className="mb-4 text-lg font-medium text-[#e89bb5]">Discover our website</h3>
                        <nav>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-white transition-colors hover:text-[#e89bb5]">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="text-white transition-colors hover:text-[#e89bb5]">
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/categories" className="text-white transition-colors hover:text-[#e89bb5]">
                                        Categories
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/occasions" className="text-white transition-colors hover:text-[#e89bb5]">
                                        Occasions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-white transition-colors hover:text-[#e89bb5]">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-white transition-colors hover:text-[#e89bb5]">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-white transition-colors hover:text-[#e89bb5]">
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="text-white transition-colors hover:text-[#e89bb5]">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faqs" className="text-white transition-colors hover:text-[#e89bb5]">
                                        FAQs
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Right section - Newsletter subscription */}
                    <div>
                        <h3 className="mb-2 text-lg font-medium text-[#e89bb5]">
                            Get <span className="font-bold">20% Off</span> Discount Coupon
                        </h3>
                        <p className="mb-4 text-sm text-gray-400">By subscribing to our newsletter</p>
                        <form onSubmit={handleSubscribe} className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 border-none bg-[#4a4a4a] text-white placeholder:text-gray-400 focus:ring-[#e89bb5]"
                                required
                            />
                            <Button
                                type="submit"
                                className="flex items-center gap-2 rounded-full bg-[#e89bb5] px-6 text-white hover:bg-[#d67a9a]"
                            >
                                Subscribe
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
}
