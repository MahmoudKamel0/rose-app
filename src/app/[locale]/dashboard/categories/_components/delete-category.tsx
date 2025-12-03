"use client";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@components/ui/button";
import { Trash, Trash2 } from "lucide-react";
import { useDeleteCategory } from "../_hooks/hooks";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function DeleteCategory({ categoryId }: { categoryId: string }) {
    // translation
    const t = useTranslations("dashboard.categories.delete");

    const [open, setOpen] = useState(false);
    const { mutate, isPending } = useDeleteCategory();

    const handleDelete = () => {
        mutate(categoryId, {
            onSuccess: () => {
                setOpen(false); // ✅ Close modal on success
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    onClick={() => setOpen(true)}
                    className="flex min-h-7 min-w-20 items-center justify-center rounded-md bg-[#FF3B301A] text-red-600 hover:bg-[#FF3B3033]"
                >
                    <Trash2 className="mr-1 stroke-[3]" size={14} />
                    {t("table.deleteButton")}
                </button>
            </DialogTrigger>

            <DialogContent className="bg-white sm:max-w-lg">
                <DialogHeader className="pb-6 text-xl"></DialogHeader>

                <div className="mx-auto flex h-[105px] w-[105px] flex-col items-center justify-center gap-2 rounded-full bg-[#2E2E300D] p-[18px]">
                    <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#2E2E3026]">
                        <Trash className="stroke-slate-950" />
                    </div>
                </div>

                <div className="mb-10 mt-4 text-center">
                    <p className="text-lg font-semibold text-zinc-800"> {t("messages.deleteConfirmation")}</p>
                </div>

                <DialogFooter className="mt-10 flex items-center justify-center gap-2">
                    <DialogClose asChild>
                        <Button className="w-full border border-zinc-400 bg-zinc-50 text-zinc-800 hover:bg-zinc-100">
                            {t("cancelButton")}
                        </Button>
                    </DialogClose>

                    <Button className="w-full bg-red-600 text-white hover:bg-red-700" disabled={isPending} onClick={handleDelete}>
                        {isPending ? t("deleting") : t("confirmButton")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
