"use client";
import { usePagination } from "@/hooks/use-pagination ";
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
    const id = useId()
    const { currentPage, pageRange, handlePageChange, goToPreviousPage, goToNextPage, jumpBackward, jumpForward } = usePagination({
        totalPages: 100,
        siblingCount: 1,
    });

    return (
        <div className="flex items-center justify-center gap-1.5">
            {/* Previous buttons */}
            <button
                onClick={() => jumpBackward()}
                aria-label="previous 10 steps"
                className="!flex h-[32px] w-[32px] items-center justify-center rounded-lg border border-zinc-100 text-sm"
            >
                <ChevronsLeft size="16" className="!stroke-black" />
            </button>
            <button
                onClick={goToPreviousPage}
                aria-label="previous page"
                className="!flex h-[32px] w-[32px] items-center justify-center rounded-lg border border-zinc-100 text-sm"
            >
                <ChevronLeft size="16" className="!stroke-black" />
            </button>

            {/* Mapping pages numbers */}
            {pageRange.map((page, index) => (
                <button
                    key={`${id + index}`}
                    className={`!flex h-[32px] w-[32px] items-center justify-center rounded-lg border border-zinc-100 text-sm ${page === currentPage && "bg-maroon-600 text-white"}`}
                    onClick={() => handlePageChange(page as number)} // 2
                >
                    {page as ReactNode}
                </button>
            ))}

            {/* Next buttons */}
            <button
                onClick={goToNextPage}
                aria-label="next page"
                className="!flex h-[32px] w-[32px] items-center justify-center rounded-lg border border-zinc-100 text-sm"
            >
                <ChevronRight size="16" className="!stroke-black" />
            </button>
            <button
                onClick={() => jumpForward()}
                aria-label="next 10 steps"
                className="!flex h-[32px] w-[32px] items-center justify-center rounded-lg border border-zinc-100 text-sm"
            >
                <ChevronsRight size="16" className="!stroke-black" />
            </button>
        </div>
    );
}
