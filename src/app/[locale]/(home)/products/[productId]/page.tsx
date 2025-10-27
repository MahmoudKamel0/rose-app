import Reviews from "@components/features/reviews-section/reviews-section";
import { ReviewsSectionProps } from "@lib/types/review-product";

// Page component for product reviews
export default async function Page({ params }: { params: ReviewsSectionProps }) {
    // Render Reviews component
    return <Reviews productId={params.productId} />;
}
