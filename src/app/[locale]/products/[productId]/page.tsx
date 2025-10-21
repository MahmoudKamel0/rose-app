import Reviews from "@components/features/reviews-section";

// Page component for product reviews
export default async function Page({ params }: { params: { productId: string } }) {
    return <Reviews productId={params.productId} />;
}
