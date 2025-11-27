import React from "react";
import AddCategoryForm from "./_components/add-new-category-form";
import { useTranslations } from "next-intl";

export default function page() {
    // translation
    const t = useTranslations("dashboard.categories.addNew");
    return (
        <div>
            <h2 className="text-2xl font-semibold text-zinc-800"> {t("pageTitle")}</h2>
            <div className="mt-4 rounded-lg bg-white p-6">
                <AddCategoryForm />
            </div>
        </div>
    );
}
