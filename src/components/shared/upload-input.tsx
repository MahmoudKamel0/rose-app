"use client";
import { Upload } from "lucide-react";
import { Input } from "@components/ui/input";
import React, { useRef, useState } from "react";
import { cn } from "@lib/utils/cn.util";

const UploadInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, disabled, ...props }) => {
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
                "w-input relative flex h-12 items-center rounded-10 border border-zinc-300 p-4 focus-within:!border-maroon-600 hover:border-zinc-400 has-[input:invalid]:border-maroon-600",
                "focus-within:!border-softpink-400 hover:border-zinc-500 has-[input:invalid]:border-red-500 dark:border-zinc-600 dark:bg-zinc-700",
                disabled &&
                    "border-transparent bg-zinc-100 focus-within:!border-transparent hover:border-transparent dark:border-zinc-700 dark:bg-background",
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
            <button
                type="button"
                disabled={disabled}
                className={cn("!flex items-center gap-1.5", disabled && "!cursor-not-allowed")}
                onClick={handleUploadClick}
            >
                <Upload
                    className={cn(
                        "h-4 w-4 stroke-maroon-600",
                        "dark:stroke-softpink-400",
                        disabled && "stroke-zinc-400 dark:stroke-zinc-600"
                    )}
                    size="18"
                />
                <span
                    className={cn(
                        "text-nowrap text-sm text-maroon-600",
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
                    "absolute left-4 top-1/2 w-1/2 -translate-y-1/2 overflow-hidden text-ellipsis text-nowrap",
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
