"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Declare data type will parse to the form 
interface FilterFormValues {
  occasionIds: string[];
  priceFrom?: number;
  priceTo?: number;
}

export function useFilters() {
  // Basic Declarations
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Form control
  const form = useForm<FilterFormValues>({
    defaultValues: {
      occasionIds: [],
      priceFrom: undefined,
      priceTo: undefined,
    },
  });

  const { watch, setValue, reset } = form;
  const occasionIds = watch("occasionIds");
  const priceFrom = watch("priceFrom");
  const priceTo = watch("priceTo");

  //  Read URL params on mount
  useEffect(() => {
    const occasionParam = searchParams.get("occasionId");
    if (occasionParam) {
      const ids = occasionParam.split(",");
      setValue("occasionIds", ids);
    }
    const priceFromParam = searchParams.get("priceFrom");
    const priceToParam = searchParams.get("priceTo");

    if (priceFromParam) setValue("priceFrom", Number(priceFromParam));
    if (priceToParam) setValue("priceTo", Number(priceToParam));
  }, [searchParams, setValue]);

  // Update URL when occasionIds changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    // Occasions
    if (occasionIds && occasionIds.length > 0) {
      params.set("occasionId", occasionIds.join(","));
    } else {
      params.delete("occasionId");
    }
    // price range
    if (priceFrom !== undefined) params.set("priceFrom", String(priceFrom));
    else params.delete("priceFrom");

    if (priceTo !== undefined) params.set("priceTo", String(priceTo));
    else params.delete("priceTo");

        // Replace current URL without reload
        router.replace(`${pathname}?${params.toString()}`);
    }, [occasionIds, priceFrom, priceTo, pathname, router, searchParams]);

  return {
    form,
    occasionIds,
    setValue,
    watch,
  };
}
