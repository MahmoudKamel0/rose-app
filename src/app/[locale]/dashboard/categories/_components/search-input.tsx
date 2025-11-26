"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("q", value);
    else params.delete("q");

    router.replace("?" + params.toString(), { scroll: false });
  };

  return (
    <div className="relative mb-0.5 w-full">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        className="mt-0.5 w-full rounded-md pl-8"
        placeholder="Search..."
        defaultValue={q}
        onChange={(e) => updateQuery(e.target.value)}
      />
    </div>
  );
}
