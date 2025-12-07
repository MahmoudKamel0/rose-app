"use client";

import { Button } from "@/components/ui/button";
import { ApiErrorResponse, DeleteOccasionResponse, Occasion } from "@lib/types/dashboard/occasions";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDeleteOccasion } from "../_hooks/use-delete-occasions";
import { useTranslations } from "next-intl";

export default function OccasionsRow({ item }: { item: Occasion }) {
    const router = useRouter();
    const { mutate: deleteOccasion, isPending } = useDeleteOccasion();

    // Translation hook for the Occasions namespace
    const t = useTranslations("Occasions");

    // Delete handler with success/error logic
    const handleDelete = () => {
        deleteOccasion(item._id, {
            onSuccess: (res) => {
                if (res.ok) {
                    const successPayload = res.payload as DeleteOccasionResponse;
                    toast.success(successPayload.message);
                } else {
                    const errorPayload = res.payload as ApiErrorResponse;
                    toast.error(errorPayload.error);
                }
            },
            onError: () => {
                toast.error(t("deleteFailed")); // translated error
            },
        });
    };

    return (
        <tr className="border-b py-5 hover:bg-maroon-50">
            {/* Occasion Name */}
            <td className="w-40 ps-5 text-sm font-semibold">{item.name}</td>

            {/* Product count */}
            <td className="flex-1 text-sm">
                {item.productsCount} {t("products")}
            </td>

            {/* Action buttons: Edit + Delete */}
            <td className="flex w-fit gap-2 p-2 pe-5">
                {/* Edit Button */}
                <Button size="sm" variant="secondaryBlue" onClick={() => router.push(`/dashboard/occasions/${item.name}/${item._id}/edit`)}>
                    <Edit className="mr-1 h-4 w-4" />
                    {t("edit")}
                </Button>

                {/* Delete Button */}
                <Button size="sm" variant="secondary" onClick={handleDelete} disabled={isPending}>
                    {isPending ? (
                        t("deleting")
                    ) : (
                        <>
                            <Trash className="mr-1 h-4 w-4" />
                            {t("delete")}
                        </>
                    )}
                </Button>
            </td>
        </tr>
    );
}
