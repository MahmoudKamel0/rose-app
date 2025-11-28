"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Image as ImageIcon, X } from "lucide-react";

interface Props {
    occasionImage: string;
    occasionName: string;
}

export default function OccasionImageDialog({ occasionImage, occasionName }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="border-black/8 flex h-[38px] w-[184px] items-center gap-[6px] rounded-[10px] border px-[10px] text-sm text-blue-600 opacity-100 hover:text-blue-700"
                >
                    <ImageIcon className="h-4 w-4 stroke-current" />
                    View occasion image
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-xl bg-white p-6 shadow-lg">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-lg font-semibold">{occasionName}</DialogTitle>
                </DialogHeader>

                {/* White Background Wrapper */}
                <div className="flex w-full items-center justify-center rounded-lg border bg-white p-4">
                    <div className="relative h-[400px] w-full">
                        <Image src={occasionImage} alt={occasionName} fill className="rounded-md object-contain" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
