"use client";

import { Button } from "@/components/ui/button";
import { deleteProduct } from "@lib/apis/dashboard/products/delete-product.api";
import { Product } from "@lib/types/end-point-api/products";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  products: Product[];
}

export default function ProductsTable({ products }: Props) {
    const [items, setItems] = useState(products);
  const [isPending, startTransition] = useTransition();

async function handleDelete(id: string) {
  startTransition(async () => {
    const result = await deleteProduct(id);

    if (!result.ok) {
      toast.error(result.error || "Failed to delete product");
      return;
    }

    setItems(prev => prev.filter(p => p._id !== id));
    toast.success("Product deleted successfully");
  });
}

  return (
    <div className="p-6 w-full space-y-6">

      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Sales</th>
            <th className="p-4">Ratings</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item, i) => (
            <tr key={item._id} className="border-b">
              <td className="p-4 font-medium">{item.title}</td>
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
                <Button variant="outline" className="text-blue-600 border-blue-200">
                  <Pencil className="h-4 w-4" /> Edit
                </Button>

                <Button
                  variant="outline"
                  className="text-red-600 border-red-200"
                  disabled={isPending}
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash2 className="h-4 w-4" />
                  {isPending ? "Deleting..." : "Delete"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
