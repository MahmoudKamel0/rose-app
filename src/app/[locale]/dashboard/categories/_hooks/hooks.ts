"use client";

import { useMutation } from "@tanstack/react-query";
import { createCategoryAction, deleteCategoryAction, updateCategoryAction } from "../_actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function useCreateCategory() {
    const router = useRouter();
    const t = useTranslations("dashboard.categories.addNew"); // namespace for add

    return useMutation({
        mutationFn: (formData: FormData) => createCategoryAction(formData),
        onSuccess: (data) => {
            toast.success(t("messages.success")); // use translation
            router.push("/dashboard/categories");
        },
        onError: (err) => {
            toast.error(`${t("messages.error")}: ${(err as Error).message}`);
        },
    });
}

export function useUpdateCategory() {
    const router = useRouter();
    const t = useTranslations("dashboard.categories.update"); // namespace for update

    return useMutation({
        mutationFn: ({ categoryId, data }: { categoryId: string; data: FormData }) => updateCategoryAction(categoryId, data),
        onSuccess: (data) => {
            toast.success(t("messages.updateSuccess"));
            router.push("/dashboard/categories");
        },
        onError: (err) => {
            toast.error(`${t("messages.updateError")}: ${(err as Error).message}`);
        },
    });
}

export function useDeleteCategory() {
    const t = useTranslations("dashboard.categories.delete"); // namespace for delete

    return useMutation({
        mutationFn: (categoryId: string) => deleteCategoryAction(categoryId),
        onSuccess: (data) => {
            toast.success(t("messages.deleteSuccess"));
        },
        onError: (err) => {
            toast.error(`${t("messages.deleteError")}: ${(err as Error).message}`);
        },
    });
}
