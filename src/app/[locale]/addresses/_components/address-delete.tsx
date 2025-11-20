"use client";

import { useDeleteUserAddress } from "../hooks/use-addresses.hook";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Trash, Trash2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";

type AddressDeleteProps = {
    addressId: string;
};

function AddressDelete({ addressId }: AddressDeleteProps) {
    // Translation
    const t = useTranslations("addresses-content");
    // Hooks
    const { isPending, mutateAsync } = useDeleteUserAddress();
    const queryClient = useQueryClient();

    const handleDelete = async () => {
        await mutateAsync(addressId, {
            onSuccess: () => {
                toast.success(t("deleted-succ"));
                queryClient.invalidateQueries({ queryKey: ["addresses"] });
            },
            onError: () => {
                toast.error(t("deleted-failed"));
            },
        });
    };

    return (
        <AlertDialog>
            {/* Delete icon */}
            <AlertDialogTrigger asChild>
                <Button
                    type="button"
                    variant="default"
                    size="rounded-icon"
                    className="rounded-full bg-red-600 hover:bg-red-700"
                    disabled={isPending}
                >
                    <Trash2 size={18} className="text-white" />
                </Button>
            </AlertDialogTrigger>

            {/*  The confirmation dialog */}
            <AlertDialogContent className="h-96 bg-white dark:bg-zinc-800">
                <AlertDialogCancel className="!hover:bg-none top-2!h-10 absolute right-2 top-2 !h-10 !w-10 border-none pb-6 pl-2.5 text-center">
                    <div className="">
                        <X size={20} className="text-3xl" />
                    </div>
                </AlertDialogCancel>
                <div className="flex h-full flex-col items-center gap-16 pt-12">
                    <AlertDialogHeader className="flex flex-col gap-7">
                        <div className="relative flex justify-center">
                            <div className="bg-overlay-gray absolute left-1/2 top-1/2 z-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full dark:bg-zinc-500"></div>
                            <div className="bg-overlay-gray-2 z-10 flex h-16 w-16 items-center justify-center rounded-full p-3 text-zinc-900 dark:text-zinc-300">
                                <Trash className="h-6 w-6" />
                            </div>
                        </div>
                        <AlertDialogTitle className="mt-24 text-lg font-semibold text-zinc-700 dark:text-zinc-100">
                            {t("delete")}
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="mt-4 flex justify-center gap-3">
                        <AlertDialogCancel className="w-28 border-zinc-200"> {t("cancel")}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isPending}
                            className="w-28 bg-red-600 text-white hover:bg-red-700"
                        >
                            {isPending ? t("deleting") : t("confirm")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AddressDelete;
