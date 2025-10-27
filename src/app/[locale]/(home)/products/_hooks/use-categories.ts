import { useQuery } from "@tanstack/react-query";
import { Category } from "../_types/categories";

// Custom hook to fetch categories
export function useCategories() {
    return useQuery<Category[]>({
        // Fetch categories from the API
        queryKey: ["categories"],

        queryFn: async () => {
            // Call the internal API route to get categories
            const res = await fetch("/api/categories");
            // Handle non-OK responses
            if (!res.ok) throw new Error("Failed to fetch categories");

            // Parse the JSON response
            const data = (await res.json()) as { categories: Category[] };
            return data.categories;
        },
        // Cache settings
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false, // Do not refetch on window focus
    });
}
