"use client";

import { Button } from "@/components/ui/button";
import { deleteProduct } from "@lib/apis/dashboard/products/delete-product.api";
import { Product } from "@lib/types/end-point-api/products";
import { ProductDashboardSteps } from "@lib/types/product-dashboard";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
    products: Product[];
    setProductId: React.Dispatch<React.SetStateAction<string>>;
    setStep: React.Dispatch<React.SetStateAction<ProductDashboardSteps>>;
}

export default function ProductsTable({ products, setProductId, setStep }: Props) {
    const [items, setItems] = useState(products);
    const [isPending, startTransition] = useTransition();

    async function handleDelete(id: string) {
        startTransition(async () => {
            const result = await deleteProduct(id);

            if (!result.ok) {
                toast.error(result.error || "Failed to delete product");
                return;
            }

            setItems((prev) => prev.filter((p) => p._id !== id));
            toast.success("Product deleted successfully");
        });
    }

    //Function
    const handleEditBtn = (id: string) => {
        setProductId(id);
        setStep("edit_product");
    };

    return (
        <div className="mt-5 w-full space-y-6">
            <table className="w-full border-collapse text-left">
                <thead className="bg-zinc-50">
                    <tr>
                        {["Name", "Price", "Stock", "Sales", "Ratings"].map((title) => (
                            <th key={title} className="p-4 text-sm font-medium text-zinc-900">
                                {title}
                            </th>
                        ))}

                        {/* Empty column for actions */}
                        <th className="p-4 text-center"></th>
                    </tr>
                </thead>

                <tbody>
                    {products?.map((item) => (
                        <tr key={item._id} className="cursor-pointer border-b hover:bg-maroon-50">
                            <td className="p-4 text-base font-semibold text-zinc-800">{item.title}</td>
                            <td className="p-4">{item.price} EGP</td>
                            <td className={`p-4 ${item.quantity <= 0 ? "font-bold text-red-600" : ""}`}>{item.quantity}</td>
                            <td className="p-4">{item.sold}</td>
                            <td className="p-4 font-semibold">
                                {item.rateAvg}/5
                                <span className="text-gray-500">({item.rateCount})</span>
                            </td>

                            <td className="flex justify-center gap-2 p-4">
                                <Button
                                    onClick={() => handleEditBtn(item._id)}
                                    variant="outline"
                                    className="!h-fit w-auto rounded-sm border-none bg-[#0063D01A] px-2 py-1 text-xs font-medium text-blue-600"
                                >
                                    <Pencil className="h-4 w-4 !stroke-blue-600" /> Edit
                                </Button>

                                <Button
                                    variant="outline"
                                    className="!h-fit w-auto rounded-sm border-none bg-[#FF00001A] px-2 py-1 text-xs font-medium text-red-600"
                                    disabled={isPending}
                                    onClick={() => handleDelete(item._id)}
                                >
                                    <Trash2 className="h-4 w-4 !stroke-red-600" />
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
