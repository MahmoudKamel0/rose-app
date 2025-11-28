import { fetchOccasions } from "@lib/apis/dashboard/occasions.api";
import ActionsHeader from "./_components/actions-header";
import OccasionsTable from "./_components/occasions-table";
import Pagination from "@components/features/application/pagination";
import SearchInput from "./_components/search-input";

export default async function OccasionsPage({ searchParams }: { searchParams: { page?: string; search?: string } }) {
    const page = Number(searchParams.page) || 1;
    const search = searchParams.search || "";

    const data = await fetchOccasions(page, 10, search);

    return (
        <div className="p-6">
            <ActionsHeader />

            <SearchInput />

            <OccasionsTable occasions={data.occasions} />

            <Pagination totalPages={data.metadata.totalPages} className="mt-6" />
        </div>
    );
}
