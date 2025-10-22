"use client";

import { useTranslations } from "next-intl";
import BtnReset from "@components/shared/btn-reset";
import { useFormContext } from "react-hook-form";
import { getProductsByPrice } from "@lib/apis/price-filter.api";
import { useEffect, useState } from "react";

export default function PriceFilter() {
  const t = useTranslations("Price");
  const { watch, setValue } = useFormContext();

  // Watch Price inputs
  const priceFrom = watch("priceFrom");
  const priceTo = watch("priceTo");

  // Requested Products state
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      // If user didn't type price
      if (priceFrom === undefined && priceTo === undefined) return;

      try {
        setLoading(true);
        const data = await getProductsByPrice(priceFrom, priceTo);
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    // Refetch data when the inputs change
    fetchProducts();
  }, [priceFrom, priceTo]); 

  // Reset btn
  const handleReset = () => {
    setValue("priceFrom", undefined);
    setValue("priceTo", undefined);
    setProducts([]); 
  };

  return (
    <section aria-labelledby="price-filter-title" className="mt-6 border-t-1">
      <div className="flex items-center justify-between mb-4">
        <h2 id="price-filter-title" className="text-lg font-semibold text-zinc-800">
          {t("title")}
        </h2>
        <BtnReset onClick={handleReset} label="Reset" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="priceFrom" className="block text-sm mb-1">
            {t("from")}
          </label>
          <input
            type="number"
            placeholder="From"
            value={priceFrom ?? ""}
            onChange={(e) =>
              setValue(
                "priceFrom",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="border rounded-10 px-2 py-1 w-36 h-12"
            min={0}
          />
        </div>

        <div>
          <label htmlFor="priceTo" className="block text-sm mb-1">
            {t("to")}
          </label>
          <input
            type="number"
            placeholder="To"
            value={priceTo ?? ""}
            onChange={(e) =>
              setValue(
                "priceTo",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="border rounded-10 px-2 py-1 w-36 h-12"
            min={0}
          />
        </div>
      </div>

      <div className="mt-4">
        {loading && <p className="text-sm text-gray-500">Loading...</p>}
        {!loading && products.length > 0 && (
          <p className="text-sm text-gray-700">
            {products.length} products found
          </p>
        )}
      </div>
    </section>
  );
}
