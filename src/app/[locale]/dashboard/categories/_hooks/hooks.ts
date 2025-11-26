"use client";

import { useMutation } from "@tanstack/react-query";
import { createCategoryAction, deleteCategoryAction } from "../_actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateCategory() {
    const router = useRouter();
    return useMutation({
        mutationFn: (formData: FormData) => createCategoryAction(formData),
        onSuccess: (data) => {
            toast.success("Category created successfully");
            console.log("Category created:", data);
            // redirect to categories list or perform other actions
            router.push("/dashboard/categories");
        },
        onError: (err) => {
            toast.error(`Error creating category: ${(err as Error).message}`);
            console.error("Create category error:", err);
        },
    });
}

export function useDeleteCategory() {
    const router = useRouter();
    return useMutation({
        mutationFn: (categoryId: string) => deleteCategoryAction(categoryId),
        onSuccess: (data) => {
            toast.success("Category deleted successfully");
            console.log("Category deleted:", data);
        },
        onError: (err) => {
            toast.error(`Error deleting category: ${(err as Error).message}`);
            console.error("Delete category error:", err);
        },
    });
}
