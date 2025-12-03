"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { singleProductResponse } from "@lib/types/products";
import { CartRequest, CartResponse } from "../../app/[locale]/(home)/products/[productId]/_types/product-id";
import { addToCart } from "../../app/[locale]/(home)/products/[productId]/_actions/product-id.action";
import { useSession } from "next-auth/react";

export function useSpecificProduct(productId: string) {
    const {
        error,
        isPending,
        data: specificProductData,
    } = useQuery<singleProductResponse>({
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
    const queryClient = useQueryClient();

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
                throw new Error(res.error);
            }

            return res;
        },
        onSuccess: () => {
            // This will force a refetch of the cart data
            queryClient.invalidateQueries({ queryKey: ["user cart"] });
        },
    });
    return { mutateAddCart, error, isPending };
}

export function useGetUserCart() {
    const { data: session } = useSession();
    const {
        data: cartItem,
        error,
        isPending,
    } = useQuery<CartResponse>({
        queryKey: ["user cart"],
        queryFn: async () => {
            const res = await fetch(`/api/check-product-cart`);
            const data: ApiResponse<CartResponse> = await res.json();

            if (!res) {
                throw Error("Something went wrong please try again");
            }
            if ("error" in data) {
                throw Error(data.error);
            }
            return data;
        },
        enabled: !!session,
    });
    return { cartItem, error, isPending };
}
