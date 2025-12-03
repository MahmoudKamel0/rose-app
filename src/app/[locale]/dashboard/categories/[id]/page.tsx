import { CategoryResponse, getSpacificCategory } from "@lib/apis/dashboard/categories/categories";
import UpdateCategoryForm from "./_components/update-form";
import { Category } from "@app/[locale]/(home)/products/_types/categories";
import { useTranslations } from "next-intl";

interface PageProps {
    params: { id: string };
}

export default async function UpdateCategoryPage({ params }: PageProps) {
    const { id } = params;

    const data: CategoryResponse = await getSpacificCategory(id);
    console.log(data?.category);
    const { name, image } = data?.category;

    return (
    
            <UpdateCategoryForm id={id} name={name} image={image} />
        
    );
}
