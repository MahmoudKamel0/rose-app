import React from "react";
import AddCategoryForm from "./_components/add-new-category-form";

export default function page() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-zinc-800">Add a New Category</h2>
            <div className="bg-white p-6 mt-4 rounded-lg">
                <AddCategoryForm />
            </div>
        </div>
    );
}
