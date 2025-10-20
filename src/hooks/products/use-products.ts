"use client";

import { ProductResponse } from "@lib/types/products";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches a single specific product from /api/get-specific-product
 * This client hook does NOT call next/navigation.notFound() — that belongs to server logic.
 */
export function useSpecificProduct() {
    const {
        error,
        isLoading,
        data: specificProductData,
        isFetching,
    } = useQuery<ProductResponse>({
        queryKey: ["specific-product"],
        queryFn: async () => {
            const res = await fetch(`/api/get-specific-product`);
            if (!res.ok) {
                throw new Error(`Failed to fetch product: ${res.status} ${res.statusText} `);
            }
            const response = res.json();

            // handle 404 and other statuses as normal Errors on client

            return res.json();
        },
    });

    return {
        isLoading,
        isFetching,
        specificProductData,
        error,
    };
}
