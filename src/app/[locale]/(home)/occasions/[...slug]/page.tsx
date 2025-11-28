import { fetchOccasionById } from "@lib/apis/dashboard/occasions-by-id.api";
import { notFound } from "next/navigation";
import EditOccasionForm from "../_components/forms/edit-occasion-form";

interface PageProps {
    params: {
        slug: string[]; 
    };
}

export default async function EditOccasionPage({ params }: PageProps) {
    const { slug } = params;

    console.log("slug:", slug);

    const id = slug[1];

    const data = await fetchOccasionById(id);

    if (!data) return notFound();

    const { occasion } = data;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="mb-6 text-xl font-semibold text-gray-900">Update Occasion: {occasion.name}</h1>

            <EditOccasionForm occasionId={occasion._id} occasionName={occasion.name} occasionImage={occasion.image} />
        </div>
    );
}
