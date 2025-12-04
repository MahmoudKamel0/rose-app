"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@lib/types/end-point-api/products";
import { ProductDashboardSteps } from "@lib/types/product-dashboard";
import { cn } from "@lib/utils/cn.util";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";
import { useDeleteProduct } from "../../hooks/use-delete-product.hook";

interface Props {
    products: Product[];
    setProductId: React.Dispatch<React.SetStateAction<string>>;
    setStep: React.Dispatch<React.SetStateAction<ProductDashboardSteps>>;
    onDelete?: () => void; 
}

export default function ProductsTable({ products, setProductId, setStep, onDelete }: Props) {
    // Translations
    const t = useTranslations("products-table");

    // Hooks
    const deleteMutation = useDeleteProduct();
    const [isPending, startTransition] = useTransition();

    // Table header 
    const tableHeader = [
        t("name"),
        t("price"),
        t("stock"),
        t("sales"),
        t("ratings"),
    ];

    // Delete Function
    const handleDelete = (id: string) => {
    startTransition(async () => {
        try {
        const result = await deleteMutation.mutateAsync(id);
        if (!result.ok) {
            toast.error(result.error || t("failed-delete"));
            return;
        }
        toast.success(t("success-delete"));

        // revalidate data after delete
        if (onDelete) onDelete();
        } catch (err: any) {
        toast.error(err.message || t("failed-delete"));
        }
    });
    };

    // Edit Function
    const handleEditBtn = (id: string) => {
        setProductId(id);
        setStep("edit_product");
    };

    return (
        <div className="mt-5 w-full space-y-6">
            <table className="w-full border-collapse text-left">
                <thead className="bg-zinc-50">
                    <tr>
                       {tableHeader.map((title) => (
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
                    {products?.map((item) => (
                        <tr key={item._id} className="cursor-pointer group border-b hover:bg-maroon-50">
                            <td className="p-4 text-base font-semibold text-zinc-800 dark:text-zinc-50 dark:group-hover:text-maroon-700">{item.title}</td>
                            <td className="p-4 dark:group-hover:text-maroon-700">{t.rich("currency", { value: item.price })}</td>
                            <td
                                className={cn(
                                "p-4",
                                item.quantity <= 0 && "text-red-600 font-bold"
                                )}
                            >
                                {item.quantity}
                            </td>                            
                            <td className="p-4 dark:group-hover:text-maroon-700">{item.sold}</td>
                            <td className="p-4 font-semibold dark:group-hover:text-maroon-700">
                                {item.rateAvg}/5
                                <span className="text-gray-500">({item.rateCount})</span>
                            </td>

                            <td className="flex justify-center gap-2 p-4">
                                <Button
                                    onClick={() => handleEditBtn(item._id)}
                                    variant="outline"
                                    className="!h-fit !w-16 rounded-sm border-none bg-[#0063D01A] p-2 text-xs font-medium text-blue-600"
                                >
                                    <Pencil className="h-4 w-4 !stroke-blue-600" /> {t("edit")}
                                </Button>

                                <Button
                                    variant="outline"
                                    className="!h-fit !w-20 rounded-sm border-none bg-[#FF00001A] p-2 text-xs font-medium text-red-600"
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
