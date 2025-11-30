"use client";

import { useMutation } from "@tanstack/react-query";
import { addProductAction, editProductAction } from "../products/actions/product.action";
import { ProductResponse } from "@lib/types/products";

export function useAddProduct() {
    const {
        mutateAsync: addProduct,
        error,
        isPending,
    } = useMutation({
        mutationFn: async (data: FormData) => {
            const res: ApiResponse<ProductResponse> = await addProductAction(data);
            if (!res) {
                throw new Error("No response from server");
            }

            if ("error" in res) {
                throw new Error(res.error);
            }

            return res;
        },
    });

    return { addProduct, error, isPending };
}
export function useEditProduct() {
    const {
        mutateAsync: editProduct,
        error,
        isPending,
    } = useMutation({
        mutationFn: async ({ data, id }: { data: FormData; id: string }) => {
            const res: ApiResponse<ProductResponse> = await editProductAction(data, id);
            if (!res) {
                throw new Error("No response from server");
            }
            console.log(res);

            if ("error" in res) {
                throw new Error(res.error);
            }

            return res;
        },
    });

    return { editProduct, error, isPending };
}
