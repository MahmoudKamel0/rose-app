export declare namespace Pagination {
    export interface PaginationReturn {
        currentPage: number;
        totalPages: number;
        pageRange: (number | string)[];
        handlePageChange: (page: number) => void;
        goToPreviousPage: () => void;
        goToNextPage: () => void;
        jumpBackward: (steps?: number) => void;
        jumpForward: (steps?: number) => void;
    }

    export interface UsePaginationParams {
        totalPages: number;
        pageParamName?: string;
        siblingCount?: number;
    }
}

export type PaginationReturn = Products.PaginationReturn;
export type UsePaginationParams = Products.UsePaginationParams;
