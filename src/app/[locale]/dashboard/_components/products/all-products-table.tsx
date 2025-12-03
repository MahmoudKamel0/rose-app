"use client";

import { Button } from "@/components/ui/button";
import { deleteProduct } from "@lib/apis/dashboard/products/delete-product.api";
import { Product } from "@lib/types/end-point-api/products";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  products: Product[];
}

export default function ProductsTable({ products }: Props) {

  // Translations
  const t = useTranslations("products-table");

  const [items, setItems] = useState(products);
  const [isPending, startTransition] = useTransition();

async function handleDelete(id: string) {
  startTransition(async () => {
    const result = await deleteProduct(id);

    if (!result.ok) {
      toast.error(result.error || t("failed-delete"));
      return;
    }

    setItems(prev => prev.filter(p => p._id !== id));
    toast.success(t("success-delete"));
  });
}

  return (
    <div className="w-full space-y-6 mt-5">

      <table className="w-full text-left border-collapse">
        <thead className="bg-zinc-50">
            <tr>
              {[t("name"), t("price"), t("stock"), t("sales"), t("ratings")].map((title) => (
                <th 
                  key={title} 
                  className="p-4 text-zinc-900 font-medium text-sm capitalize"
                >
                  {title}
                </th>
              ))}

              {/* Empty column for actions */}
              <th className="p-4 text-center"></th>
            </tr>
        </thead>

        <tbody>
          {products.map((item, i) => (
            <tr key={item._id} className="border-b hover:bg-maroon-50 cursor-pointer">
              <td className="p-4 font-semibold text-zinc-800 text-base">{item.title}</td>
              <td className="p-4">{item.price} EGP</td>
              <td className={`p-4 ${item.quantity <= 0 ? "text-red-600 font-bold" : ""}`}>
                {item.quantity}
              </td>
              <td className="p-4">{item.sold}</td>
              <td className="p-4 font-semibold">
                {item.rateAvg}/5 
                <span className="text-gray-500">({item.rateCount})</span>
              </td>

              <td className="p-4 flex gap-2 justify-center">
                <Button variant="outline" className="text-blue-600 capitalize !h-fit py-1 px-2 rounded-sm font-medium border-none w-auto text-xs bg-[#0063D01A]">
                  <Pencil className="h-4 w-4 !stroke-blue-600" /> {t("edit")}
                </Button>

                <Button
                  variant="outline"
                  className="text-red-600 capitalize !h-fit py-1 px-2 rounded-sm font-medium border-none w-auto text-xs bg-[#FF00001A]"
                  disabled={isPending}
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash2 className="h-4 w-4 !stroke-red-600" />
                  {isPending ? t("deleting") : t("delete")}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
