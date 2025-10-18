"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface PaginationReturn {
    currentPage: number;
    totalPages: number;
    pageRange: (number | string)[];
    handlePageChange: (page: number) => void;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    jumpBackward: (steps?: number) => void;
    jumpForward: (steps?: number) => void;
}

interface UsePaginationParams {
    totalPages: number;
    pageParamName?: string;
    siblingCount?: number;
}

export function usePagination({ totalPages, pageParamName = "page", siblingCount = 0 }: UsePaginationParams): PaginationReturn {
    const router = useRouter(); // initialize router from Next.js navigation
    const searchParams = useSearchParams(); // get URL search parameters

    const getPageFromUrl = () => { // fetch the current page number from URL
        const param = searchParams.get(pageParamName);
        if (!param) return 1;

        const page = parseInt(param, 10);
        if (page < 1) return 1;
        if (page > totalPages) return totalPages;
        return page;
    };

    const [currentPage, setCurrentPage] = useState(getPageFromUrl()); // state management for current page

    useEffect(() => { // synchronize currentPage state with the URL
        const urlPage = getPageFromUrl();
        if (urlPage !== currentPage) {
            setCurrentPage(urlPage);
        }
    }, [searchParams]);

    const updateUrl = (page: number) => { // update the URL with new page value
        const params = new URLSearchParams(searchParams.toString());

        if (page === 1) {
            params.delete(pageParamName);
        } else {
            params.set(pageParamName, page.toString());
        }

        const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
        router.push(newUrl, { scroll: false });
    };

    const handlePageChange = useCallback( // handle going to a specific page
        (page: number) => {
            if (page >= 1 && page <= totalPages && page !== currentPage) {
                setCurrentPage(page);
                updateUrl(page);
            }
        },
        [currentPage, totalPages]
    );

    const goToPreviousPage = useCallback(() => { // go to previous page
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    }, [currentPage, handlePageChange]);

    const goToNextPage = useCallback(() => { // go to next page
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    }, [currentPage, totalPages, handlePageChange]);

    const jumpBackward = useCallback( // jump backward by a number of pages
        (steps = 10) => {
            const newPage = Math.max(1, currentPage - steps);
            handlePageChange(newPage);
        },
        [currentPage, handlePageChange]
    );

    const jumpForward = useCallback( // jump forward by a number of pages
        (steps = 10) => {
            const newPage = Math.min(totalPages, currentPage + steps);
            handlePageChange(newPage);
        },
        [currentPage, totalPages, handlePageChange]
    );

    const pageRange = useMemo(() => { // calculate visible range of page numbers
        if (totalPages === 1) return [1];

        if (totalPages <= 4) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | string)[] = [];

        const leftSide = Math.max(2, currentPage - siblingCount);
        const rightSide = Math.min(totalPages - 1, currentPage + siblingCount);

        const needLeftDots = leftSide > 2;
        const needRightDots = rightSide < totalPages - 1;

        pages.push(1);

        if (needLeftDots) { // add left ellipsis if needed
            pages.push("...");
        }

        for (let i = leftSide; i <= rightSide; i++) { // add range of middle pages
            if (i !== 1 && i !== totalPages) {
                pages.push(i);
            }
        }

        if (needRightDots) { // add right ellipsis if needed
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    }, [currentPage, totalPages, siblingCount]);

    return { // expose pagination API
        currentPage,
        totalPages,
        pageRange,
        handlePageChange,
        goToPreviousPage,
        goToNextPage,
        jumpBackward,
        jumpForward,
    };
}
