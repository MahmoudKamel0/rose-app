import SuspenseWrapper from "./_components/suspense-wrapper";
import CategoriesContent from "./_components/categories-content";

export default function Page() {
    return (
        <SuspenseWrapper>
            <CategoriesContent />
        </SuspenseWrapper>
    );
}
