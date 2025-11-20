export = App;
namespace App {
    /**
     * Interfaces related to layout components.
     * Place shared layout component types here for better organization and reusability.
     */

    export interface LocaleLayoutProps {
        children: React.ReactNode;
        params: Promise<{ locale: string }>;
    }

    export interface ContainerProps {
        children?: ReactNode;
        className?: string;
    }

    /**
     * Interfaces related to features components.
     * Place home-page features component types here for better organization and reusability.
     */
    export interface OccasionProps {
        _id: string;
        name: string;
        productsCount: number;
    }

    /**
     * Interfaces related to features components.
     * Place shared features component types here for better organization and reusability.
     */

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
