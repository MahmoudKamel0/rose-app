"use client";
import { useState, useCallback, useMemo } from "react";

interface PaginationReturn {
    currentPage: number;
    pageRange: (number | string)[];
    handlePageChange: (page: number) => void;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    jumpBackward: (steps?: number) => void;
    jumpForward: (steps?: number) => void;
}

/**
 * Custom React hook for pagination logic.
 *
 * Provides state and utility methods to manage paginated UI, including:
 * - Navigation between pages (next, previous, jump forward/backward)
 * - Calculation of the display page range with optional sibling count and ellipsis
 *
 * @param {Object} params
 * @param {number} params.totalPages - Total number of pages available in the pagination control (required).
 * @param {number} [params.initialPage=1] - The page to start on (default: 1).
 * @param {number} [params.siblingCount=1] - How many sibling pages to show adjacent to the current page (default: 1).
 *
 * @returns {PaginationReturn} Pagination state and methods:
 *   - {number} `currentPage`           The current active page.
 *   - {Array<number | string>} `pageRange`    Array of page numbers and ellipsis ("...") for pagination control display.
 *   - {Function} `handlePageChange`    Set a specific page number as the current page.
 *   - {Function} `goToPreviousPage`    Move to the previous page.
 *   - {Function} `goToNextPage`        Move to the next page.
 *   - {Function} `jumpBackward`        Jump backward by a given number of pages (default: 10).
 *   - {Function} `jumpForward`         Jump forward by a given number of pages (default: 10).
 *
 * @example
 * const { currentPage, pageRange, goToNextPage, handlePageChange } = usePagination({ totalPages: 10 });
 */
export function usePagination({
    totalPages,
    initialPage = 1,
    siblingCount = 1,
}: {
    totalPages: number;
    initialPage?: number;
    siblingCount?: number;
}): PaginationReturn {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    // Handle manual page change (when user clicks a specific page number)
    const handlePageChange = useCallback(
        (page: number) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
            }
        },
        [totalPages]
    );

    // Go to the previous page (won’t go below page 1)
    const goToPreviousPage = useCallback(() => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    }, []);

    // Go to the next page (won’t go beyond the last page)
    const goToNextPage = useCallback(() => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    }, [totalPages]);

    // Jump backward by a given number of steps (default: 10)
    // Ensures it doesn't go below page 1
    const jumpBackward = useCallback((steps = 10) => {
        setCurrentPage((prev) => Math.max(1, prev - steps));
    }, []);

    // Jump forward by a given number of steps (default: 10)
    // Ensures it doesn't exceed the total number of pages
    const jumpForward = useCallback(
        (steps = 10) => {
            setCurrentPage((prev) => Math.min(totalPages, prev + steps));
        },
        [totalPages]
    );

    const pageRange = useMemo(() => {
        const range: (number | string)[] = [];

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, "...", totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
            return [1, "...", ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
            return [1, "...", ...middleRange, "...", totalPages];
        }

        return range;
    }, [currentPage, totalPages, siblingCount]);

    return {
        currentPage,
        pageRange,
        handlePageChange,
        goToPreviousPage,
        goToNextPage,
        jumpBackward,
        jumpForward,
    };
}
