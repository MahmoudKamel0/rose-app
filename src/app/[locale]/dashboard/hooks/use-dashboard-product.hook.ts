"use client";

import { useMutation } from "@tanstack/react-query";
import { addProductAction } from "../products/actions/add-product.action";
import { ProductResponse } from "@lib/types/products";

export function useAddProduct() {
    const { mutateAsync, error, isPending } = useMutation({
        mutationFn: async (data: FormData) => {
            const res: ApiResponse<ProductResponse> = await addProductAction(data);
            if (!res) {
                return { error: "No response from server" };
            }

            if ("error" in res) {
                return { error: res.error };
            }

            return res;
        },
    });

    return { mutateAsync, error: error?.message || null, isPending };
}
