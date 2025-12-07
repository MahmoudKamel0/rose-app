import { fetchOccasionById } from "@lib/apis/dashboard/occasions-by-id.api";
import { notFound } from "next/navigation";
import EditOccasionForm from "../_components/forms/edit-occasion-form";

interface PageProps {
    params: {
        slug: string[];
    };
}

export default async function EditOccasionPage({ params }: PageProps) {
    // Get the occasion ID from the URL
    const { slug } = params;

    // Extract the occasion ID from the slug
    const id = slug[1];

    // Fetch the occasion by ID
    const data = await fetchOccasionById(id);

    // If the occasion is not found, return a 404
    if (!data) return notFound();

    // Extract the occasion data
    const { occasion } = data;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <h1 className="mb-6 text-xl font-semibold text-gray-900">Update Occasion: {occasion.name}</h1>

            {/* Edit Occasion Form */}
            <EditOccasionForm occasionId={occasion._id} occasionName={occasion.name} occasionImage={occasion.image} />
        </div>
    );
}
