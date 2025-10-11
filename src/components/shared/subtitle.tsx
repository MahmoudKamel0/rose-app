import { cn } from "@lib/utils/cn.utils";
import React from "react";

// ✅ Props type
type SubtitleProps = {
    text: string; // The text content displayed inside the subtitle
};

export default function Subtitle({ text }: SubtitleProps) {
    return (
        <h1
            className={cn(
                // Base styles (light mode)
                "font-sarabun text-[16px] leading-[100%] font-bold tracking-[0.25em] text-[#FF668B] uppercase",
                // Dark mode color
                "dark:text-[#D75458]"
            )}
        >
            {text}
        </h1>
    );
}
