import { cn } from "@lib/utils/cn.util";
import { MapPin, PenLine, Phone } from "lucide-react";
import React from "react";
import AddressDelete from "./address-delete";
import { AddressStepProps } from "@lib/types/end-point-api/addresses";
import { Button } from "@components/ui/button";

function AddressesField({
    title,
    className,
    phone,
    street,
    id,
    setStep,
    onEdit,
}: {
    title: string;
    className?: string;
    phone: string;
    street: string;
    id: string;
    onEdit?: () => void;
} & AddressStepProps) {
    return (
        <>
            <fieldset
                className={cn(
                    "relative w-full rounded-xl border border-zinc-300 pb-5 pl-4 pr-9 pt-6 transition hover:border-maroon-600",
                    className
                )}
            >
                {/* Title */}
                <legend className="relative px-2 text-2xl font-semibold text-maroon-600 dark:text-pink-300">{title}</legend>
                <div>
                    {/* Address button icons */}
                    <div className="absolute -right-5 top-0 flex flex-col gap-4">
                        {/* Address edit icon */}
                        <Button
                            type="button"
                            variant={"ghost"}
                            size={"rounded-icon"}
                            className="rounded-full border-1 border-zinc-400 bg-white dark:hover:bg-zinc-200"
                            onClick={() => (onEdit ? onEdit() : setStep("edit_address"))}
                        >
                            <PenLine size={18} className="text-zinc-700" />
                        </Button>
                        {/* Address delete icon */}
                        <AddressDelete addressId={id} />
                    </div>

                    {/* Detailes */}
                    <div className="flex items-center justify-between">
                        {/* city */}
                        <div className="flex items-center justify-center gap-x-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                                <MapPin size={20} />
                            </div>
                            <span className="text-2xl font-semibold text-zinc-800 dark:text-zinc-50">{title}</span>
                        </div>

                        {/* Phone number */}
                        <div className="flex items-center justify-center gap-2 rtl:flex-row-reverse">
                            <Phone size={20} className="text-zinc-800 dark:text-zinc-400" />
                            <span className="text-lg font-medium text-zinc-500 dark:text-zinc-50">{phone}</span>
                        </div>
                    </div>

                    {/* full address */}
                    <div className="mt-5 text-base font-medium text-zinc-800 dark:text-zinc-50">
                        <span>
                            {street},{title}
                        </span>
                    </div>
                </div>
            </fieldset>
        </>
    );
}

export default AddressesField;
