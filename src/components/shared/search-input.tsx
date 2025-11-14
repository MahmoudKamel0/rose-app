import { INPUT_STYLE } from "@lib/constants/style.constant";
import { Input } from "../ui/input";
import { cn } from "@lib/utils/cn.util";
import { Search } from "lucide-react";
import React from "react";

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, placeholder, disabled, ...props }) => {
    return (
        <div
            className={cn(
                INPUT_STYLE,
                disabled &&
                    "border-transparent bg-zinc-100 hover:border-transparent dark:border-zinc-700 dark:bg-background dark:hover:border-zinc-700",
                className
            )}
        >
            <Search size="18" className={cn("stroke-zinc-400")} />
            <Input
                className={cn("flex-auto border-0 !bg-transparent outline-0")}
                placeholder={placeholder || "Search..."}
                disabled={disabled}
                {...props}
            />
        </div>
    );
});
SearchInput.displayName = "Input";

export { SearchInput };
