"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface SearchInputProps {
    delay?: number;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({ delay = 500, placeholder, className = "" }: SearchInputProps) {
    // Hooks
    const searchParams = useSearchParams();
    const router = useRouter();

    // Translation hook
    const t = useTranslations("Occasions");

    // State for search value synced with URL
    const [value, setValue] = useState(() => searchParams.get("search") || "");

    // Ref to store timeout for debounce
    const timeoutRef = useRef<NodeJS.Timeout>();

    // Sync search value with URL changes (browser back/forward)
    useEffect(() => {
        const urlSearch = searchParams.get("search") || "";
        setValue(urlSearch);
    }, [searchParams]);

    // Debounced update of URL search params
    useEffect(() => {
        const currentSearch = searchParams.get("search") || "";
        if (value === currentSearch) return;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (value.trim()) params.set("search", value.trim());
            else params.delete("search");

            router.push(`?${params.toString()}`, { scroll: false });
        }, delay);

        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }, [value, searchParams, router, delay]);

    return (
        <div className={`relative my-5 w-full ${className}`}>
            {/* Search icon inside the input */}
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

            {/* Input field */}
            <Input
                placeholder={placeholder || t("search")}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="h-10 pl-9 text-sm placeholder:text-zinc-400"
            />
        </div>
    );
}
