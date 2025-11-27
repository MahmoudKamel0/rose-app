export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    isSuperAdmin: boolean;
    productsCount: number;
}

export interface CategoriesMetadata {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
}

export interface CategoriesResponse {
    message: string;
    metadata: CategoriesMetadata;
    categories: Category[];
}

export interface ErrorResponse {
    message: string;
}

export async function getCategories(page: number = 1 , keyword: string = ""): Promise<{ data: CategoriesResponse | null; error: string | null }> {
    const limit = 9;

    try {
        const res = await fetch(`https://flower.elevateegy.com/api/v1/categories?page=${page}&limit=${limit}&search=${keyword}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            next: { tags: ["categories"] },
        });

        // If API returned error (e.g. 400 / 500)
        if (!res.ok) {
            let errorData: ErrorResponse | null = null;

            try {
                errorData = await res.json();
            } catch {
                // JSON parsing failed → raw text error
            }

            throw new Error(errorData?.message || "Failed to fetch categories");
        }

        // Success response
        const data: CategoriesResponse = await res.json();
        return { data, error: null };
    } catch (err: any) {
        // Fallback error handler
        return {
            data: null,
            error: err?.message || "Unknown error occurred",
        };
    }
}
