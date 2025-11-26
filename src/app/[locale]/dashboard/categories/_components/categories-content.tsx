import CategoryHeader from "./category-header";
import SearchInput from "./search-input";
import { CategoryTable } from "./category-list";
import Pagination from "@components/features/application/pagination";
import ErrorState from "./error-state";
import { getCategories } from "@lib/apis/dashboard/categories/categories";

interface CategoriesContentProps {
    searchParams?: { q?: string };
}

export default async function CategoriesContent({ searchParams }: CategoriesContentProps) {
    const keyword = searchParams?.q || "";

    const { data, error } = await getCategories(1);

    if (error) return <ErrorState message={error} />;

    // filter categories server-side using search param
    const filteredCategories = keyword
        ? data?.categories.filter((cat: { name: string }) => cat.name.toLowerCase().includes(keyword.toLowerCase())) || []
        : data?.categories || [];


        console.log(filteredCategories) ; 
        console.log("the keyored is " , keyword)
    return (
        <div className="flex h-[938px] flex-col gap-4 rounded-lg bg-white p-6">
            <CategoryHeader />
            <SearchInput />
            <CategoryTable categories={filteredCategories} />
            <Pagination className="mt-10" totalPages={data?.metadata.totalPages || 0} />
        </div>
    );
}
