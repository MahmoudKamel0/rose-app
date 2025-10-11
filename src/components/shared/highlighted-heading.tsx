import React from "react";
import { cn } from "@lib/utils/cn.utils";

// ✅ Props type
type HighlightedHeadingProps = {
    text: string; // The heading text
    highlightWidth: string; // Width of the pink highlight (after pseudo-element)
    borderWidth: string; // Width of the bottom border (before pseudo-element)
};

export default function HighlightedHeading({ text, highlightWidth, borderWidth }: HighlightedHeadingProps) {
    return (
        <h2
            style={
                {
                    "--highlight-width": highlightWidth,
                    "--border-width": borderWidth,
                } as React.CSSProperties
            } // TypeScript fix for CSS variables
            className={cn(
                // Base styles (light mode)
                "h2 relative inline-block ps-[0.7px] pb-0.5 text-3xl font-bold text-[#741C21]",
                // Dark mode text color
                "dark:text-[#FFC2D0]",
                // Pink highlight (after pseudo-element) with dark mode color
                "after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-4 after:w-[var(--highlight-width)] after:rounded-r-2xl after:bg-[#fdd7d7] after:content-[''] dark:after:bg-[#3F3F46]",
                // Red bottom border (before pseudo-element) with dark mode color
                "before:absolute before:bottom-0 before:left-0 before:z-20 before:h-0.5 before:w-[var(--border-width)] before:rounded-r-2xl before:bg-[#E65073] before:content-[''] dark:before:bg-[#FF668B]"
            )}
        >
            {text}
        </h2>
    );
}
