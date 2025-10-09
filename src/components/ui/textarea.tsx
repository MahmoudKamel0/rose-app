import * as React from "react";

import { cn } from "@lib/utils/cn.utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "placeholder:text-zinc-400 text-zinc-800 disabled:bg-zinc-100 disabled:border-transparent focus:border-maroon-600 invalid:border-maroon-600 rounded-10 flex min-h-[60px] w-full border border-zinc-300 bg-transparent px-3 py-2 text-base hover:border-zinc-400 disabled:cursor-not-allowed md:text-sm outline-none disabled:text-zinc-400",
                "dark:bg-zinc-700 dark:text-zinc-50 dark:disabled:text-zinc-600 dark:border-zinc-600 hover:border-zinc-500 dark:focus:border-softpink-400 dark:invalid:border-red-500 dark:disabled:bg-background dark:disabled:border-zinc-700",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
