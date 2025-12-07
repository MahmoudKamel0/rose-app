"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Image as ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
    occasionImage: string;
    occasionName: string;
}

export default function OccasionImageDialog({ occasionImage, occasionName }: Props) {
    // Translation hook
    const t = useTranslations("Occasions");

    return (
        <Dialog>
            {/* Button that opens the dialog */}
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="border-black/8 flex h-[38px] w-[184px] items-center gap-[6px] rounded-[10px] border px-[10px] text-sm text-blue-600 opacity-100 hover:text-blue-700"
                >
                    <ImageIcon className="h-4 w-4 stroke-current" />
                    {/* Translated button text */}
                    {t("viewImage")}
                </Button>
            </DialogTrigger>

            {/* Dialog content */}
            <DialogContent className="rounded-xl bg-white p-6 shadow-lg">
                <DialogHeader className="mb-4">
                    {/* Dialog title → using occasion name */}
                    <DialogTitle className="text-lg font-semibold">{occasionName}</DialogTitle>
                </DialogHeader>

                {/* Image preview wrapper */}
                <div className="flex w-full items-center justify-center rounded-lg border bg-white p-4">
                    <div className="relative h-[400px] w-full">
                        {/* The image itself */}
                        <Image src={occasionImage} alt={occasionName} fill className="rounded-md object-contain" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
