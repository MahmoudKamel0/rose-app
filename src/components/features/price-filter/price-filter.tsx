"use client";

import { useTranslations } from "next-intl";
import BtnReset from "@components/shared/btn-reset";
import { getProductsByPrice } from "@lib/apis/price-filter.api";
import { useFilters } from "@/hooks/products-filters/use-filters";
import { useQuery } from "@tanstack/react-query";
import { Price } from "@lib/types/price";
import { useRouter } from "next/navigation"
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";

export default function PriceFilter() {
  const t = useTranslations("Price");
  const router = useRouter();
  const { updateParam, searchParams } = useFilters();
  

  // Read current price range from URL
const priceFromParam = searchParams.get("priceFrom");
const priceToParam = searchParams.get("priceTo");

const priceFrom = priceFromParam ? Number(priceFromParam) : undefined;
const priceTo = priceToParam ? Number(priceToParam) : undefined;

  // Fetch products automatically with React Query
  const { data: products = [], isFetching } = useQuery<Price[]>({
    queryKey: ["products-by-price", priceFrom, priceTo],
    queryFn: () => getProductsByPrice(priceFrom, priceTo),
    enabled: Boolean(priceFrom && priceTo),
    staleTime: 1000 * 60 * 5,
  });

  // Reset all prices
  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceFrom");
    params.delete("priceTo");
    router.replace(`?${params.toString()}`);
  };

  return (
    <section className="space-y-3 mt-6 border-t pt-4">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-50">
          {t("title")}
        </h2>
        {(priceFrom || priceTo) && <BtnReset onClick={handleReset} />}
      </div>

      <div className="grid grid-cols-2 gap-3 w-full"> 
        {/* Price From input */}
        <div>
          <Label htmlFor="priceFrom" className="block text-sm mb-1">
            {t("from")}
          </Label>
          <Input
            id="priceFrom"
            type="number"
            placeholder="From"
            value={priceFrom ?? ""}
            onChange={(e) =>
              updateParam("priceFrom", e.target.value ? [e.target.value] : undefined)
            }
            className="border rounded-10 px-2 py-1 w-36 h-12"
            min={0}
          />
        </div>
        {/* Price To input */}
        <div>
          <Label htmlFor="priceTo" className="block text-sm mb-1">
            {t("to")}
          </Label>
          <Input
            id="priceTo"
            type="number"
            placeholder="To"
            value={priceTo ?? ""}
            onChange={(e) =>
              updateParam("priceTo", e.target.value ? [e.target.value] : undefined)
            }
            className="border rounded-10 px-2 py-1 w-36 h-12"
            min={0}
          />
        </div>
      </div>
    </section>
  );
}