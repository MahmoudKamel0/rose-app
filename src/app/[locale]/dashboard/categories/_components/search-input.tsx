"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
    // translation
    const t = useTranslations("dashboard.categories");
    const router = useRouter();
    const searchParams = useSearchParams();

    const search = searchParams.get("search") || "";

    const updateQuery = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) params.set("search", value);
        else params.delete("search");

        router.replace("?" + params.toString(), { scroll: false });
    };

    return (
        <div className="relative mb-0.5 w-full">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
                className="mt-0.5 w-full rounded-md pl-8"
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => updateQuery(e.target.value)}
            />
        </div>
    );
}
