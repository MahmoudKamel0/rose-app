import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils/cn.utils";

const badgeVariants = cva(
    "inline-flex h-4 w-12 items-center text-12 capitalize rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                // Badge design (one)
                default:
                    "border-transparent bg-maroon-600 text-white hover:bg-maroon-700 dark:bg-softpink-300 dark:text-zinc-800 dark:hover:bg-softpink-400",
                // Badge design (two)
                new: 
                    "border-transparent bg-maroon-50 text-maroon-600 hover:bg-maroon-100 dark:bg-zinc-700 dark:text-softpink-300 dark:hover:bg-zinc-600",
                // Badge design (three)
                secondary: 
                    "border-transparent bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

/**
 * Badge Component
 *
 * Available Variants:
 * 1. `default`     → Standard primary button.
 * 2. `new`         → Subtle alternative style.
 * 3. `secondary`   → Button with a bordered outline.
 */
function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
