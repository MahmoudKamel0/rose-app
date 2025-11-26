import UpdateCategoryForm from "./_components/update-form";

interface PageProps {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function UpdateCategoryPage({ params , searchParams }: PageProps) {
    const { id } = params;
    const nameValue = searchParams?.name;
    const name = typeof nameValue === 'string' ? nameValue : '';
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-zinc-800">Update Category: {name}</h2>
            <div className="mt-4 rounded-lg bg-white p-6">
                <UpdateCategoryForm id={id} name={name} />
            </div>
        </div>
    );
}
