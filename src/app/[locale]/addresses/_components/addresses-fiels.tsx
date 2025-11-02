import { cn } from "@lib/utils/cn.util";
import React from "react";

function AddressesField({ title, className }: { title: string; className?: string }) {
    return (
        <>
            <fieldset
                className={cn(
                    "relative rounded-xl border border-zinc-300 pb-5 pl-4 pr-9 pt-6 transition hover:border-maroon-600",
                    className
                )}
            >
                <legend className="px-2 text-2xl font-semibold text-maroon-600 dark:text-pink-300">{title}</legend>
            </fieldset>
        </>
    );
}

export default AddressesField;
