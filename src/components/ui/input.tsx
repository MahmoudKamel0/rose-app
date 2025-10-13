import * as React from "react";
import { cn } from "@/lib/utils/cn.utils";
import { INPUT_STYLE } from "@lib/constants/style.constant";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-400 ",
                INPUT_STYLE,
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
