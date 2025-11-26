"use server";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZTA3YWY3ZmVlNjhhNGMyZWJhZmJhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjI0MjQzMDl9.0tYKHrz6liDX-0U_XLsrroB7ISnmChOip5evszIyiag`;

export async function createCategoryAction(formData: FormData) {
    const res = await fetch("https://flower.elevateegy.com/api/v1/categories", {
        method: "POST",
        body: formData, // do not set Content-Type manually
        headers: {
            Authorization: `Bearer ${token}`, // fine for testing
        },
        //revalidate tags
        next: { tags: ["categories"] },
    });

    if (!res.ok) {
        console.error("Failed to create category");
    }

    return res.json();
}

export async function deleteCategoryAction(categoryId: string) {
    const res = await fetch(`https://flower.elevateegy.com/api/v1/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`, // fine for testing
        },
        //revalidate pathes
        next: { tags: ["categories"] },
    });

    if (!res.ok) {
        console.error("Failed to delete category");
    }

    return res.json();
}
