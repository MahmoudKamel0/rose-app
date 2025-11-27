import { CategoryResponse, getSpacificCategory } from "@lib/apis/dashboard/categories/categories";
import UpdateCategoryForm from "./_components/update-form";
import { Category } from "@app/[locale]/(home)/products/_types/categories";

interface PageProps {
    params: { id: string };
}

export default async function UpdateCategoryPage({ params }: PageProps) {
    const { id } = params;

    const data: CategoryResponse = await getSpacificCategory(id);
    console.log(data?.category);
    const { name  , image} = data?.category;

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-zinc-800">Update Category: {name} </h2>
            <div className="mt-4 rounded-lg bg-white p-6">
                <UpdateCategoryForm id={id} name={name} image={image} />
            </div>
        </div>
    );
}
