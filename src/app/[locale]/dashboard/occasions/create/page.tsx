import CreateOccasionForm from "../_components/forms/create-occasion-form";
import { useTranslations } from "next-intl";

export default function CreateOccasionPage() {
    // Translation hook
    const t = useTranslations("Occasions");

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Page header */}
            <h1 className="mb-6 text-2xl font-semibold text-zinc-800">{t("add")}</h1>

            {/* Form component */}
            <CreateOccasionForm />
        </div>
    );
}
