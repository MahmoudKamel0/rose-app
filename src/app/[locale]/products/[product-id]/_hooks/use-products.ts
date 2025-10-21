"use client";

import { useMutation } from "@tanstack/react-query";
import { ProductResponse } from "@lib/types/products";
import { useQuery } from "@tanstack/react-query";
import { CartRequest, CartResponse } from "../_types/product-id";
import { addToCart } from "../_actions/product-id.action";

export function useSpecificProduct(productId: string) {
    const {
        error,
        isPending,
        data: specificProductData,
    } = useQuery<ProductResponse>({
        queryKey: ["specific-product", productId], // include productId in the cache key
        queryFn: async () => {
            const res = await fetch(`/api/get-specific-product?productId=${productId}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
            }

            const response = await res.json();
            if ("error" in res) {
                throw new Error(`${res.error}`);
            }

            return response;
        },
        enabled: !!productId, // don’t run until we have an ID
    });

    return {
        isPending,
        specificProductData,
        error,
    };
}

export function useAddCart() {
    const {
        mutateAsync: mutateAddCart,
        error,
        isPending,
    } = useMutation({
        mutationFn: async (cartItem: CartRequest) => {
            const res: ApiResponse<CartResponse> = await addToCart(cartItem);
            if (!res) {
                throw new Error("No response from server");
            }

            if ("error" in res) {
                // throw to make React Query register an error
                throw new Error(res.error);
            }

            return res;
        },
    });
    return { mutateAddCart, error, isPending };
}
