import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@lib/utils/cn.utils";
import { Spinner } from "@components/ui/spinner.ui";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-10 text-sm font-medium dark:font-semi transition-colors disabled:!cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:[&_svg]:cursor-not-allowed [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                // Button Design (one)
                default:
                    "bg-primary text-primary-foreground hover:bg-maroon-700 disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-softpink-300 dark:text-zinc-800 dark:hover:bg-softpink-400 dark:disabled:text-zinc-600 [&_svg]:stroke-primary-foreground dark:[&_svg]:stroke-zinc-600",
                // Button Design (two)
                secondary:
                    "bg-destructive text-destructive-foreground hover:bg-maroon-100 disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-zinc-700 dark:text-softpink-300 dark:hover:bg-zinc-600 dark:disabled:text-zinc-600 [&_svg]:stroke-destructive-foreground disabled:[&_svg]:stroke-zinc-500 dark:[&_svg]:stroke-softpink-300 dark:disabled:[&_svg]:stroke-zinc-600",
                // Button Design (three)
                outline:
                    "border border-input text-primary bg-background hover:bg-accent disabled:bg-zinc-100 disabled:border-zinc-300 disabled:text-zinc-400 [&_svg]:stroke-maroon-600 disabled:[&_svg]:stroke-zinc-400 dark:border-softpink-300 dark:text-softpink-300 dark:hover:bg-zinc-700 dark:disabled:bg-zinc-700 dark:disabled:border-zinc-600 dark:disabled:text-zinc-600 [&_svg]:stroke-maroon-600 disabled:[&_svg]:stroke-zinc-400 dark:[&_svg]:stroke-softpink-300 dark:disabled:[&_svg]:stroke-zinc-600",
                // Button Design (four)
                outline2:
                    "bg-zinc-50 border border-zinc-400 hover:bg-zinc-100 hover:border-zinc-400 text-zinc-800 disabled:bg-zinc-100 disabled:border-zinc-300 disabled:text-zinc-400 [&_svg]:stroke-zinc-800 disabled:[&_svg]:stroke-zinc-400 dark:bg-background dark:border-zinc-500 dark:text-zinc-50 dark:hover:bg-zinc-700 dark:disabled:border-zinc-600 dark:disabled:text-zinc-600 dark:[&_svg]:stroke-zinc-50 dark:disabled:[&_svg]:stroke-zinc-600",
                // Button Design (five)
                transparent:
                    "bg-transparent text-zinc-800 hover:bg-zinc-100 disabled:bg-zinc-100 disabled:text-zinc-400 [&_svg]:stroke-zinc-800 disabled:[&_svg]:stroke-zinc-400 dark:bg-transparent dark:text-zinc-50 dark:hover:bg-zinc-700 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 dark:[&_svg]:stroke-zinc-50 dark:disabled:[&_svg]:stroke-zinc-600",
                // Button Design (sex)
                red: "bg-red-600 text-white hover:bg-red-700 disabled:bg-zinc-300 disabled:text-zinc-500 [&_svg]:stroke-white disabled:[&_svg]:stroke-zinc-500 dark:bg-red-500 dark:text-zinc-50 dark:hover:bg-red-600 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 dark:[&_svg]:stroke-zinc-50 dark:disabled:[&_svg]:stroke-zinc-600",
            },
            size: {
                default: "h-button w-button px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
        <>
            <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
        </>
    );
});

// Main reusable button for the project — consistent style,
// supports loading state, and easily extendable.
/**
 * Button is have 6 styles
 * - `default`
 * - `secondary`
 * - `outline`
 * - `outline2`
 * - `transparent`
 * - `red`
 */
const MainButton: React.FC<ButtonProps & { isLoading?: boolean }> = ({ children, isLoading, ...props }) => (
    <Button className={cn("!flex justify-center")} {...props}>
        {children}
        {isLoading && <Spinner />}
    </Button>
);

Button.displayName = "Button";

export { MainButton as Button, buttonVariants };
