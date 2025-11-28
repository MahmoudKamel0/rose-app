export interface Occasion {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    isSuperAdmin: boolean;
    productsCount: number;
}

export interface OccasionsMetadata {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
}

export interface OccasionsResponse {
    message: string;
    metadata: OccasionsMetadata;
    occasions: Occasion[];
}

export interface DeleteOccasionResponse {
    message: string;
}

export interface ApiErrorResponse {
    error: string;
}

export interface ApiResponse<T> {
    ok: boolean;
    status: number;
    payload: T | ApiErrorResponse;
}

export interface UpdateOccasionResponse {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateOccasionResponse {
    name: string;
}

export interface CreateOccasionResponse {
    message: string;
    occasion: {
        _id: string;
        name: string;
        slug: string;
        image: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface CreateOccasionErrorResponse {
    error: string;
}

export interface FetchOccasionByIdResponse {
    message: string;
    occasion: Occasion;
}
