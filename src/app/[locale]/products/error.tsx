"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@components/ui/button";
import { Home } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";

interface ErrorProductListingPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorProductListingPage({ error, reset }: ErrorProductListingPageProps) {
    const [isPending, startTransition] = useTransition(); // ✅

    const handleReset = () => {
        startTransition(() => reset());
    };

    return (
        <section id="error-product-listing-page" className="flex h-full flex-col items-center justify-center gap-4 p-4">
            <Image src="/images/logo.webp" alt="logo Rose store" width="200" height="200" />

            <h1 className="text-2xl font-bold text-red-600">Something error</h1>

            <p className="text-gray-700">{error.message || "An unexpected error occurred"}</p>

            <footer className="flex items-center gap-5">
                <Button onClick={handleReset} isLoading={isPending} className="text-zinc-50">
                    try again
                </Button>
                <Link href="/" className="!flex items-center gap-2">
                    <Home /> back to home
                </Link>
            </footer>
        </section>
    );
}
