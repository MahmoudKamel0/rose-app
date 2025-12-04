"use client";

import { useTranslations } from "next-intl";
import BtnReset from "@components/shared/btn-reset";
import OccasionCard from "./components/occasion-card";
import { getAllOccasions } from "@lib/apis/occasions-filter.api";
import { useFilters } from "@/hooks/products-filters/use-filters";
import { useQuery } from "@tanstack/react-query";
import { Occasion } from "@lib/types/occasions";
import { useState } from "react";


export default function OccasionFilter() {
  
  const t = useTranslations("Occasions");
  const { updateParam, searchParams} = useFilters();
  const [loading, setLoading] = useState(false);

    // Fetch occasions automatically with React Query
  const { data: occasions = [] } = useQuery<Occasion[]>({
    queryKey: ["occasions"],
    queryFn: getAllOccasions,
    staleTime: 1000 * 60 * 5,
  });

    // Read selected IDs directly from URL
  const selected = searchParams.get("occasionId")?.split(",") ?? [];

  // Handling toggle behavior and update URL
    const toggle = (id: string) => {
    const isSelected = selected.includes(id);
    const newSelected = isSelected
      ? selected.filter((x) => x !== id)
      : [...selected, id];
    updateParam("occasionId", newSelected);
  };

  // Reset all selected occasions
  const handleReset = () => {
    updateParam("occasionId", []);
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-50">{t("title")}</h2>
        {selected.length > 0 && <BtnReset onClick={handleReset} />}
      </div>

      {loading && <p>{t("loading")}</p>}

      <div className="grid grid-cols-2 gap-2.5">
        {occasions.length > 0 ? (
          occasions.map((item: Occasion) => (
            <OccasionCard
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              selected={selected.includes(item._id)}
              onToggle={() => toggle(item._id)}
            />
          ))
        ) : (
          !loading && <p>{t("noOccasions")}</p>
        )}
      </div>
    </section>
  );
}

