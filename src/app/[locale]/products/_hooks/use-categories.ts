import { useQuery } from "@tanstack/react-query";
import { Category } from "../_types/categories";

export function useCategories() {
    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch("/api/categories");
            if (!res.ok) throw new Error("Failed to fetch categories");

            const data = (await res.json()) as { categories: Category[] };
            return data.categories;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}
