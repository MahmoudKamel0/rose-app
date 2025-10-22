"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import BtnReset from "@components/shared/btn-reset";
import OccasionCard from "./components/occasion-card";
import { getAllOccasions } from "@lib/apis/occasions-filter.api";

export default function OccasionFilter() {
  const t = useTranslations("Occasions");
  const { watch, setValue } = useFormContext();
  const selected = watch("occasionIds") || [];

  const [occasions, setOccasions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOccasions = async () => {
      setLoading(true);
      const data = await getAllOccasions();
      setOccasions(data);
      setLoading(false);
    };
    fetchOccasions();
  }, []);

    // Reset btn
  const handleSelect = (id: string) => {
    const updated = selected.includes(id)
      ? selected.filter((item: string) => item !== id)
      : [...selected, id];

    setValue("occasionIds", updated);
  };

  const handleReset = () => {
    setValue("occasionIds", []);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-zinc-800">{t("title")}</h2>
        <BtnReset onClick={handleReset} />
      </div>

      {loading && <p>{t("loading")}</p>}

      <div className="grid grid-cols-2 gap-2.5">
        {occasions.length > 0 ? (
          occasions.map((item) => (
            <OccasionCard
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              selected={selected.includes(item._id)}
              onToggle={() => handleSelect(item._id)}
            />
          ))
        ) : (
          !loading && <p>No occasions</p>
        )}
      </div>
    </section>
  );
}
