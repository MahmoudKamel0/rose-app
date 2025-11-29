import { Product } from "../end-point-api/products";

export = Products

namespace Products {
    // This section defines type-related comments for Product components, providing context and 
    // organization for type definitions in product-related files.

    /**
     /**
      * Defines the props for the ProductItem component.
      *
      * @property {string} className - Custom CSS classes to be applied to the outer container of the product item.
      * @property {string} [key] - Optional React unique key prop for efficiently rendering lists of components.
      *
      * Used in: src/components/features/application/products/product-item.tsx
      */

    export interface ProductItemProps {
        // className?: string;
        product: Product
        key?: string | number;
    }

    export interface FooterProductItemProps {
        // className?: string;
        product: Product
    }

    export interface RateStarsProps {
        rateCount: number
    }

    export interface PaginationProps {
        className?: string;
        totalPages: number;
        onPageChange?: (page: number) => void;
    }
}



