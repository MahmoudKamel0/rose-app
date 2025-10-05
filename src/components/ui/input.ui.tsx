import * as React from "react";
import { cn } from "@/lib/utils/cn.utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "w-input rounded-10 border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-maroon-600 not-valid:ring-maroon-600 flex h-12 border bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-zinc-100 disabled:bg-zinc-100 md:text-sm",
                    "dark:focus-visible:ring-softpink-400 dark:border-zinc-600 dark:bg-zinc-700 dark:placeholder:text-zinc-400 dark:disabled:border-zinc-700 dark:disabled:bg-zinc-800",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
