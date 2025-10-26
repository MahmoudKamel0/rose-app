"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCategories } from "../../_hooks/use-categories";
import ResetButton from "../common/reset-button";
import CategoryItem from "./components/category-item";

export default function CategoriesFilters() {
    // Next.js navigation hooks
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Fetch categories using custom hook
    const { data, isLoading, isError } = useCategories();

    //categories data
    const categories = data || [];

    // Get the current active category from the URL
    const activeCategory = searchParams.get("category");

    // Handle category click
    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams);
        if (activeCategory === category) {
            // If the user clicks again on the same one, remove it (toggle off)
            params.delete("category");
        } else {
            // Set the new category in the query string
            params.set("category", category);
        }

        // Update the URL without refreshing the page
        router.push(`${pathname}?${params.toString()}`);
    };

    // Reset category filter
    const handleCategoryReset = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("category"); // remove only category
        router.push(`${pathname}?${params.toString()}`); // keep other params like rating
    };

    return (
        <div>
            {/* Header with Reset Button */}
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-800">Category</h2>
                {/* ✅ Reusable Reset Button */}
                <ResetButton onReset={handleCategoryReset} />
            </div>
            {/* Categories List */}
            <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                    <CategoryItem
                        key={cat._id}
                        label={cat.name}
                        active={activeCategory === cat.slug}
                        image={cat.image}
                        onClick={() => handleCategoryClick(cat.slug)}
                    />
                ))}
            </div>
        </div>
    );
}
