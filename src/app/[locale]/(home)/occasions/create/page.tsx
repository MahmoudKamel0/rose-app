import CreateOccasionForm from "../_components/forms/create-occasion-form";

export default function CreateOccasionPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <h1 className="mb-6 text-2xl font-semibold text-zinc-800">Add a New Occasion</h1>

            {/* Form */}
            <CreateOccasionForm />
        </div>
    );
}
