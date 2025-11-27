import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

import { Image as ImageIcone } from "lucide-react";
import Image from "next/image";

interface ViewImageProps {
    imageUrl: string;
}

export function ViewImage({ imageUrl }: ViewImageProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="flex h-10 w-48 items-center justify-center gap-1 border border-blue-500 bg-white text-blue-500 hover:bg-blue-50 stroke-blue-500"
                >
                    <ImageIcone className="stroke-blue-500 " width={18} height={18} />
                    View category image
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-4xl">
                <DialogHeader></DialogHeader>
                <div className="my-6 flex flex-col gap-4 px-16">
                    <div className="border-black/8 mb-6 flex h-[480px] w-full items-center justify-center rounded-md border">
                        <Image
                            src={imageUrl}
                            alt="Category Image"
                            className="h-full w-4/12 rounded-md object-contain"
                            width={640}
                            height={480}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
