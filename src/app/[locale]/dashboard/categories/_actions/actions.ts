"use server";

import { Category } from "@app/[locale]/(home)/products/_types/categories";
import { getDecodeToken } from "@lib/utils/get-decode-token";
import { revalidateTag } from "next/cache";

export interface UpdateCategoryResponse {
    message: string;
    category: Category;
}

export async function createCategoryAction(formData: FormData) {
    const decodedToken = await getDecodeToken();
    if (!decodedToken) {
        throw new Error("No valid authentication token found");
    }
    const res = await fetch("https://flower.elevateegy.com/api/v1/categories", {
        method: "POST",
        body: formData, // do not set Content-Type manually
        headers: {
            Authorization: `Bearer ${decodedToken.accessToken}`,
        },
        //revalidate tags
        next: { tags: ["categories"] },
    });

    if (!res.ok) {
        console.error("Failed to create category");
    }
    //revalidate pathes
    revalidateTag("categories");

    return res.json();
}

export async function updateCategoryAction(categoryId: string, formData: FormData) {
    const decodedToken = await getDecodeToken();
    if (!decodedToken) {
        throw new Error("No valid authentication token found");
    }
    const res = await fetch(`https://flower.elevateegy.com/api/v1/categories/${categoryId}`, {
        method: "PUT",
        body: formData, // do not set Content-Type manually
        headers: {
            Authorization: `Bearer ${decodedToken.accessToken}`, // fine for testing
        },
    });

    if (!res.ok) {
        console.error("Failed to update category");
    }

    const payload: UpdateCategoryResponse = await res.json();
    //revalidate pathes
    revalidateTag("categories");

    return payload;
}

export async function deleteCategoryAction(categoryId: string) {
    const decodedToken = await getDecodeToken();
    if (!decodedToken) {
        throw new Error("No valid authentication token found");
    }
    const res = await fetch(`https://flower.elevateegy.com/api/v1/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${decodedToken.accessToken}`, // fine for testing
        },
    });

    if (!res.ok) {
        console.error("Failed to delete category");
    }
    //revalidate pathes
    revalidateTag("categories");
    return res.json();
}
