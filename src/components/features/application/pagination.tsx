"use client";
import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@lib/utils/cn.utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { ReactNode, useId, useState } from "react";

/**
 * Pagination component
 *
 * Renders a pagination control with navigation buttons for moving between pages.
 * Utilizes the usePagination hook to manage pagination state,
 * such as the current page, page ranges, and navigation functions.
 *
 * Features:
 * - Jump to first/last page
 * - Navigate to previous/next page
 * - Shows current page number highlighted
 * - Handles customizable page range and sibling count through the hook
 *
 * @component
 */
export default function Pagination() {
    const id = useId();
    const { currentPage, pageRange, handlePageChange, goToPreviousPage, goToNextPage, jumpBackward, jumpForward } = usePagination({
        totalPages: 100,
        siblingCount: 1,
    });

    return (
        <div className="flex items-center gap-1.5">
            {/* Previous buttons */}
            <button
                onClick={() => jumpBackward()}
                aria-label="previous 10 steps"
                className="!flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-100 text-sm dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-50"
            >
                <ChevronsLeft size="16" className="stroke-black dark:stroke-zinc-50" />
            </button>
            <button
                onClick={goToPreviousPage}
                aria-label="previous page"
                className="!flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-100 text-sm dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-50"
            >
                <ChevronLeft size="16" className="stroke-black dark:stroke-zinc-50" />
            </button>

            {/* Mapping pages numbers */}
            {pageRange.map((page, index) => (
                <button
                    key={`${id + index}`}
                    className={cn(
                        "!flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-100 text-sm dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-50",
                        page === currentPage && "bg-maroon-600 dark:bg-softpink-200 text-white dark:text-zinc-700"
                    )}
                    onClick={() => handlePageChange(page as number)} // 2
                >
                    {page as ReactNode}
                </button>
            ))}

            {/* Next buttons */}
            <button
                onClick={goToNextPage}
                aria-label="next page"
                className="!flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-100 text-sm dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-50"
            >
                <ChevronRight size="16" className="stroke-black dark:stroke-zinc-50" />
            </button>
            <button
                onClick={() => jumpForward()}
                aria-label="next 10 steps"
                className="!flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-100 text-sm dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-50"
            >
                <ChevronsRight size="16" className="stroke-black dark:stroke-zinc-50" />
            </button>
        </div>
    );
}
