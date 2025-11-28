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
    const router = useRouter();
    const searchParams = useSearchParams();

    const getPageFromUrl = () => {
        const param = searchParams.get(pageParamName);
        if (!param) return 1;

        const page = parseInt(param, 10);
        if (page < 1) return 1;
        if (page > totalPages) return totalPages;
        return page;
    };

    const [currentPage, setCurrentPage] = useState(getPageFromUrl());

    useEffect(() => {
        const urlPage = getPageFromUrl();
        if (urlPage !== currentPage) {
            setCurrentPage(urlPage);
        }
    }, [searchParams]);

    const updateUrl = useCallback(
        (page: number) => {
            // احتفظ بكل الـ params الموجودة
            const params = new URLSearchParams(searchParams.toString());

            if (page === 1) {
                params.delete(pageParamName);
            } else {
                params.set(pageParamName, page.toString());
            }

            router.push(`?${params.toString()}`, { scroll: false });
        },
        [searchParams, pageParamName, router]
    );

    const handlePageChange = useCallback(
        (page: number) => {
            if (page >= 1 && page <= totalPages && page !== currentPage) {
                setCurrentPage(page);
                updateUrl(page);
            }
        },
        [currentPage, totalPages, updateUrl]
    );

    const goToPreviousPage = useCallback(() => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    }, [currentPage, handlePageChange]);

    const goToNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    }, [currentPage, totalPages, handlePageChange]);

    const jumpBackward = useCallback(
        (steps = 10) => {
            const newPage = Math.max(1, currentPage - steps);
            handlePageChange(newPage);
        },
        [currentPage, handlePageChange]
    );

    const jumpForward = useCallback(
        (steps = 10) => {
            const newPage = Math.min(totalPages, currentPage + steps);
            handlePageChange(newPage);
        },
        [currentPage, totalPages, handlePageChange]
    );

    const pageRange = useMemo(() => {
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

        if (needLeftDots) {
            pages.push("...");
        }

        for (let i = leftSide; i <= rightSide; i++) {
            if (i !== 1 && i !== totalPages) {
                pages.push(i);
            }
        }

        if (needRightDots) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    }, [currentPage, totalPages, siblingCount]);

    return {
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
