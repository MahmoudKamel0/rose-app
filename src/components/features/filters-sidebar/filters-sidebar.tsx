"use client";

import { FormProvider } from "react-hook-form";
import OccasionFilter from "@components/features/occasion-filter/occasion-filter";
import PriceFilter from "@components/features/price-filter/price-filter";
import { useFilters } from "@/hooks/products-filters/use-filters";

export default function FilterSidebar() {
  const { form } = useFilters();

  return (
    <FormProvider {...form}>
      <aside className="space-y-6 p-4">
        <OccasionFilter />
        <PriceFilter />
      </aside>
    </FormProvider>
  );
}