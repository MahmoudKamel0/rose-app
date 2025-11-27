"use client";

import { SearchInput } from "@components/shared/search-input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchProductsInput({ defaultKeyword }: { defaultKeyword: string }) {
  const router = useRouter();
  const params = useSearchParams();

  const [keyword, setKeyword] = useState(defaultKeyword);

  // Auto update URL after user stops typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      const newParams = new URLSearchParams(params.toString());
      
      if (keyword) newParams.set("keyword", keyword);
      else newParams.delete("keyword");

      // Always reset to page=1 when searching
      newParams.set("page", "1");

      router.push(`?${newParams.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [keyword]);

  return (
    <SearchInput
      className="flex-auto"
      placeholder="Search..."
      defaultValue={defaultKeyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}
