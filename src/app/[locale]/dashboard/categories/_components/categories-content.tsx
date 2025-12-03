import CategoryHeader from "./category-header";
import SearchInput from "./search-input";
import { CategoryTable } from "./category-list";
import Pagination from "@components/features/application/pagination";
import ErrorState from "./error-state";
import { getCategories } from "@lib/apis/dashboard/categories/categories";

interface CategoriesContentProps {
    searchParams?: { search?: string; page?: string };
}

export default async function CategoriesContent({ searchParams }: CategoriesContentProps) {
    const keyword = searchParams?.search || "";
    const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

    const { data, error } = await getCategories(page, keyword);

    if (error) return <ErrorState message={error} />;

    console.log("the keyored is ", keyword);
    return (
        <div className="flex h-[938px] flex-col gap-4 rounded-lg bg-white p-6">
            <CategoryHeader />
            <SearchInput />
            <CategoryTable categories={data?.categories || []} />
            <Pagination className="mt-10" totalPages={data?.metadata.totalPages || 0} />
        </div>
    );
}
