"use client";
import { Upload } from "lucide-react";
import { Input } from "@components/ui/input";
import React, { useRef, useState } from "react";
import { cn } from "@lib/utils/cn.utils";

const UploadInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, disabled, ...props }, ref) => {
    const [fileName, setFileName] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFileName(file.name);
    };

    const handleUploadClick = () => {
        if (!fileInputRef.current?.disabled) fileInputRef.current?.click();
    };

    return (
        <div
            className={cn(
                "rounded-10 w-input focus-within:!border-maroon-600 has-[input:invalid]:border-maroon-600 relative flex h-12 items-center border border-zinc-300 p-4 hover:border-zinc-400",
                "focus-within:!border-softpink-400 hover:border-zinc-500 has-[input:invalid]:border-red-500 dark:border-zinc-600 dark:bg-zinc-700",
                disabled &&
                    "dark:bg-background border-transparent bg-zinc-100 focus-within:!border-transparent hover:border-transparent dark:border-zinc-700",
                className
            )}
        >
            {/* Hidden file input (real uploader) */}
            <Input
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                disabled={disabled}
                className={cn("!w-3/4 flex-auto border-0 opacity-0")}
                {...props}
            />

            {/* Visible upload button */}
            <button type="button" className={cn("!flex items-center gap-1.5")} onClick={handleUploadClick}>
                <Upload
                    className={cn(
                        "stroke-maroon-600 h-4 w-4",
                        "dark:stroke-softpink-400",
                        disabled && "stroke-zinc-400 dark:stroke-zinc-600"
                    )}
                    size="18"
                />
                <span
                    className={cn(
                        "text-maroon-600 text-sm text-nowrap",
                        "dark:text-softpink-400",
                        disabled && "text-zinc-400 dark:text-zinc-600"
                    )}
                >
                    Upload file
                </span>
            </button>

            {/* File name or placeholder */}
            <span
                className={cn(
                    "absolute top-1/2 left-4 w-1/2 -translate-y-1/2 overflow-hidden text-nowrap text-ellipsis",
                    "dark:text-zinc-50"
                )}
            >
                {fileName || ""}
            </span>
        </div>
    );
});
UploadInput.displayName = "Input";

export { UploadInput };
