import { useMutation } from "@tanstack/react-query";
import { ProductsApiResponse } from "@lib/types/products";
import { getAllProducts } from "@lib/apis/products/get-all-products.api";
import { searchParams } from "@lib/types/product-dashboard";

export function useGetAllProducts() {
    const { mutateAsync, error, isPending, data } = useMutation({
        mutationFn: async (searchParams: searchParams) => {
            const res: ApiResponse<ProductsApiResponse> = await getAllProducts(searchParams);
            if (!res) {
                return { error: "No response from server" };
            }

            if ("error" in res) {
                return { error: res.error };
            }

            return res;
        },
    });

    return { mutateAsync, error: error?.message || null, isPending, data };
}
