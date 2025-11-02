import { useInfiniteQuery } from "@tanstack/react-query"; // Import React Query hook for handling infinite (paginated) data fetching.
import { Category } from "../_types/categories"; // Import the Category type definition for TypeScript type safety.

// Define the shape of the response we expect from the API.
type CategoriesResponse = {
  message: string; 
  metadata: {
    currentPage: number;
    limit: number; 
    totalPages: number; 
    totalItems: number; 
  };
  categories: Category[]; 
};

// Custom hook to fetch categories with infinite scroll support.
export function useInfiniteCategories() {
  return useInfiniteQuery<CategoriesResponse>({
    // A unique key for caching and identifying this query.
    queryKey: ["categories"],

    // The function that will run each time we need to fetch data.
    // "pageParam" is provided automatically by React Query to handle pagination.
    queryFn: async ({ pageParam = 1 }) => {
      // Call our API route and pass the page and limit parameters.
      const res = await fetch(`/api/categories?page=${pageParam}&limit=5`);

      // If the request failed, throw an error so React Query can handle it.
      if (!res.ok) throw new Error("Failed to fetch categories");

      // Return the JSON response data.
      return res.json();
    },

    // This function tells React Query how to find the next page.
    // If the current page is less than total pages → return the next page number.
    // Otherwise, return undefined to stop loading more.
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },

    // Keep data fresh for 5 minutes (prevents unnecessary re-fetching).
    staleTime: 1000 * 60 * 5,

    // Prevent re-fetching data automatically when the user switches back to the window.
    refetchOnWindowFocus: false,
  });
}
