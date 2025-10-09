import { INPUT_STYLE } from "@lib/constants/style.constant";
import { Input } from "../ui/input";
import { cn } from "@lib/utils/cn.utils";
import { Search } from "lucide-react";
import React from "react";

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, placeholder, disabled, ...props }, ref) => {
        return (
            <div
                className={cn(
                    INPUT_STYLE,
                    disabled &&
                        "dark:bg-background border-transparent bg-zinc-100 hover:border-transparent dark:border-zinc-700 dark:hover:border-zinc-700 [&_svg]:stroke-zinc-600",
                    className
                )}
            >
                <Search size="18" className={cn("stroke-zinc-400")} />
                <Input
                    className={cn("flex-auto border-0 !bg-transparent outline-0 focus-visible:ring-0")}
                    placeholder={placeholder || "Search..."}
                    disabled={disabled}
                    {...props}
                />
            </div>
        );
    }
);
SearchInput.displayName = "Input";

export { SearchInput };
