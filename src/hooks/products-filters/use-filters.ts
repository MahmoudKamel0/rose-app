"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function useFilters() {
  // Basic tools declarations 
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Add or delete search params function 
  const updateParam = (key: string, value?: string | number | string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    // Empty value case: delete the key from the URL (Array.isArray because [] is a truthy value)
    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
    } else {
      // Having value case: add "set" the key and value to the URL
      params.set(key, Array.isArray(value) ? value.join(",") : String(value));
    }
    // Update the current URL without refresh
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { updateParam, searchParams };
}