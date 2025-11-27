import SuspenseWrapper from "./_components/suspense-wrapper";
import CategoriesContent from "./_components/categories-content";

interface CategoriesPageProps {
    searchParams?: { search?: string };
}

export default function Page({ searchParams }: CategoriesPageProps) {
    return (
        <SuspenseWrapper>
            <CategoriesContent searchParams={searchParams} />
        </SuspenseWrapper>
    );
}
