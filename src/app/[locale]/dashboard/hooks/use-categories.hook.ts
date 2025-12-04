"use client";

import { useQuery } from "@tanstack/react-query";

export function useCategories() {
    const {
        error,
        isPending,
        data: categoryData,
    } = useQuery<AllCategoriesResponseType>({
        queryKey: ["get-dashboard-category"],
        queryFn: async () => {
            const res = await fetch(`/api/get-dashboard-category`);

            const response: ApiResponse<AllCategoriesResponseType> = await res.json();
            if ("error" in response) {
                throw new Error(`${response.error}`);
            }

            return response;
        },
    });

    return {
        isPending,
        categoryData,
        error,
    };
}
